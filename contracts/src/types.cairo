use starknet::ContractAddress;
#[derive(Clone, Drop, Serde, starknet::Store)]
pub struct Review {
    pub reviewer: ContractAddress,
    pub review: ByteArray,
}

#[derive(Clone, Drop, Serde, starknet::Store)]
pub struct FarmerDetails {
    pub farm_id: u256,
    pub business_name: felt252,
    pub business_image: ByteArray,
    pub business_location: ByteArray,
    pub business_contact: u256,
    pub farmer_address: ContractAddress,
    pub business_email: ByteArray,
    pub is_registered: bool,
}

#[derive(Clone, PartialEq, Drop, Serde, starknet::Store)]
pub struct FarmProducts {
    pub product_name: felt252,
    pub product_image: ByteArray,
    pub product_description: ByteArray,
    pub product_price: u256,
    pub product_owner: ContractAddress,
    pub product_id: u256,
    pub available: bool,
    pub sold: bool,
}

