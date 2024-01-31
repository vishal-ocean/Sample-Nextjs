"use client";
import { SquareImageStack } from "@/components/SquareImageStack";
import { Button } from "@/components/UI/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/Table";
import { Input } from "@/components/UI/form/Input";
import IconTransaction from "@/components/icons/IconTransaction";
import { YIELD_FILTER_MODAL, YIELD_TRANSACTIONS_MODAL } from "@/constants";
import { UilAngleDown, UilSearch } from "@/icons";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { cn } from "@/utils";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChainDropdown } from "./components/ChainDropdown";
import { PlatformDropDown } from "./components/PlatformDropDown";
import { useYieldStaticData } from "./components/useYieldStaticData";
const FilterModal = dynamic(() =>
  import("./modals/FilterModal").then((mod) => mod.FilterModal)
);
const YieldTransactionsModal = dynamic(() =>
  import("./modals/YieldTransactionsModal").then(
    (mod) => mod.YieldTransactionsModal
  )
);

export const VaultsListing = () => {
  const { setHandleModal } = useHandleModalAction;
  const { modalOpen } = useHandleModalStore();
  const { VaultsData } = useYieldStaticData();
  const router = useRouter();
  return (
    <>
      <div className="flex gap-1 mt-5 sm:mt-8 lg:hidden mx-3 sm:mx-10 lg:mx-4 xl:mx-0">
        <Button className="p-3 w-full text-14 font-700 leading-4 text-blue-300 bg-secondary rounded-full dark:text-white dark:bg-white/15">
          All Vaults
        </Button>
        <Button className="p-3 w-full text-14 font-700 leading-4 text-white bg-blue-300 rounded-full dark:text-blue-300 dark:bg-white">
          My Vaults
        </Button>
      </div>
      <div className="p-3 sm:p-5 lg:p-6 bg-white rounded-[24px] mt-5 mx-3 sm:mx-10 lg:mx-4 xl:mx-0 dark:bg-white/10">
        <div className="flex justify-between">
          <div className="hidden lg:flex gap-2">
            <Button className="px-4 py-3 text-14 font-700 leading-4 text-blue-300 bg-secondary rounded-full dark:text-white dark:bg-white/15">
              All Vaults
            </Button>
            <Button className="px-4 py-3 text-14 font-700 leading-4 text-white bg-blue-300 rounded-full whitespace-nowrap dark:text-blue-300 dark:bg-white">
              My Vaults
            </Button>
          </div>
          <div className="flex gap-2 justify-between lg:justify-end w-full lg:w-auto">
            <div className="hidden sm:flex gap-2">
              <PlatformDropDown />
              <ChainDropdown />
            </div>
            <div
              className="px-4 py-3 text-14 font-700 leading-4 bg-secondary rounded-full flex gap-2 justify-center sm:hidden w-[108px] cursor-pointer dark:bg-white/15 dark:text-white"
              onClick={() => setHandleModal(YIELD_FILTER_MODAL)}
            >
              Filters
              <UilAngleDown className="h-4 w-4" />
            </div>
            <div className="relative rounded-[28px] bg-gray-200 flex items-center sm:w-[200px] sm:order-first lg:order-last dark:bg-black">
              <div className="flex justify-center absolute text-center pl-4 pointer-events-none">
                <UilSearch className="h-4 w-4 text-blue-300 dark:text-white" />
              </div>
              <Input
                type="text"
                id="search-assets"
                className="input w-full leading-5 rounded-3xl outline-none py-2 pl-10 sm:placeholder:text-16 placeholder:text-gray-300 placeholder:font-700 placeholder:font-body placeholder:text-14 text-14 md:text-16 font-500 font-body cursor-pointer text-blue-300 bg-transparent border-none lg:h-fit h-10 dark:text-white dark:placeholder:text-white/30"
                placeholder="Search"
                required
              />
            </div>
          </div>
        </div>
        <div className="mt-3 sm:mt-5 lg:mt-8 lg:pb-5 lg:px-5 xl:pb-6 xl:px-6">
          <Table>
            <TableHeader className=" hidden lg:table-header-group">
              <TableRow className="border-none">
                {["Pair", "My Deposit", "Now", "Yield", "DailyYield", ""].map(
                  (value, index) => (
                    <TableHead
                      className={cn(
                        "text-12 text-gray-300 font-500 h-fit leading-4 p-0 dark:text-white/30",
                        index !== 0 && "px-2"
                      )}
                      key={`vaults-header-${index}`}
                    >
                      {value}
                    </TableHead>
                  )
                )}
              </TableRow>
            </TableHeader>
            <TableBody className="grid md:grid-cols-2 gap-2 lg:table-row-group">
              {VaultsData.map((item, index) => (
                <>
                  <TableRow
                    key={`vaults-data-${index}`}
                    className="border-secondary md:h-[332px] lg:h-auto rounded-[16px] lg:rounded-none lg:border-solid border-none lg:border-b group bg-gray-200 p-4 lg:p-0 lg:bg-transparent grid grid-cols-[auto_auto] justify-between items-end gap-5 lg:gap-0 lg:table-row dark:border-white/15
                    cursor-pointer sm:dark:bg-transparent dark:bg-white dark:bg-opacity-5 hover:bg-gray-100 dark:hover:bg-white dark:hover:bg-opacity-5"
                  >
                    <TableCell
                      className="p-0 lg:py-6 group-last:pb-0 block lg:table-cell col-span-2 order-1 self-start mt-1 lg:mt-0"
                      onClick={() => router.push(`/yield-farming/pair`)}
                    >
                      <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
                        <div className="h-12 w-12 flex items-end relative">
                          <SquareImageStack />
                          <Image
                            src={"/images/svg/icon-avalanche.svg"}
                            height={16}
                            width={16}
                            alt=""
                            className="h-4 w-4 rounded-full ring-2 ring-white dark:ring-white/15 absolute z-50 top-0 right-0"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="text-16 font-700 leading-5 text-blue-300 dark:text-white">
                            {item.Pair}
                          </p>
                          <div className="flex gap-1">
                            <div className="text-12 font-500 leading-4 text-blue-300 px-3 py-1.5 bg-secondary rounded-lg whitespace-nowrap dark:text-white dark:bg-white/15">
                              Pancake Swap
                            </div>
                            <div className="text-12 font-500 leading-4 text-blue-300 px-3 py-1.5 bg-secondary rounded-lg dark:text-white dark:bg-white/15">
                              Matic
                            </div>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell
                      className="p-0 lg:px-2 lg:py-6 group-last:pb-0 block lg:table-cell order-2"
                      onClick={() => router.push(`/yield-farming/pair`)}
                    >
                      <p className="text-12 font-700 leading-4 text-gray-300 mb-2 lg:hidden dark:text-white/30">
                        My Deposit
                      </p>
                      <p className="text-16 font-500 leading-5 text-blue-300 whitespace-nowrap dark:text-white">
                        {item.Deposit}
                      </p>
                      <p className="text-12 lg:text-16 font-500 leading-4 lg:leading-5 text-gray-300 dark:text-white/30">
                        €6,948.24
                      </p>
                    </TableCell>
                    <TableCell
                      className="p-0 lg:px-2 lg:py-6 group-last:pb-0 block lg:table-cell order-4 lg:order-3"
                      onClick={() => router.push(`/yield-farming/pair`)}
                    >
                      <p className="text-12 font-700 leading-4 text-gray-300 mb-2 lg:hidden dark:text-white/30">
                        Now
                      </p>
                      <p className="text-16 font-500 leading-5 text-gray-300 dark:text-white/30">
                        {item.Now}
                      </p>
                      <p className="text-12 lg:text-16 font-500 leading-4 lg:leading-5 text-gray-300 dark:text-white/30">
                        €0.00
                      </p>
                    </TableCell>
                    <TableCell
                      className="p-0 lg:px-2 lg:py-6 group-last:pb-0 block lg:table-cell order-5 lg:order-4"
                      onClick={() => router.push(`/yield-farming/pair`)}
                    >
                      <p className="text-12 font-700 leading-4 text-gray-300 mb-2 lg:hidden dark:text-white/30">
                        Daily Yield
                      </p>
                      <p className="text-16 font-500 leading-5 text-gray-300 dark:text-white/30">
                        {item.Yield}
                      </p>
                      <p className="text-12 lg:text-16 font-500 leading-4 lg:leading-5 text-gray-300 dark:text-white/30">
                        €0.00
                      </p>
                    </TableCell>
                    <TableCell
                      className="p-0 lg:px-2 lg:py-6 group-last:pb-0 block lg:table-cell order-3 lg:order-5"
                      onClick={() => router.push(`/yield-farming/pair`)}
                    >
                      <p className="text-12 font-700 leading-4 text-gray-300 mb-2 lg:hidden dark:text-white/30">
                        Yield
                      </p>
                      <p className="text-16 font-500 leading-5 text-blue-300 whitespace-nowrap dark:text-white">
                        {item.DailyYield}
                      </p>
                      <p className="text-12 lg:text-16 font-500 leading-4 lg:leading-5 text-gray-300 dark:text-white/30">
                        €6,948.24
                      </p>
                    </TableCell>
                    <TableCell className="p-0 lg:py-6 col-span-2 group-last:pb-0 block lg:table-cell order-6 mt-1 lg:mt-0">
                      <div className="grid grid-cols-[auto_auto_40px] gap-1 lg:justify-end">
                        <div className="w-full lg:w-max flex justify-center px-4 py-3 text-14 font-700 leading-4 bg-secondary lg:bg-transparent hover:bg-blue-300 hover:text-white rounded-full cursor-pointer order-2 lg:order-1 dark:bg-white/15 dark:hover:bg-white/30">
                          Withdraw
                        </div>
                        <div className="w-full lg:w-max flex justify-center px-4 py-3 text-14 font-700 leading-4 bg-secondary hover:bg-blue-300 hover:text-white rounded-full cursor-pointer order-1 lg:order-1 dark:bg-white/15 dark:hover:bg-white/30">
                          Deposit
                        </div>
                        <div
                          className="flex h-10 w-10 justify-center items-center text-14 font-700 leading-4 bg-secondary hover:bg-blue-300 hover:text-white rounded-full cursor-pointer order-last dark:bg-white/15 dark:hover:bg-white/30"
                          onClick={() =>
                            setHandleModal(YIELD_TRANSACTIONS_MODAL)
                          }
                        >
                          <IconTransaction
                            className="h-4 w-4"
                            strokeWidth={0.5}
                          />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {modalOpen === YIELD_TRANSACTIONS_MODAL && <YieldTransactionsModal />}
      {modalOpen === YIELD_FILTER_MODAL && <FilterModal />}
    </>
  );
};
