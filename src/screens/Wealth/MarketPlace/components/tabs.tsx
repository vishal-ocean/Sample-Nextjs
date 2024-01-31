"use client";
import { UilAngleDown, UilSearch, UilSlidersVAlt } from "@/icons";
import { useState } from "react";

import { Button } from "@/components/UI/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/UI/Dropdown";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import CustomToolTip from "@/components/UI/Tooltip";
import { IconRoundedCheck } from "@/components/icons/IconRoundedCheck";
import {
  FILTER_MODAL,
  PRIMARY_MARKET,
  SECONDARY_MARKET,
  WEALTH_ASSETS_FILTER_MODAL,
} from "@/constants";
import RealEstate from "@/screens/Wealth/RealEstate";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import {
  useMarketPlaceTabAction,
  useMarketPlaceTabStore,
} from "@/store/marketPlaceTabStore";
import { cn } from "@/utils";
import WealthAssetsFilterModal from "./Modals/WealthAssetsFilterModal";
import SecondaryMarket from "./SecondaryMarket";
import MarketTypes from "./market";
import { useTabItems } from "./useTabItems";

const Tab = () => {
  const { marketPlaceTab } = useMarketPlaceTabStore();
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const [filterOption, setFilterOption] = useState("all");
  const { setMarketPlaceTab } = useMarketPlaceTabAction;
  const { marketTabItems, tabItems } = useTabItems();

  return (
    <>
      <Tabs
        defaultValue={marketPlaceTab}
        className="sm:w-auto whitespace-nowrap pb-3 md:pb-0 relative mt-6 lg:mt-10 mx-3 sm:mx-10 lg:mx-4 xl:mx-0"
      >
        <TabsList className="flex sm:justify-between flex-col md:flex-row  gap-y-3 h-fit overflow-x-auto items-start !p-0 w-full  gap-3">
          <div className="flex gap-x-1 sm:gap-x-2 overflow-visible">
            {marketTabItems.map((item, index) => (
              <CustomToolTip content={item.tooltip} key={`tabs-${index}`}>
                <TabsTrigger
                  value={item.tab}
                  className={cn(
                    "relative flex gap-x-2 justify-center items-center hover:bg-white/15 dark:bg-white/15 dark:text-white/30 text-blue-300 py-3 px-4 rounded-3xl leading-5",
                    item?.bg,
                    item?.activeTabBg,
                    item?.tab !== "all" && ""
                  )}
                  disabled={item.tab === SECONDARY_MARKET}
                >
                  <span className="leading-4 text-14 font-700 font-body flex gap-2">
                    {item?.icon}
                    {item?.tabName}
                  </span>
                </TabsTrigger>
              </CustomToolTip>
            ))}
          </div>
          <div className="flex gap-1 justify-end w-full">
            <DropdownMenu>
              <DropdownMenuTrigger className="group md:order-first order-last hidden sm:block">
                <div className="flex items-center gap-2 text-14 leading-4 bg-secondary text-blue-300 dark:text-white dark:bg-white/15 group-data-[state=open]:bg-blue-300 font-700 dark:group-data-[state=open]:bg-white dark:group-data-[state=open]:text-blue-300 group-data-[state=open]:text-white px-4 py-3 rounded-full">
                  All
                  <UilAngleDown className="w-4 h-4 group-data-[state=open]:rotate-180" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="p-4 w-[220px] bg-gray-500/40 dark:bg-white/10 backdrop-blur-lg rounded-xl"
                sideOffset={15}
              >
                <p className="text-12 font-500 leading-4 text-blue-300 dark:text-white">
                  Wealth Type
                </p>
                <div className="divide-y divide-gray-300/10 dark:divide-white/15">
                  {tabItems.map((item, index) => (
                    <DropdownMenuItem
                      key={`dropdown-${index}`}
                      className="grid grid-cols-[auto_1fr_auto] gap-3 px-0 py-2 last:pb-0 rounded-none cursor-pointer"
                      onClick={() => setFilterOption(item.tab)}
                    >
                      <span className="h-7 w-7 flex justify-center items-center bg-white/40 dark:bg-white/15 dark:text-white rounded-full text-blue-300">
                        {item.icon}
                      </span>
                      <span className="text-14 font-500 leading-4 text-blue-300 dark:text-white">
                        {item.tabName}
                      </span>

                      {filterOption === item.tab && (
                        <IconRoundedCheck className="text-primary h-4 w-4" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              className="px-4 py-3 bg-secondary dark:text-white dark:bg-white/15 text-blue-300 gap-x-2 rounded-3xl items-center text-14 font-700 leading-4 transition-all sm:hidden flex"
              onClick={() => setHandleModal(WEALTH_ASSETS_FILTER_MODAL)}
            >
              {filterOption !== ""
                ? tabItems.find((item) => item.tab === filterOption)?.tabName
                : "Real Estate"}
              <UilAngleDown className="h-4 w-4" />
            </Button>
            <Button
              className="flex lg:hidden px-4 py-3 bg-secondary dark:bg-white/15 dark:text-white text-blue-300 gap-x-2 rounded-3xl items-center text-14 font-700 leading-4 transition-all"
              onClick={() => setHandleModal(FILTER_MODAL)}
            >
              <UilSlidersVAlt className="h-4 w-4" />
            </Button>
            <div className="relative !bg-white dark:!bg-white/10 rounded-full flex items-center order-first md:order-last">
              <div className="flex justify-center absolute top-[28%] items-center text-center pl-[10px] pointer-events-none">
                <UilSearch className="w-4 h-4 text-blue-300 dark:text-white" />
              </div>
              <input
                type="text"
                id="search-assets"
                className="input w-full leading-4 rounded-full dark:placeholder:text-white/30 outline-none py-3 pl-8 placeholder:text-gray-300  placeholder:font-700 placeholder:font-body placeholder:text-14 text-14 font-700 font-body cursor-pointer text-blue-300 bg-white border-none dark:bg-opacity-5 dark:text-white"
                placeholder="Search"
              />
            </div>
          </div>
          {/* <div className="gap-x-1  hidden lg:flex">
            {tabItems.map((item, index) => (
              // <CustomToolTip content={item.tooltip} >
              <Button
                key={`tabs-${index}`}
                variant={"secondary"}
                className={cn(
                  "text-14 font-700 hover:bg-white text-blue-300 py-3 px-4 rounded-3xl leading-4 pointer-events-none",
                  item?.tab === filterOption && "bg-secondary"
                )}
                onClick={() => setFilterOption(item?.tab)}
                disabled
              >
                {item?.tabName}
              </Button>
              // </CustomToolTip>
            ))}
          </div> */}

          <div className="gap-x-2 hidden w-full sm:w-auto">
            <Button
              className="flex px-4 py-3 bg-secondary dark:bg-white/15 dark:text-white w-2/5 sm:w-auto text-blue-300 gap-x-2 rounded-3xl items-center text-14 font-700 leading-4 transition-all"
              onClick={() => setHandleModal(FILTER_MODAL)}
            >
              Filters
              <UilAngleDown
                className={`h-4 w-4 ${
                  modalOpen == FILTER_MODAL && "rotate-180"
                }`}
              />
            </Button>
            {/* <Button
              className="px-4 py-3 bg-secondary dark:text-white dark:bg-white/15 w-full sm:w-auto text-blue-300 gap-x-2 rounded-3xl items-center text-14 font-700 leading-4 transition-all sm:hidden flex pointer-events-none"
              onClick={() => setHandleModal(WEALTH_ASSETS_FILTER_MODAL)}
            >
              {filterOption !== ""
                ? tabItems.find((item) => item.tab === filterOption)?.tabName
                : "Real Estate"}
              <UilAngleDown className={`h-4 w-4`} />
            </Button> */}
            {/* <DropdownMenu>
              <DropdownMenuTrigger className="bg-secondary text-blue-300 text-14 font-700 py-0 h-10 px-4 rounded-3xl data-[state=open]:text-white data-[state=open]:bg-blue-300 leading-4 sm:block hidden dropdown-cst">
                <div className="flex items-center gap-x-2 rounded-full">
                  <span className="font-700 leading-5 text-14 dropdown-title">
                    {filterOption !== ""
                      ? tabItems.find((item) => item.tab === filterOption)
                          ?.tabName
                      : "Real Estate"}
                  </span>
                  <UilAngleDown className="chevron-down h-4 w-4 transition-all dropdown-title" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-secondary/50 backdrop-blur-[16px] p-4 flex flex-col rounded-[12px] w-[220px] mt-1">
                <DropdownMenuLabel className="text-gray-300 text-12 font-500 leading-5 py-0">
                  Wealth Assets
                </DropdownMenuLabel>
                <div className="max-h-[308px] overflow-y-auto">
                  {tabItems.map((item, index) => (
                    <>
                      <DropdownMenuItem
                        className={cn(
                          "w-full flex justify-between items-center my-2 cursor-pointer",
                          item.tab !== "real-estate" && "cursor-not-allowed"
                        )}
                        onClick={() =>
                          setFilterOption(
                            item.tab === "real-estate" ? item.tab : ""
                          )
                        }
                        key={`assetsDropdown-${index}`}
                      >
                        <span className="text-14 font-500 text-blue-300 leading-4">
                          {item.tabName}
                        </span>
                        {filterOption === item.tab && (
                          <UilCheckCircle className="text-primary h-4 w-4" />
                        )}
                      </DropdownMenuItem>
                      {index !== tabItems.length - 1 && (
                        <DropdownMenuSeparator className="p-0 m-0 bg-gray-300 opacity-10" />
                      )}
                    </>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </div>
        </TabsList>
        <TabsContent value={PRIMARY_MARKET} className="mt-6">
          <div className="grid grid-cols-12 gap-x-2">
            <div className="col-span-4 xl:col-span-3 hidden lg:block">
              <MarketTypes />
            </div>
            <div className="col-span-12 lg:col-span-8 xl:col-span-9">
              <RealEstate isMarketPlaceEstate />
            </div>
          </div>
        </TabsContent>
        <TabsContent value={SECONDARY_MARKET} className="mt-6">
          <SecondaryMarket />
        </TabsContent>
      </Tabs>
      {modalOpen === WEALTH_ASSETS_FILTER_MODAL && (
        <WealthAssetsFilterModal
          filterOption={filterOption}
          setFilterOption={setFilterOption}
        />
      )}
    </>
  );
};

export default Tab;
