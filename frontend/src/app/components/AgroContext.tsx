"use client";
import agrovestContractAbi from "../../../public/abi/agrovest.json";
import strkAbi from "../../../public/abi/strk_abi.json";
import { Contract, RpcProvider } from "starknet";
import { useAccount } from "@starknet-react/core";
import { KitContext } from "@/context/kit-context";
import React from "react";

const AgroContext = ({ children }: { children: React.ReactNode }) => {
  const { account, address } = useAccount();
  const providers = new RpcProvider({
    nodeUrl: process.env.NEXT_PUBLIC_API_KEY!,
  });

  const agrovestContract = new Contract(
    agrovestContractAbi,
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
    account,
  );

  const readAgrovestContract = new Contract(
    agrovestContractAbi,
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
    providers,
  );

  const strkContract = new Contract(
    strkAbi,
    "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
    account,
  );

  return (
    <KitContext.Provider
      value={{
        agrovestContract,
        readAgrovestContract,
        strkContract,
        address,
        account,
      }}
    >
      {children}
    </KitContext.Provider>
  );
};

export default AgroContext;