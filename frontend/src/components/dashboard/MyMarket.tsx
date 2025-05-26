/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FormEvent, useContext, useState } from "react";
import Products from "./Products";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@heroui/react";
import Image from "next/image";
import { uploadImageToIPFS } from "@/utils/uploadToIPFS";
import { KitContext } from "@/context/kit-context";
import { a } from "node_modules/framer-motion/dist/types.d-CtuPurYT";
import toast from "react-hot-toast";
import { byteArray, cairo } from "starknet";

const MyMarket = () => {
  const path = usePathname();
  const { agrovestContract } = useContext(KitContext);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Uplaod to IPFS and return of the URI
  const [selectedFile, setSelectedFile] = useState<any>();

  const handleSelectImage = async ({ target }: { target: any }) => {
    setSelectedFile(target.files[0]);
    const imageHash = await uploadImageToIPFS(target.files[0]);
    setProductImage(imageHash);
  };

  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    toast.loading("Adding Product...");
    try {
      const createProductResult = await agrovestContract!.add_farm_product(
        productName,
        byteArray.byteArrayFromString(productImage),
        byteArray.byteArrayFromString(productDesc),
        cairo.uint256(productPrice),
      );
      console.log(createProductResult);
      toast.dismiss();
      toast.success("Product added successfully");
    } catch (error) {
      toast.error(`error: ${error}`);
      console.log(error);
    }
  };
  
  return (
    <section className="flex w-full flex-col gap-6 py-4">
      <h1 className="text-base font-semibold uppercase text-darkgreen md:text-xl">
        Market Place
      </h1>

      <div className="flex w-full gap-4">
        <Link
          href="/user/marketplace"
          className={`rounded px-4 py-2 text-base font-medium ${path === "/user/marketplace" ? "bg-darkgreen text-lightgreen" : "text-darkgreen"}`}
        >
          All Products
        </Link>
        <Link
          href="/user/marketplace/mine"
          className={`rounded px-4 py-2 text-base font-medium ${path === "/user/marketplace/mine" ? "bg-darkgreen text-lightgreen" : "text-darkgreen"}`}
        >
          My Products
        </Link>
      </div>

      <div className="flex w-full items-center justify-end gap-4">
        <button className="rounded-[5px] bg-darkgreen px-6 py-2.5 text-base text-lightgreen">
          Mint
        </button>
        <Button
          onPress={onOpen}
          className="rounded-[5px] bg-darkgreen px-6 py-2.5 text-base text-lightgreen"
        >
          Add product
        </Button>
      </div>

      <Products title="My Products" />

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 capitalize text-gray-800">
                Add your product
              </ModalHeader>
              <ModalBody className="flex flex-col gap-4">
                <form className="grid w-full gap-4" onSubmit={handleSubmit}>
                  <div className="flex w-full flex-col items-center">
                    <div className="relative h-[80px] w-[80px] rounded border-[0.5px] border-lightgreen/50">
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
                        <span className="relative flex h-full w-full items-center justify-center">
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
                        className="border-color3/50 font-Bebas text-color3 absolute -bottom-1 -right-1 cursor-pointer rounded-full border-[0.5px] bg-gray-100 p-1 tracking-wider"
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
                      htmlFor="productName"
                      className="ml-1 font-medium text-gray-800"
                    >
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="productName"
                      id="productName"
                      placeholder="Enter product name"
                      className="caret-color1 border-color1 bg-color1/5 text-color3 w-full rounded-lg border px-4 py-3 text-sm outline-none"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="productImg"
                      className="text-color3 ml-1 font-medium"
                    >
                      Product Image URI
                    </label>
                    <input
                      type="text"
                      name="productImg"
                      id="productImg"
                      placeholder="Product Image URI"
                      className="caret-color1 border-color1 bg-color1/5 text-color3 w-full rounded-lg border px-4 py-3 text-sm outline-none"
                      value={productImage}
                      onChange={(e: any) => setProductImage(e.target.value)}
                      readOnly
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="productDesc"
                      className="text-color3 ml-1 font-medium"
                    >
                      Product Description
                    </label>
                    <input
                      type="text"
                      name="productDesc"
                      id="productDesc"
                      placeholder="Enter product description"
                      className="caret-color1 border-color1 bg-color1/5 text-color3 w-full rounded-lg border px-4 py-3 text-sm outline-none"
                      value={productDesc}
                      onChange={(e) => setProductDesc(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="productPrice"
                      className="text-color3 ml-1 font-medium"
                    >
                      Product Price
                    </label>
                    <input
                      type="text"
                      name="productPrice"
                      id="productPrice"
                      placeholder="Enter product price"
                      className="caret-color1 border-color1 bg-color1/5 text-color3 w-full rounded-lg border px-4 py-3 text-sm outline-none"
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
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

export default MyMarket;
