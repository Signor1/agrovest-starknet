"use client";
import { farmData } from "@/utils/products";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button, useDisclosure
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const UserPortfolio = () => {
  const path = usePathname();
  const router = useRouter();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Uplaod to IPFS and return of the URI
  const [selectedFile, setSelectedFile] = useState<any>();

  const handleSelectImage = ({ target }: { target: any }) => {
    setSelectedFile(target.files[0]);
  };

  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
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

      <div className="grid w-full gap-8 md:grid-cols-2">
        {farmData.slice(0, 1).map((res, index) => (
          <div
            key={index}
            className="flex flex-col items-end gap-2 rounded-[10px] bg-gray-100 p-4 shadow-lg"
          >
            <div className="h-[200px] w-full">
              <Image
                src={res.imageUrl}
                alt={res.altText}
                width={2480}
                height={1360}
                quality={100}
                priority
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex w-full items-center justify-between">
              <h4 className="text-left text-base font-semibold text-gray-700">
                {res.name}
              </h4>
            </div>
            <p className="text-sm text-gray-500">{res.description}</p>
            <button
              className="mt-3 rounded-[7px] bg-darkgreen px-6 py-2.5 text-base text-lightgreen"
              onClick={() => router.push(`/user/portfolio/${res.id}`)}
            >
              View more
            </button>
          </div>
        ))}
      </div>


      {/* modal  */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 capitalize text-gray-800">
                Edit Farm Profile
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
                      htmlFor="productName"
                      className="ml-1 font-medium text-gray-700"
                    >
                      Farm Name
                    </label>
                    <input
                      type="text"
                      name="productName"
                      id="productName"
                      placeholder="Enter product name"
                      className="caret-color1 border-color1 bg-color1/5 w-full rounded-lg border px-4 py-3 text-sm text-gray-700 outline-none"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
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
                      placeholder="Product Image URI"
                      className="caret-color1 border-color1 bg-color1/5 w-full rounded-lg border px-4 py-3 text-sm text-gray-700 outline-none"
                      value={productImage}
                      onChange={(e: any) => setProductImage(e.target.value)}
                      readOnly
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="productDesc"
                      className="ml-1 font-medium text-gray-700"
                    >
                      Farm Description
                    </label>
                    <input
                      type="text"
                      name="productDesc"
                      id="productDesc"
                      placeholder="Enter product description"
                      className="caret-color1 border-color1 bg-color1/5 w-full rounded-lg border px-4 py-3 text-sm text-gray-700 outline-none"
                      value={productDesc}
                      onChange={(e) => setProductDesc(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="productPrice"
                      className="ml-1 font-medium text-gray-700"
                    >
                      Product Price
                    </label>
                    <input
                      type="text"
                      name="productPrice"
                      id="productPrice"
                      placeholder="Enter product price"
                      className="caret-color1 border-color1 bg-color1/5 w-full rounded-lg border px-4 py-3 text-sm text-gray-700 outline-none"
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

export default UserPortfolio;
