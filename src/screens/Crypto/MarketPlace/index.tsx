"use client";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/form/Input";
import { CHAIN_DROPDOWN_MODAL } from "@/constants";
import { UilFire, UilSearch } from "@/icons";
import { useHandleModalStore } from "@/store/handleModal";
import { cn } from "@/utils";
import { useState } from "react";
import { ChainDropdown } from "./components/ChainDropdown";
import ChainDropdownModal from "./components/ChainDropdownModal";
import DataCards from "./components/DataCards";
import HeaderCard from "./components/HeaderCard";
import MarketPlaceTokenListing from "./components/MarketPlaceTokenListing";

const MarketPlace = () => {
  const { modalOpen } = useHandleModalStore();
  const [assetFilter, setAssetFilter] = useState("all");
  const [openCurrencyDropdown, setOpenCurrencyDropdown] = useState(false);
  const [currency, setCurrency] = useState("ETH");
  return (
    <>
      <HeaderCard />
      <DataCards />
      <div className="rounded-[24px] bg-white p-5 mx-3 sm:mx-10 lg:mx-4 xl:mx-0">
        <div className="flex sm:justify-between sm:flex-row flex-col gap-y-2 sm:gap-y-0">
          <div className="flex gap-x-2">
            <Button
              variant="secondary"
              className={cn(
                " px-4 py-3 text-14 text-blue-300 font-700 rounded-3xl sm:w-fit w-full leading-4",
                assetFilter === "all" && "bg-blue-300 text-white"
              )}
              onClick={() => setAssetFilter("all")}
            >
              All
            </Button>
            <Button
              variant="secondary"
              className={cn(
                " px-4 py-3 text-14  text-blue-300 font-700 rounded-3xl sm:w-fit w-full flex gap-x-2 leading-4",
                assetFilter === "trending" && "bg-blue-300 text-white"
              )}
              onClick={() => setAssetFilter("trending")}
            >
              <UilFire className="w-4 h-4" />
              <span>Trending</span>
            </Button>
          </div>
          <div className="flex gap-1">
            <div className="order-2 sm:order-1">
              <ChainDropdown
                openCurrencyDropdown={openCurrencyDropdown}
                setOpenCurrencyDropdown={setOpenCurrencyDropdown}
                currency={currency}
                setCurrency={setCurrency}
              />
            </div>
            <div className="relative !bg-white rounded-[28px] flex items-center order-1 sm:order-2 w-full sm:w-auto">
              <div className="flex justify-center absolute text-center pl-4 pointer-events-none">
                <UilSearch className=" h-4 w-4 text-blue-300" />
              </div>
              <Input
                type="text"
                id="search-assets"
                className="input w-full sm:w-[180px] md:w-[200px] leading-5 rounded-3xl outline-none py-2 pl-10 sm:placeholder:text-16 placeholder:text-gray-300  placeholder:font-500 placeholder:font-body placeholder:text-14 text-14 md:text-16 font-500 font-body cursor-pointer text-blue-300 bg-gray-200 border-none lg:h-fit h-10"
                placeholder="Search"
                required
              />
            </div>
          </div>
        </div>
        <MarketPlaceTokenListing trendingAssets={assetFilter === "trending"} />
      </div>
      {modalOpen === CHAIN_DROPDOWN_MODAL && (
        <ChainDropdownModal
          setCurrency={setCurrency}
          setOpenCurrencyDropdown={setOpenCurrencyDropdown}
          currency={currency}
        />
      )}
    </>
  );
};

export default MarketPlace;
