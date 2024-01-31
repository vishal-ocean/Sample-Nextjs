"use client";

import { Switch } from "@/components/UI/Switch";
import { UilPlus, UilSearch } from "@/icons";
import { useChainAssetsList } from "@/services/useCrypto";
import { cn } from "@/utils";
import { useState } from "react";
import HomeAssetCryptoFilter from "./HomeAssetCryptoFilter";
import { useAssetList } from "./hooks/useAssetList";

interface ChartTabContentProps {
  tab: string;
}
const HomePageAssetsListing = ({ tab }: ChartTabContentProps) => {
  const { tabAssetsListConstants } = useAssetList();
  const { data: chainNetworkList } = useChainAssetsList();
  const [openChainDropdown, setOpenChainDropdown] = useState(false);

  const [filterOption, setFilterOption] = useState<{
    chainId: "All" | string | null;
    search: string;
    ShowZeroBalance: boolean;
  }>({
    ShowZeroBalance: true,
    chainId: "All",
    search: "",
  });

  return (
    <div className="">
      <p
        className={cn(
          "text-16 leading-5 font-700 text-blue-300 mb-5 dark:text-white",
          tab !== "crypto" && "hidden"
        )}
      >
        Crypto Assets
      </p>
      <div className="flex xl:flex-row flex-col gap-y-4 xl:justify-between xl:items-center xl:order-3">
        {!["crypto"].includes(tab) && (
          <h3 className="text-16 leading-5 text-blue-300 dark:text-white font-700 ">
            {`${tabAssetsListConstants[tab].titleText} Assets`}
          </h3>
        )}
        <div className="grid grid-cols-3 sm:grid-cols-2 xl:grid-cols-[auto_auto_auto] gap-y-3  gap-x-1 sm:gap-x-3 md:justify-end">
          <div className="relative xl:max-w-[200px] col-span-2 sm:col-span-1 order-1 xl:order-3">
            <div className="flex justify-center absolute top-[12px] items-center text-center pl-4 pointer-events-none">
              <UilSearch className="w-4 h-4 text-blue-300 dark:text-white" />
            </div>
            <input
              type=""
              id="search-assets"
              className="input h-10 w-full rounded-full outline-none dark:bg-black dark:text-white py-3 pr-3 pl-10 md:placeholder:text-16 placeholder:text-gray-300 dark:placeholder:text-white/30 placeholder:font-body placeholder:text-14 text-16  font-500 font-body cursor-pointer bg-gray-200  text-blue-300 placeholder:font-700"
              placeholder="Search"
              // required
              // value={filterOption.search}
              // onChange={(e) =>
              //   setFilterOption((prev: any) => ({
              //     ...prev,
              //     search: e.target.value,
              //   }))
              // }
            />
          </div>
          {["all", "crypto"].includes(tab) && (
            <>
              {chainNetworkList?.length > 0 && (
                <HomeAssetCryptoFilter
                  setOpenChainDropdown={setOpenChainDropdown}
                  filterOption={filterOption}
                  chainNetworkList={chainNetworkList}
                  setFilterOption={setFilterOption}
                />
              )}
              <div className="flex gap-x-1 items-center justify-between  sm:justify-start col-span-3 sm:col-span-1 order-3 sm:order-2 sm:justify-self-end">
                <span className="text-blue-300 dark:text-white py-2 sm:px-3 px-1 leading-4 text-14 font-700 flex items-center h-8 mt-[1px]">
                  Zero balance assets{" "}
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <Switch
                    className="data-[state=checked]:bg-blue-300 dark:data-[state=checked]:bg-white/15"
                    checked={filterOption?.ShowZeroBalance}
                    onCheckedChange={(e) => {
                      setFilterOption({
                        ...filterOption,
                        ShowZeroBalance: e,
                      });
                    }}
                  />
                </label>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="bg-gray-100 rounded-[12px] mt-10 dark:bg-white/5">
        {" "}
        <div className="flex justify-center items-center flex-col gap-y-6 px-5 py-12">
          <div className="flex justify-center items-center">
            <div className="w-10 h-10 bg-secondary rounded-full border-2 border-gray-100 dark:bg-[#3C3C3C] dark:border-[#1A1A1A]" />
            <div className="w-10 h-10 bg-secondary rounded-full -ml-4 border-2 border-gray-100 dark:bg-[#3C3C3C] dark:border-[#1A1A1A]" />
            <div className="w-10 h-10 bg-secondary rounded-full -ml-4 border-2 border-gray-100 flex justify-center items-center dark:bg-[#3C3C3C] dark:border-[#1A1A1A]">
              <UilPlus className="w-4 h-4 mx-auto text-blue-300  dark:text-white/30" />
            </div>
          </div>
          <span className="text-16 text-gray-300 font-500 leading-5 dark:text-white/30">
            No Crypto with Zero balance{" "}
          </span>
          <div className="bg-primary py-3 px-4 rounded-full">
            <p className="text-14 leading-4 font-700 text-white">
              Deposit Crypto
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePageAssetsListing;
