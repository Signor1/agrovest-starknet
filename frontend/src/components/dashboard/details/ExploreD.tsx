"use client";
import { farmData, FarmDataType } from "@/utils/products";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@heroui/react";
import Image from "next/image";
import React, { FormEvent, useMemo, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ExploreD = ({ id }: { id: string }) => {
  const [currentData, setCurrentData] = useState<FarmDataType[]>([]);

  useMemo(() => {
    const farmDetail = farmData.filter((farm) => farm.id === Number(id));
    setCurrentData(farmDetail);
  }, [id]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [amount, setAmount] = useState<number>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="flex w-full flex-col gap-6 py-4">
      <h1 className="text-base font-semibold uppercase text-darkgreen md:text-xl">
        Farm Detail
      </h1>

      <main className="grid w-full gap-4 bg-gray-100 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col items-center justify-center gap-2 rounded-[5px] p-3">
          <h4 className="font-light text-gray-800">Funding Target</h4>
          <h1 className="text-2xl font-semibold text-darkgreen">
            {currentData[0]?.fundsTarget}
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 rounded-[5px] p-3">
          <h4 className="font-light text-gray-800">Funds Raised</h4>
          <h1 className="text-2xl font-semibold text-darkgreen">
            {currentData[0]?.amountRaised}
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 rounded-[5px] p-3">
          <h4 className="font-light text-gray-800">Investors</h4>
          <h1 className="text-2xl font-semibold text-darkgreen">
            {currentData[0]?.investors}
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 rounded-[5px] p-3">
          <Button
            onPress={onOpen}
            className="rounded-[7px] bg-darkgreen px-6 py-2.5 text-base text-lightgreen"
          >
            Invest
          </Button>
        </div>
      </main>

      <main className="grid w-full bg-gray-200 md:h-[400px] md:grid-cols-2">
        <div className="h-full w-full">
          <Image
            src={currentData[0]?.imageUrl}
            alt={currentData[0]?.altText}
            width={2480}
            height={1360}
            quality={100}
            priority
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex w-full flex-col gap-4 px-8 pb-4 pt-8 md:pb-0">
          <h2 className="text-2xl font-semibold text-gray-700">
            {currentData[0]?.name}
          </h2>
          <p className="text-gray-600">{currentData[0]?.description}</p>
          <div className="flex w-full flex-col gap-4 border-t border-gray-700 py-5">
            <p className="flex items-center gap-1.5 text-gray-600">
              <FaLocationDot />
              {currentData[0]?.address}
            </p>
            <p className="flex items-center gap-1.5 text-gray-600">
              <IoLogoWhatsapp />
              {currentData[0]?.phoneNumber}
            </p>
            <p className="flex items-center gap-1.5 text-gray-600">
              <MdEmail />
              {currentData[0]?.email}
            </p>
          </div>
        </div>
      </main>

      {/* table  */}
      <main className="flex w-full flex-col gap-4 rounded-[5px] bg-gray-100 p-4">
        <h2 className="text-start text-lg font-medium uppercase text-gray-700">
          Farm Listings
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
            {currentData[0]?.fundingDetails.map((farm, index) => (
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

      {/* modal  */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 capitalize text-gray-800">
                Invest
              </ModalHeader>
              <ModalBody className="flex flex-col gap-4 py-3">
                <form className="grid w-full gap-4" onSubmit={handleSubmit}>
                  <div className="flex flex-col">
                    <label
                      htmlFor="amount"
                      className="ml-1 font-medium text-gray-700"
                    >
                      Enter Amount
                    </label>
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      placeholder="Enter amount"
                      className="caret-color1 border-color1 bg-color1/5 w-full rounded-lg border px-4 py-3 text-sm text-gray-700 outline-none"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
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

export default ExploreD;
