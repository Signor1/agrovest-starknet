"use client";
import { farmData } from "@/utils/products";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const UserPortfolio = () => {
  const path = usePathname();
  const router = useRouter();

  return (
    <section className="flex w-full flex-col gap-6 py-4">
      <h1 className="text-base font-semibold uppercase text-darkgreen md:text-xl">
        Portfolio
      </h1>

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

      {/* <div className="grid w-full gap-8 md:grid-cols-2">
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
      </div> */}
    </section>
  );
};

export default UserPortfolio;
