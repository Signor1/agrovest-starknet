#[starknet::contract]
mod Farm {
    use agrovest::error::Errors;
    use agrovest::events::*;
    use agrovest::interface::*;
    use agrovest::types::*;
    use core::num::traits::zero::Zero;
    use starknet::storage::{
        Map, StorageMapReadAccess, StorageMapWriteAccess, StoragePathEntry,
        StoragePointerReadAccess, StoragePointerWriteAccess,
    };
    use starknet::{ContractAddress, get_caller_address};

    #[storage]
    struct Storage {
        balance: u256,
        product_buyers: Map<(ContractAddress, u256), u256>,
        business_name_map: Map<ContractAddress, felt252>,
        business_image_map: Map<ContractAddress, ByteArray>,
        product_index_counter: u256,
        name_to_address: Map<felt252, ContractAddress>,
        details: Map<ContractAddress, FarmerDetails>,
        incrementing_id: u256,
        farmer_array_with_counter: Map<u256, FarmerDetails>,
        total_farmers: u256,
        farmer_product_count: Map<ContractAddress, u256>,
        uploaded_farm_products: Map<(ContractAddress, u256), FarmProducts>,
        user_cart_total: Map<ContractAddress, u256>,
        all_products_counter: u256,
        buyer_cart_total: Map<ContractAddress, u256>,
        pending_payments: Map<ContractAddress, u256>,
        payment_status: Map<ContractAddress, bool>,
        buyer_cart_items: Map<(ContractAddress, u256), u256>,
        buyer_product_count: Map<ContractAddress, u256>,
        email_to_address: Map<felt252, ContractAddress>,
        contact_to_address: Map<u256, ContractAddress>,
    }


    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        BusinessNameRegistered: BusinessNameRegistered,
        BusinessImageRegistered: BusinessImageRegistered,
        BusinessNameUpdated: BusinessNameUpdated,
        BusinessImageUpdated: BusinessImageUpdated,
        AddFarmProduct: AddFarmProduct,
        UpdateFarmProduct: UpdateFarmProduct,
        PaymentInitiated: PaymentInitiated,
        PurchaseCompleted: PurchaseCompleted,
    }

    //#[abi(embed_v0)]
    #[generate_trait]
    #[abi(per_item)]
    impl FarmImpl of FarmTrait {
        #[external(v0)]
        fn register_farms(
            ref self: ContractState,
            business_name: felt252,
            business_image: ByteArray,
            business_location: ByteArray,
            business_contact: u256,
            farmer_address: ContractAddress,
            business_email: ByteArray,
        ) {
            assert(business_name != 0, Errors::NAME_CANNOT_BE_EMPTY);

            assert(
                self.name_to_address.read(business_name).is_zero(), Errors::NAME_ALREADY_REGISTERED,
            );

            let sender = get_caller_address();
            let id = self.incrementing_id.read();

            let farm_details = FarmerDetails {
                farm_id: id,
                business_name,
                business_image: business_image.clone(),
                business_location,
                business_contact,
                farmer_address,
                business_email: business_email.clone(),
                is_registered: true,
            };

            self.name_to_address.write(business_name, farmer_address);
            self.business_name_map.write(sender, business_name);
            self.business_image_map.write(sender, business_image.clone());
            let total_farmers = self.total_farmers.read();

            self.details.write(sender, farm_details.clone());
            self.farmer_array_with_counter.write(total_farmers, farm_details);

            self.total_farmers.write(total_farmers + 1);

            self.incrementing_id.write(id + 1);

            self
                .emit(
                    Event::BusinessNameRegistered(
                        BusinessNameRegistered { sender, name: business_name },
                    ),
                );
            self
                .emit(
                    Event::BusinessImageRegistered(
                        BusinessImageRegistered { sender, image: business_image },
                    ),
                );
        }

        #[external(v0)]
        fn update_details(
            ref self: ContractState,
            index: u256,
            name: felt252,
            image: ByteArray,
            location: ByteArray,
            contact_info: u256,
            email: ByteArray,
        ) {
            let id = self.incrementing_id.read();
            assert(index <= id, Errors::INVALID_FARM_INDEX);

            let sender = get_caller_address();
            assert(self.details.read(sender).is_registered, Errors::YOU_ARE_NOT_REGISTERED);
            assert(
                self
                    .farmer_array_with_counter
                    .read(index)
                    .business_name == self
                    .business_name_map
                    .read(sender),
                Errors::FARM_DOES_NOT_BELONG_TO_YOU,
            );
            let f_id = self.farmer_array_with_counter.read(index).farm_id;

            let f_add = self.farmer_array_with_counter.read(index).farmer_address;

            let farm_details = FarmerDetails {
                farm_id: f_id,
                business_name: name,
                business_image: image.clone(),
                business_location: location,
                business_contact: contact_info,
                farmer_address: f_add,
                business_email: email,
                is_registered: true,
            };

            self.farmer_array_with_counter.write(index, farm_details);
            self.emit(Event::BusinessNameUpdated(BusinessNameUpdated { sender, name }));
            self.emit(Event::BusinessImageUpdated(BusinessImageUpdated { sender, image }));
        }

        #[external(v0)]
        fn get_farm_index(self: @ContractState, name: felt252) -> u256 {
            let mut index: u256 = 0;
            let total_farmers = self.total_farmers.read();
            loop {
                assert(index < total_farmers, Errors::INVALID_FARM_INDEX.into());
                let farmer = self.farmer_array_with_counter.read(index);
                if farmer.business_name == name {
                    break index;
                }
                index += 1;
            }
        }

        #[external(v0)]
        fn add_farm_product(
            ref self: ContractState,
            product_name: felt252,
            product_image: ByteArray,
            product_description: ByteArray,
            product_price: u256,
        ) -> u256 {
            let sender = get_caller_address();
            assert(self.details.read(sender).is_registered, Errors::YOU_ARE_NOT_REGISTERED);
            let product_id = self.product_index_counter.read();
            let farm_products = FarmProducts {
                product_name,
                product_image,
                product_description,
                product_price,
                product_owner: sender,
                product_id,
                available: true,
                sold: false,
            };

            self.uploaded_farm_products.write((sender, product_id), farm_products);
            self.product_index_counter.write(product_id + 1);
            let new_count = self.farmer_product_count.read(sender) + 1;
            self.farmer_product_count.write(sender, new_count);
            self.all_products_counter.write(product_id + 1);
            self.emit(Event::AddFarmProduct(AddFarmProduct { sender, product_name }));
            product_id
        }

        #[external(v0)]
        fn update_farm_product(
            ref self: ContractState,
            index: u256,
            product_name: felt252,
            product_image: ByteArray,
            product_description: ByteArray,
            product_price: u256,
        ) {
            let sender = get_caller_address();
            assert(self.details.read(sender).is_registered, Errors::YOU_ARE_NOT_REGISTERED);

            let mut farm_product = self.uploaded_farm_products.read((sender, index));
            assert(farm_product.product_owner == sender, Errors::NOT_PRODUCT_OWNER);
            assert(farm_product.product_id == index, Errors::INVALID_PRODUCT_INDEX);

            farm_product.product_name = product_name;
            farm_product.product_image = product_image;
            farm_product.product_description = product_description;
            farm_product.product_price = product_price;

            self.uploaded_farm_products.write((sender, index), farm_product);

            self
                .emit(
                    Event::UpdateFarmProduct(
                        UpdateFarmProduct { sender, product_id: index, product_name },
                    ),
                );
        }
    }

    #[external(v0)]
    fn add_product_to_cart(ref self: ContractState, product_id: u256) {
        let buyer = get_caller_address();

        let product = self.uploaded_farm_products.read((buyer, product_id));
        assert(product.available == true, Errors::PRODUCT_DOES_NOT_EXIST);

        let current_quantity = self.product_buyers.read((buyer, product_id));
        let new_quantity = current_quantity + 1;
        self.product_buyers.write((buyer, product_id), new_quantity);

        let current_total = self.user_cart_total.read(buyer);
        self.user_cart_total.write(buyer, current_total + 1);
    }

    #[external(v0)]
    fn get_cart_summary(self: @ContractState, buyer: ContractAddress) -> u256 {
        self.user_cart_total.read(buyer)
    }

    #[external(v0)]
    fn get_cart_item_quantity(
        self: @ContractState, buyer: ContractAddress, product_id: u256,
    ) -> u256 {
        self.product_buyers.read((buyer, product_id))
    }

    #[external(v0)]
    fn remove_product_from_cart(ref self: ContractState, product_id: u256) {
        let buyer = get_caller_address();
        let current_quantity = self.product_buyers.read((buyer, product_id));
        assert(current_quantity > 0, Errors::PRODUCT_NOT_IN_CART);

        if current_quantity == 1 {
            self.product_buyers.write((buyer, product_id), 0);
        } else {
            self.product_buyers.write((buyer, product_id), current_quantity - 1);
        }

        let current_total = self.user_cart_total.read(buyer);
        self.user_cart_total.write(buyer, current_total - 1);
    }

    #[external(v0)]
    fn set_cart_quantity(ref self: ContractState, product_id: u256, quantity: u256) {
        let buyer = get_caller_address();
        assert(quantity <= 100, Errors::INVALID_QUANTITY);

        let product = self.uploaded_farm_products.read((buyer, product_id));
        assert(product.available == true, Errors::PRODUCT_DOES_NOT_EXIST);

        let current_quantity = self.product_buyers.read((buyer, product_id));
        let current_total = self.user_cart_total.read(buyer);

        let new_total = current_total - current_quantity + quantity;
        self.user_cart_total.write(buyer, new_total);

        self.product_buyers.write((buyer, product_id), quantity);
    }

    #[external(v0)]
    fn get_name(self: @ContractState, user: ContractAddress) -> felt252 {
        let name_felt = self.business_name_map.read(user);
        name_felt
    }

    #[external(v0)]
    fn get_address(self: @ContractState, name: felt252) -> ContractAddress {
        let user_address = self.name_to_address.read(name);
        user_address
    }

    #[external(v0)]
    fn get_user_farm_details(self: @ContractState) -> FarmerDetails {
        let user = get_caller_address();
        self.details.read(user)
    }

    #[external(v0)]
    fn get_image(self: @ContractState, user: ContractAddress) -> ByteArray {
        self.business_image_map.read(user)
    }

    #[external(v0)]
    fn return_farms(self: @ContractState) -> Array<FarmerDetails> {
        let mut farms = ArrayTrait::new();
        let total_farms = self.total_farmers.read();
        let mut i = 0;

        while i != total_farms {
            farms.append(self.farmer_array_with_counter.read(i));
            i += 1;
        }

        farms
    }

    #[external(v0)]
    fn get_product_count(self: @ContractState, farmer: ContractAddress) -> u256 {
        self.farmer_product_count.read(farmer)
    }

    #[external(v0)]
    fn get_farm_product(
        self: @ContractState, farmer: ContractAddress, product_id: u256,
    ) -> FarmProducts {
        self.uploaded_farm_products.read((farmer, product_id))
    }

    #[external(v0)]
    fn get_farmer_product_count(self: @ContractState, farmer: ContractAddress) -> u256 {
        self.farmer_product_count.read(farmer)
    }

    #[external(v0)]
    fn initiate_purchase(ref self: ContractState, payment_amount: u256) {
        let buyer = get_caller_address();
        let cart_total = self.buyer_cart_total.read(buyer);

        assert(cart_total > 0, Errors::EMPTY_CART);
        assert(payment_amount > 0, Errors::INVALID_PAYMENT);

        // Store payment details
        self.pending_payments.write(buyer, payment_amount);
        self.payment_status.write(buyer, false); // Not confirmed yet

        // Emit event for payment processor
        self.emit(PaymentInitiated { buyer, amount: payment_amount });
    }

    /// Confirm payment and clear cart (callable by payment processor)
    #[external(v0)]
    fn confirm_payment(ref self: ContractState, buyer: ContractAddress) {
        // In production, add access control for payment processor
        let amount = self.pending_payments.read(buyer);
        assert(amount > 0, Errors::NO_PENDING_PAYMENT);

        self._process_purchase(buyer);

        // Clear payment tracking
        self.pending_payments.write(buyer, 0);
        self.payment_status.write(buyer, true);
    }
    #[generate_trait]
    impl InternalFunctions of InternalFunctionsTrait {
        /// Internal function to process purchased items
        #[external(v0)]
        fn _process_purchase(ref self: ContractState, buyer: ContractAddress) {
            // 1. Verify payment was confirmed
            let is_paid = self.payment_status.read(buyer);
            assert(is_paid, Errors::PAYMENT_NOT_CONFIRMED);

            // 2. Get cart total items
            let cart_total = self.buyer_cart_total.read(buyer);
            assert(cart_total > 0, Errors::EMPTY_CART);

            // 3. Process payment (deduct from contract balance)
            let payment_amount = self.pending_payments.read(buyer);
            let current_balance = self.balance.read();
            self.balance.write(current_balance + payment_amount);

            // 4. Clear payment tracking
            self.pending_payments.write(buyer, 0);
            self.payment_status.write(buyer, false);

            // 5. Clear cart - since we don't track individual items in your storage,
            // we'll just reset the cart total
            self.buyer_cart_total.write(buyer, 0);

            // 6. Emit event
            self.emit(PurchaseCompleted { buyer, amount: payment_amount });
        }
    }
}

