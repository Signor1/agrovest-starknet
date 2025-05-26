/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cartItems } from "@/utils/cart";
import Image from "next/image";

const PurchasedItems = () => {
  const path = usePathname();

  return (
    <section className="flex w-full flex-col gap-6 py-4">
      <h1 className="text-base font-semibold uppercase text-darkgreen md:text-xl">
        Transactions
      </h1>

      <div className="flex w-full gap-0 md:ml-3">
        <Link
          href="/user/transactions"
          className={`px-4 py-2 text-base font-medium ${path === "/user/transactions" ? "bg-darkgreen text-gray-200" : "bg-lightgreen text-darkgreen"}`}
        >
          Cart
        </Link>
        <Link
          href="/user/transactions/purchased"
          className={`px-4 py-2 text-base font-medium ${path === "/user/transactions/purchased" ? "bg-darkgreen text-gray-200" : "bg-lightgreen text-darkgreen"}`}
        >
          Purchased
        </Link>
      </div>

      <div className="w-full flex-1 rounded bg-gray-100 p-4">
        <Table>
          <TableHeader>
            <TableRow className="text-gray-800">
              <TableHead className="text-start">Product</TableHead>
              <TableHead>Price(ETH)</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="text-center">Total(ETH)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartItems.map((item, index) => (
              <TableRow key={index} className="text-gray-600">
                <TableCell className="text-start font-medium">
                  <div className="flex items-center gap-2">
                    <div className="h-[50px] w-[50px]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={640}
                        height={427}
                        quality={100}
                        priority
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-sm font-semibold text-gray-700">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-600">Obasanjo Farm</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{item.priceInEth}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell className="text-center font-semibold">
                  {item.total}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableHead className="text-start font-semibold">Total</TableHead>
              <TableHead className="font-semibold">2 ETH</TableHead>
              <TableHead className="font-semibold">6</TableHead>
              <TableHead className="text-center font-semibold">
                12 ETH
              </TableHead>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </section>
  );
};

export default PurchasedItems;
