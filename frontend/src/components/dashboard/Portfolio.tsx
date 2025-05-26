"use client";
import { KitContext } from "@/context/kit-context";
import { uploadImageToIPFS } from "@/utils/uploadToIPFS";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button, useDisclosure
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FormEvent, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { cairo } from "starknet";

const UserPortfolio = () => {
  const path = usePathname();
  const { agrovestContract, readAgrovestContract, address } = useContext(KitContext);

  // Uplaod to IPFS and return of the URI
  const [selectedFile, setSelectedFile] = useState<any>();
  const [farmDetails , setFarmDetails] = useState<any>();

  const getFarmDetails = async () => {
    const details = await readAgrovestContract!.get_user_farm_details();
    console.log(details);
    return details;
  }

  useEffect(() => {
    async()=>{
     console.log(await getFarmDetails()); 
    }
  }, [address]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();


  const handleSelectImage = async ({ target }: { target: any }) => {
    setSelectedFile(target.files[0]);
    setSelectedFile(target.files[0]);
    const imageHash = await uploadImageToIPFS(target.files[0]);
    setProductImage(imageHash);
  };

  

  const [farmName, setFarmName] = useState("");
  const [productImage, setProductImage] = useState("");
  const [farmLocation, setFarmLocation] = useState("");
  const [farmContactNumber, setFarmContactNumber] = useState("");
  const [farmEmail, setFarmEmail] = useState("");
    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      toast.loading("Updating farm profile...");
      try {
        const createProductResult = await agrovestContract!.register_farms(
          farmName,
          productImage,
          farmLocation,
          cairo.uint256(farmContactNumber),
          address,
          farmEmail
        );
        console.log(createProductResult);
        toast.dismiss();
        toast.success("Farm Profile updated successfully");
      } catch (error) {
        toast.error(`error: ${error}`);
        console.log(error);
      }
    };

  return (
    <section className="flex w-full flex-col gap-6 py-4">
      <div className="flex w-full items-center justify-between px-4">
        <h1 className="text-base font-semibold uppercase text-darkgreen md:text-xl">
          Portfolio
        </h1>
        <Button
          onPress={onOpen}
          className="rounded-[7px] bg-darkgreen px-6 py-2.5 text-base text-lightgreen"
        >
          Add Farm
        </Button>
      </div>

      <main className="grid w-full gap-4 bg-gray-100 md:grid-cols-3 lg:grid-cols-5">
        <div className="flex flex-col items-center justify-center gap-2 rounded-[5px] p-3">
          <h4 className="font-light text-gray-800">Total Product</h4>
          <h1 className="text-2xl font-semibold text-darkgreen">$3,500</h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 rounded-[5px] p-3">
          <h4 className="font-light text-gray-800">Total Invested</h4>
          <h1 className="text-2xl font-semibold text-darkgreen">$30,500</h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 rounded-[5px] p-3">
          <h4 className="font-light text-gray-800">Product Sold</h4>
          <h1 className="text-2xl font-semibold text-darkgreen">15</h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 rounded-[5px] p-3">
          <h4 className="font-light text-gray-800">Product Purchased</h4>
          <h1 className="text-2xl font-semibold text-darkgreen">5</h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 rounded-[5px] p-3">
          <h4 className="font-light text-gray-800">Funds Raised</h4>
          <h1 className="text-2xl font-semibold text-darkgreen">$1,500</h1>
        </div>
      </main>

      <div className="flex w-full gap-0 md:ml-3">
        <Link
          href="/user/portfolio"
          className={`px-4 py-2 text-base font-medium ${path === "/user/portfolio" ? "bg-darkgreen text-gray-200" : "bg-lightgreen text-darkgreen"}`}
        >
          Farm
        </Link>
        <Link
          href="/user/portfolio/investments"
          className={`px-4 py-2 text-base font-medium ${path === "/user/portfolio/investments" ? "bg-darkgreen text-gray-200" : "bg-lightgreen text-darkgreen"}`}
        >
          Investments
        </Link>
        <Link
          href="/user/portfolio/products"
          className={`px-4 py-2 text-base font-medium ${path === "/user/portfolio/products" ? "bg-darkgreen text-gray-200" : "bg-lightgreen text-darkgreen"}`}
        >
          Products
        </Link>
      </div>

      {/* modal  */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 capitalize text-gray-800">
                Farm Details
              </ModalHeader>
              <ModalBody className="flex flex-col gap-4 py-3">
                <form className="grid w-full gap-4" onSubmit={handleSubmit}>
                  <div className="flex w-full flex-col items-center">
                    <div className="relative h-[80px] w-[80px] rounded border-[0.5px] border-darkgreen">
                      {selectedFile ? (
                        <Image
                          src={URL.createObjectURL(selectedFile)}
                          alt="profile"
                          className="h-full w-full object-cover"
                          width={440}
                          height={440}
                          priority
                          quality={100}
                        />
                      ) : (
                        <span className="relative flex h-full w-full items-center justify-center text-darkgreen">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="relative inline-flex size-6 rounded text-6xl text-gray-300"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                            />
                          </svg>
                        </span>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        className="hidden"
                        id="selectFile"
                        onChange={handleSelectImage}
                      />
                      <label
                        htmlFor="selectFile"
                        className="font-Bebas absolute -bottom-1 -right-1 cursor-pointer rounded-full border-[0.5px] border-gray-700/50 bg-darkgreen p-1 tracking-wider text-gray-200"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="farmName"
                      className="ml-1 font-medium text-gray-700"
                    >
                      Farm Name
                    </label>
                    <input
                      type="text"
                      name="farmName"
                      id="farmName"
                      placeholder="Enter farm name"
                      className="caret-color1 border-color1 bg-color1/5 w-full rounded-lg border px-4 py-3 text-sm text-gray-700 outline-none"
                      value={farmName}
                      onChange={(e) => setFarmName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="productImg"
                      className="ml-1 font-medium text-gray-700"
                    >
                      Farm Image URI
                    </label>
                    <input
                      type="text"
                      name="productImg"
                      id="productImg"
                      placeholder="Farm Image URI"
                      className="caret-color1 border-color1 bg-color1/5 w-full rounded-lg border px-4 py-3 text-sm text-gray-700 outline-none"
                      value={productImage}
                      onChange={(e: any) => setProductImage(e.target.value)}
                      readOnly
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="FarmLocation"
                      className="ml-1 font-medium text-gray-700"
                    >
                      Farm Location
                    </label>
                    <input
                      type="text"
                      name="FarmLocation"
                      id="FarmLocation"
                      placeholder="Enter farm description"
                      className="caret-color1 border-color1 bg-color1/5 w-full rounded-lg border px-4 py-3 text-sm text-gray-700 outline-none"
                      value={farmLocation}
                      onChange={(e) => setFarmLocation(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="farmContactNumber"
                      className="ml-1 font-medium text-gray-700"
                    >
                      Farm Contact Number
                    </label>
                    <input
                      type="text"
                      name="farmContactNumber"
                      id="farmContactNumber"
                      placeholder="Enter farm contact number"
                      className="caret-color1 border-color1 bg-color1/5 w-full rounded-lg border px-4 py-3 text-sm text-gray-700 outline-none"
                      value={farmContactNumber}
                      onChange={(e) => setFarmContactNumber(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="farmEmail"
                      className="ml-1 font-medium text-gray-700"
                    >
                      Farm email
                    </label>
                    <input
                      type="text"
                      name="farmEmail"
                      id="farmEmail"
                      placeholder="Enter farm rmail"
                      className="caret-color1 border-color1 bg-color1/5 w-full rounded-lg border px-4 py-3 text-sm text-gray-700 outline-none"
                      value={farmEmail}
                      onChange={(e) => setFarmEmail(e.target.value)}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="mt-3 rounded-[7px] bg-darkgreen px-6 py-2.5 text-base text-lightgreen"
                  >
                    Submit
                  </Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
};

export default UserPortfolio;
