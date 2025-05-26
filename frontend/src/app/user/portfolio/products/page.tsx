import React from "react";
import type { NextPage } from "next";
import Products from "@/components/dashboard/portfolioSubRoutes/Products";

const PortfolioProducts: NextPage = () => {
  return (
    <main className="flex w-full flex-col overflow-x-hidden">
      <Products />
    </main>
  );
};

export default PortfolioProducts;
