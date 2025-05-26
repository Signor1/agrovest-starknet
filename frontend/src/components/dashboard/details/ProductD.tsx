"use client";
import { farmProducts, ProductType } from "@/utils/products";
import Image from "next/image";
import React, { FormEvent, useContext, useMemo, useState } from "react";
import {
  Button,
  useDisclosure,
} from "@heroui/react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import avatar from "../../../../public/avatar.png";
import { reviews } from "@/utils/reviews";
import { KitContext } from "@/context/kit-context";
import toast from "react-hot-toast";
const ProductD = ({ id }: { id: string }) => {
  const [currentData, setCurrentData] = useState<ProductType[]>([]);

  const { agrovestContract } = useContext(KitContext);

  useMemo(() => {
    const farmDetail = farmProducts.filter(
      (farmProduct) => farmProduct.id === Number(id),
    );
    setCurrentData(farmDetail);
  }, [id]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [quantity, setQuantity] = useState<number>(1);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    toast.loading("Buying Product...");
    try {
      const addToCartResult = await agrovestContract!.add_product_to_cart(Number(id));
      toast.dismiss();
      toast.success("Product bought successfully");
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error(`error: ${error}`);
    }
  };
  return (
    <section className="flex w-full flex-col gap-6 py-4">
      <h1 className="text-base font-semibold uppercase text-darkgreen md:text-xl">
        Product Detail
      </h1>

      <main className="grid w-full bg-gray-100 md:grid-cols-2">
        <div className="h-[250px] w-full md:h-[350px]">
          <Image
            src={currentData[0]?.image}
            alt="productImage"
            width={640}
            height={427}
            quality={100}
            priority
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex w-full flex-col gap-4 px-8 py-8">
          <h4 className="text-gray-600">Obasanjo Farm</h4>
          <div className="flex w-full items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-700">
              {currentData[0]?.name}
            </h2>
            <p className="text-gray-600">
              {currentData[0]?.priceInEth}{" "}
              <span className="font-semibold">ETH</span>
            </p>
          </div>
          <p className="text-gray-600">{currentData[0]?.description}</p>
          <div className="flex w-full items-center justify-between">
            <p className="text-lg font-semibold text-gray-600">Quantity</p>
            <div className="flex">
              <button
                className="flex h-8 w-8 items-center justify-center rounded bg-darkgreen text-base text-gray-200 md:h-10 md:w-10"
                onClick={handleDecrement}
              >
                <FaMinus />
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="h-10 w-10 rounded border-[0.5px] border-gray-400 text-center font-medium text-gray-700"
              />
              <button
                className="flex h-8 w-8 items-center justify-center rounded bg-darkgreen text-base text-gray-200 md:h-10 md:w-10"
                onClick={handleIncrement}
              >
                <FaPlus />
              </button>
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            type="button"
            className="mt-3 rounded-[7px] bg-darkgreen px-6 py-2.5 text-base text-lightgreen"
          >
            Add to cart
          </Button>
        </div>
      </main>

      {/* Reviews */}
      <main className="flex w-full flex-col gap-8 bg-gray-100 px-8 py-8">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-700">
            Product Reviews
          </h2>
          <Button
            onPress={onOpen}
            className="rounded-[5px] bg-darkgreen px-6 py-2.5 text-sm text-gray-200"
          >
            Submit Review
          </Button>
        </div>

        <section className="flex w-full flex-col gap-4">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="flex w-full flex-col items-start justify-start gap-3 rounded bg-gray-50 p-4 md:flex-row md:gap-6"
            >
              <div className="h-[50px] w-[50px] md:h-[70px] md:w-[70px]">
                <Image
                  src={avatar}
                  alt="avatar"
                  width={100}
                  height={100}
                  className="h-full w-full object-cover"
                  quality={100}
                  priority
                />
              </div>
              <article className="flex-1">
                <p className="text-gray-600">{review}</p>
              </article>
            </div>
          ))}
        </section>
      </main>
    </section>
  );
};

export default ProductD;
