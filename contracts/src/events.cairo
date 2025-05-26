use starknet::ContractAddress;


#[derive(Copy, Drop, Debug, PartialEq, starknet::Event)]
pub struct BusinessNameRegistered {
    pub sender: ContractAddress,
    pub name: felt252,
}

#[derive(Drop, Debug, PartialEq, starknet::Event)]
pub struct BusinessImageRegistered {
    pub sender: ContractAddress,
    pub image: ByteArray,
}

#[derive(Copy, Drop, Debug, PartialEq, starknet::Event)]
pub struct BusinessNameUpdated {
    pub sender: ContractAddress,
    pub name: felt252,
}

#[derive(Drop, Debug, PartialEq, starknet::Event)]
pub struct BusinessImageUpdated {
    pub sender: ContractAddress,
    pub image: ByteArray,
}

#[derive(Copy, Drop, Debug, PartialEq, starknet::Event)]
pub struct AddFarmProduct {
    pub sender: ContractAddress,
    pub product_name: felt252,
}

#[derive(Copy, Drop, Debug, PartialEq, starknet::Event)]
pub struct ProductReviewed {
    pub sender: ContractAddress,
    pub product_name: felt252,
}


#[derive(Copy, Drop, Debug, PartialEq, starknet::Event)]
pub struct UpdateFarmProduct {
    pub sender: ContractAddress,
    pub product_id: u256,
    pub product_name: felt252,
}


#[derive(Copy, Drop, Debug, PartialEq, starknet::Event)]
pub struct PaymentInitiated {
    pub buyer: ContractAddress,
    pub amount: u256,
}

#[derive(Copy, Drop, Debug, PartialEq, starknet::Event)]
pub struct PurchaseCompleted {
    pub buyer: ContractAddress,
    pub amount: u256,
}
