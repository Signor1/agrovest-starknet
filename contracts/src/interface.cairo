use agrovest::types::*;
use starknet::ContractAddress;

#[starknet::interface]
pub trait IFarm<TContractState> {
    /// Register a farm
    fn register_farms(
        ref self: TContractState,
        business_name: felt252,
        business_image: ByteArray,
        business_location: ByteArray,
        business_contact: u256,
        farmer_address: ContractAddress,
        business_email: ByteArray,
    );

    /// Update Details
    fn update_details(
        ref self: TContractState,
        index: u256,
        name: felt252,
        image: ByteArray,
        location: ByteArray,
        contact_info: u256,
        email: ByteArray,
    );

    /// Get farm index
    fn get_farm_index(self: @TContractState, name: felt252) -> u256;

    /// Add farm product
    fn add_farm_product(
        ref self: TContractState,
        product_name: felt252,
        product_image: ByteArray,
        product_description: ByteArray,
        product_price: u256,
    );

    /// Remove products from cart
    fn remove_product_from_cart(self: @TContractState, product_id: u256);

    /// Add product to cart
    fn add_product_to_cart(ref self: TContractState, product_id: u256);

    /// Purchase product
    fn purchase_product(ref self: TContractState, product_id: u256);

    /// Update farm product
    fn update_farm_product(
        ref self: TContractState,
        index: u256,
        product_name: felt252,
        product_image: ByteArray,
        product_description: ByteArray,
        product_price: u256,
    );

    /// Get name from address
    fn get_name(self: @TContractState, user: ContractAddress) -> ByteArray;

    /// Get address from name
    fn get_address(self: @TContractState, name: felt252) -> ContractAddress;

    /// Get user
    fn get_user_farm_details(self: @TContractState) -> FarmerDetails;

    /// Get image from address
    fn get_image(self: @TContractState, user: ByteArray) -> ByteArray;

    /// Retun farms
    fn return_farms(self: @TContractState) -> Array<FarmerDetails>;

    /// Get total sale
    fn get_total_sale(self: @TContractState) -> u256;

    /// Get cart products
    fn get_cart_products(self: @TContractState, buyer: ContractAddress) -> Array<FarmProducts>;

    ///
    fn get_purchased_products(self: @TContractState, buyer: ContractAddress) -> Array<FarmProducts>;

    /// Submit Review
    fn submit_review(ref self: TContractState, product_id: u256, review: ByteArray);

    /// Has purchased
    fn has_purchased(self: @TContractState, buyer: ContractAddress, product_id: u256) -> bool;

    fn get_farm_product(self: @TContractState, farmer: ContractAddress, product_id: u256);

    /// Get product reviews
    fn get_product_reviews(self: @TContractState, product_id: u256) -> Array<Review>;

    /// Increase contract balance.
    fn increase_balance(ref self: TContractState, amount: felt252);

    /// Retrieve contract balance.
    fn get_balance(self: @TContractState) -> felt252;
}

