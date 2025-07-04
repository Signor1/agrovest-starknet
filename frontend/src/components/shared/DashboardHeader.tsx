import React, { useContext } from "react";
import Logo from "./Logo";
import logo from "../../../public/logo-green.png";
import Greeting from "./Greeting";
import Link from "next/link";
import { useAccount } from "@starknet-react/core";
import AddressBar from "@/app/components/lib/AddressBar";
import ConnectButton from "@/app/components/lib/Connect";
import { KitContext } from "@/context/kit-context";
const DashboardHeader = ({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { address } = useContext(KitContext);
  return (
    <header className="drop-shadow-1 sticky top-0 z-[99] flex w-full bg-white">
      <div className="flex flex-grow items-center justify-between px-8 py-4 shadow md:px-2 2xl:px-11">
        <div className="flex items-center gap-3 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-[9999] block rounded-sm border border-darkgreen bg-transparent p-1.5 shadow-sm lg:hidden"
          >
            <span className="relative block h-5 w-5 cursor-pointer">
              <span className="absolute right-0 block h-full w-full">
                <span
                  className={`delay-[0] relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-darkgreen duration-200 ease-in-out ${
                    !sidebarOpen && "!w-full delay-300"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-darkgreen delay-150 duration-200 ease-in-out ${
                    !sidebarOpen && "delay-400 !w-full"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-darkgreen delay-200 duration-200 ease-in-out ${
                    !sidebarOpen && "!w-full delay-500"
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-darkgreen delay-300 duration-200 ease-in-out ${
                    !sidebarOpen && "!delay-[0] !h-0"
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-darkgreen duration-200 ease-in-out ${
                    !sidebarOpen && "!h-0 !delay-200"
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Logo
            href="/user"
            classname="flex flex-shrink-0 lg:hidden items-center gap-1 md:w-[120px] w-[100px]"
            image={logo}
          />
        </div>

        <div className="hidden sm:block">
          <Greeting />
        </div>

        <div className="2xsm:gap-7 flex items-center gap-3">
          {address ? (
            <div className="flex items-center gap-4">
              <AddressBar />
            </div>
          ) : (
            <ConnectButton />
          )}

          <Link
            href={`/user/transactions`}
            className="rounded bg-lightgreen px-3 py-1.5 text-darkgreen"
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
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
