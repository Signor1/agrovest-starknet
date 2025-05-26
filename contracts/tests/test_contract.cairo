use agrovest::farm::*;
use agrovest::interface::{IFarmDispatcher, IFarmDispatcherTrait};
use core::option::OptionTrait;
use core::result::ResultTrait;
use core::traits::TryInto;
use snforge_std::{
    ContractClassTrait, DeclareResultTrait, EventSpyAssertionsTrait, declare, spy_events,
    start_cheat_caller_address, stop_cheat_caller_address,
};
use starknet::testing::{set_caller_address, set_contract_address};
use starknet::{ContractAddress, get_block_timestamp};
fn OWNER() -> ContractAddress {
    'owner'.try_into().unwrap()
}

fn USER() -> ContractAddress {
    'recipient'.try_into().unwrap()
}

fn FARMER() -> ContractAddress {
    'farmer'.try_into().unwrap()
}

fn setup() -> ContractAddress {
    let class_hash = declare("Farm").unwrap().contract_class();
    let calldata = array![];
    let (contract_address, _) = class_hash.deploy(@calldata).unwrap();

    return contract_address;
}

#[test]
fn test_register_farms() {
    let farm_contract_address = setup();
    let farm_contract = IFarmDispatcher { contract_address: farm_contract_address };
    let sender = FARMER();

    start_cheat_caller_address(farm_contract_address, OWNER());

    let image: ByteArray = "image_uri";
    let location: ByteArray = "Nairobi";
    let email: ByteArray = "test@farm.com";
    let name: felt252 = 'MyFarm';
    farm_contract.register_farms(name, image, location, 254700000000_u256, sender, email);

    let details = farm_contract.get_user_farm_details();
    assert_eq!(details.business_name, name);
    stop_cheat_caller_address(farm_contract_address);
}

#[test]
fn test_add_product() {
    let farm_contract_address = setup();
    let farm_contract = IFarmDispatcher { contract_address: farm_contract_address };
    let sender = FARMER();

    start_cheat_caller_address(farm_contract_address, OWNER());

    let image: ByteArray = "image_uri";
    let location: ByteArray = "Nairobi";
    let email: ByteArray = "test@farm.com";
    let name: felt252 = 'MyFarm';

    farm_contract.register_farms(name, image, location, 254700000000_u256, sender, email);
    let tomato: felt252 = 'Organic Tomatoes';
    let t_image: ByteArray = "tomato.jpg";
    let desc: ByteArray = "Fresh organic tomatoes";

    let _product_id = farm_contract.add_farm_product(tomato, t_image, desc, 100_u256);
}

#[test]
fn test_update_product() {
    let farm_contract_address = setup();
    let farm_contract = IFarmDispatcher { contract_address: farm_contract_address };
    let sender = FARMER();

    start_cheat_caller_address(farm_contract_address, OWNER());

    let image: ByteArray = "image_uri";
    let location: ByteArray = "Nairobi";
    let email: ByteArray = "test@farm.com";
    let name: felt252 = 'MyFarm';

    farm_contract.register_farms(name, image, location, 254700000000_u256, sender, email);
    let tomato: felt252 = 'Organic Tomatoes';
    let t_image: ByteArray = "tomato.jpg";
    let desc: ByteArray = "Fresh organic tomatoes";

    let _product_id = farm_contract.add_farm_product(tomato, t_image, desc, 100_u256);
    let updated_name = 'image++';
    let new_t_image: ByteArray = "tomato+";
    let new_desc: ByteArray = "Fresh Importation";

    let _update = farm_contract
        .update_farm_product(0, updated_name, new_t_image, new_desc, 10_u256);
    let get_product = farm_contract.get_farm_product(sender, 0);
    println!("{:?}", get_product);
}

#[test]
fn test_getter() {
    let farm_contract_address = setup();
    let farm_contract = IFarmDispatcher { contract_address: farm_contract_address };
    let sender = FARMER();

    start_cheat_caller_address(farm_contract_address, OWNER());

    let image: ByteArray = "image_uri";
    let location: ByteArray = "Nairobi";
    let email: ByteArray = "test@farm.com";
    let name: felt252 = 'MyFarm';

    farm_contract.register_farms(name, image, location, 254700000000_u256, sender, email);
    let tomato: felt252 = 'Organic Tomatoes';
    let t_image: ByteArray = "tomato.jpg";
    let desc: ByteArray = "Fresh organic tomatoes";

    let _product_id = farm_contract.add_farm_product(tomato, t_image, desc, 100_u256);

    assert(farm_contract.get_address('MyFarm') == sender, 'Address getter failed');

    let farms = farm_contract.return_farms();
    assert(farms.len() == 1, 'Farm list incorrect');
}
