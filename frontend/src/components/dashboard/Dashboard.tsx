import React from "react";
import dynamic from "next/dynamic";
const Barchart = dynamic(() => import("./charts/BarChart"), { ssr: false });
const Piechart = dynamic(() => import("./charts/PieChart"), { ssr: false });
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { farmInvestments } from "@/utils/products";

const UserDashboard = () => {
  return (
    <section className="flex w-full flex-col gap-6 py-4">
      <h1 className="text-base font-medium uppercase text-darkgreen md:text-xl">
        Overview
      </h1>

      <main className="grid w-full gap-4 md:grid-cols-3 lg:grid-cols-5">
        <div className="flex flex-col items-center justify-center gap-2 rounded-[5px] bg-gray-100 p-3">
          <h4 className="font-light text-gray-800">Total Businesses</h4>
          <h1 className="text-2xl font-semibold text-darkgreen">10</h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 rounded-[5px] bg-gray-100 p-3">
          <h4 className="font-light text-gray-800">Total Investors</h4>
          <h1 className="text-2xl font-semibold text-darkgreen">98</h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 rounded-[5px] bg-gray-100 p-3">
          <h4 className="font-light text-gray-800">Total Investments</h4>
          <h1 className="text-2xl font-semibold text-darkgreen">10 ETH</h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 rounded-[5px] bg-gray-100 p-3">
          <h4 className="font-light text-gray-800">Total Products</h4>
          <h1 className="text-2xl font-semibold text-darkgreen">194</h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 rounded-[5px] bg-gray-100 p-3">
          <h4 className="font-light text-gray-800">Total Sales</h4>
          <h1 className="text-2xl font-semibold text-darkgreen">0.9 ETH</h1>
        </div>
      </main>

      <main className="my-7 grid w-full gap-4 md:grid-cols-2 lg:grid-cols-5">
        <div className="flex flex-col rounded-[5px] bg-gray-100 p-4 lg:col-span-3">
          <h1 className="text-center text-lg font-medium uppercase text-gray-800">
            Monthly Reports
          </h1>
          <Barchart />
        </div>
        <div className="flex flex-col rounded-[5px] bg-gray-100 p-4 lg:col-span-2">
          <h1 className="text-center text-lg font-medium uppercase text-gray-800">
            Sales Reports
          </h1>
          <Piechart />
        </div>
      </main>

      {/* table  */}
      <main className="flex w-full flex-col gap-4 rounded-[5px] bg-gray-100 p-4">
        <h2 className="text-center text-lg font-medium uppercase text-gray-700">
          Recent Business
        </h2>
        <Table>
          <TableHeader>
            <TableRow className="text-gray-800">
              <TableHead className="text-start">Farm Name</TableHead>
              <TableHead>Fund&apos;s Target</TableHead>
              <TableHead>Investors</TableHead>
              <TableHead>Amount Raised</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {farmInvestments.slice(0, 3).map((farm, index) => (
              <TableRow key={index} className="text-gray-600">
                <TableCell className="text-start font-medium">
                  {farm.farmName}
                </TableCell>
                <TableCell>{farm.fundsTarget}</TableCell>
                <TableCell>{farm.investors}</TableCell>
                <TableCell>{farm.amountRaised}</TableCell>
                <TableCell>{farm.balance}</TableCell>
                <TableCell className="text-center">{farm.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </section>
  );
};

export default UserDashboard;
