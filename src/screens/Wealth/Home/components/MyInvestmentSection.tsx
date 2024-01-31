"use client";
import { Input } from "@/components/UI/form/Input";
import { UilListUl, UilSearch, UilTh } from "@/icons";
import { cn } from "@/utils";
import { useState } from "react";
import NoInvestmentFound from "./NoInvestmentFound";

const MyInvestmentSection = () => {
  const [gridLayout, setGridLayout] = useState(false);
  return (
    <div className="mt-2 sm:mt-4 lg:mt-6 p-5 md:p-8 lg:p-12 lg:pt-10 bg-white dark:bg-white/10 rounded-[24px] flex flex-col gap-y-6 lg:gap-y-10 mx-3 sm:mx-10 lg:mx-4 xl:mx-0">
      <div className="flex justify-between md:flex-row flex-col md:items-start">
        <div className="flex md:flex-col flex-row items-center md:items-start justify-between gap-y-1">
          <span className="sm:text-24 sm:font-500 font-700 text-blue-300 dark:text-white sm:leading-7 leading-5">
            My Investments
          </span>
          <span className="text-16 font-500 text-gray-300 dark:text-white/30 leading-5">
            €0.00
          </span>
        </div>
        <div className="flex gap-x-2 md:justify-end justify-between mt-6 md:mt-0">
          <div className="relative w-full lg:w-[280px] !bg-transparent rounded-[28px] flex items-center">
            <div className="flex justify-center absolute lg:top-[14px] items-center text-center pl-4 pointer-events-none">
              <UilSearch className="lg:w-6 lg:h-6 h-4 w-4 text-blue-300 z-10 dark:text-white" />
            </div>
            <Input
              type="text"
              className="input w-full rounded-3xl outline-none dark:bg-black py-4 pl-12 lg:placeholder:text-16 placeholder:text-gray-300 placeholder:dark:text-white/30 placeholder:font-500 placeholder:font-body placeholder:text-14 text-14 lg:text-16 font-500 cursor-pointer text-blue-300 bg-gray-200 lg:h-fit h-10 border-none leading-5"
              placeholder="Search"
            />
          </div>
          <div className="bg-secondary dark:bg-white/15 rounded-3xl  p-1 lg:p-[6px] gap-x-1 justify-center items-center max-h-[40px] lg:max-h-[52px] flex">
            <div
              className={cn(
                "rounded-full lg:h-10 lg:w-10 h-8 w-8  flex items-center cursor-pointer",
                !gridLayout && "bg-white dark:bg-white/10"
              )}
              onClick={() => setGridLayout(false)}
            >
              <UilListUl className="w-4 h-4 text-blue-300 m-auto dark:text-white" />
            </div>
            <div
              onClick={() => setGridLayout(true)}
              className={cn(
                "rounded-full lg:h-10 lg:w-10 h-8 w-8  flex justify-center items-center cursor-pointer",
                gridLayout && "bg-white dark:bg-white/10"
              )}
            >
              <UilTh className="w-3 h-3 text-blue-300  cursor-pointer dark:text-white" />
            </div>
          </div>
        </div>
      </div>
      <NoInvestmentFound />
      {/* {gridLayout ? (
        <ListAsCardView data={MyInvestmentData} />
      ) : (
        <ListAsTableView data={MyInvestmentData} />
      )} */}
    </div>
  );
};

export default MyInvestmentSection;
