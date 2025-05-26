"use client";
import { farmProducts, ProductType } from "@/utils/products";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Products = ({ title }: { title: string }) => {
  const router = useRouter();
  return (
    <section className="mb-20 flex w-full flex-col px-2">
      <main className="flex w-full flex-col gap-6">
        <h1 className="text-xl font-medium text-darkgreen md:text-2xl">
          {title}
        </h1>

        <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
          {farmProducts.map(
            (product: ProductType, index: number): JSX.Element => (
              <div
                key={index}
                className="flex flex-col gap-2 rounded-[10px] bg-gray-100 p-4 shadow-lg"
              >
                <div className="h-[150px] w-full">
                  <Image
                    src={product.image}
                    alt="farm produce"
                    width={300}
                    height={217}
                    quality={100}
                    priority
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex w-full items-center justify-between">
                  <h4 className="text-base font-semibold text-gray-700">
                    {product.name}
                  </h4>
                  <p className="text-gray-700">
                    {product.priceInEth}{" "}
                    <span className="font-semibold">ETH</span>
                  </p>
                </div>
                <p className="text-sm text-gray-500">{product.description}</p>
                <button
                  className="rounded-[10px] bg-darkgreen px-6 py-2.5 text-base text-lightgreen"
                  onClick={() => router.push(`/user/marketplace/${product.id}`)}
                >
                  Add to cart
                </button>
              </div>
            ),
          )}
        </div>
      </main>
    </section>
  );
};

export default Products;
