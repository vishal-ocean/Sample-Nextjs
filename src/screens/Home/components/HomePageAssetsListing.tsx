"use client";
import { UilAngleRightB, UilPlus, UilSearch } from "@/icons";
import { useEffect, useState } from "react";

import Image from "next/image";

import AssetFilterModal from "@/components/AssetFilterModal";
import { Portal } from "@/components/Portal";
import { Button } from "@/components/UI/Button";
import { Card, CardContent } from "@/components/UI/Card";
import { Switch } from "@/components/UI/Switch";
import {
  ACCOUNT_DETAIL_MODAL,
  ACTION_BUTTON_MODAL,
  ASSETS_LISTING_ACTION_MODAL,
  ASSET_FILTER_MODAL,
  VIEW_NFT_MODAL,
} from "@/constants";
import { AssetsListTableData } from "@/constants/AssetsListTableData";
import { readableNumber } from "@/helper/readableNumber";
import { useDebounce } from "@/hooks/useDebounce";
import AssetsActionsModal from "@/screens/Crypto/Home/components/AssetsActionsModal";
import { AccountDetailModal } from "@/screens/neo-banking/components/Modal/AccountDetailModal";
import { ActionButtonModal } from "@/screens/neo-banking/components/Modal/ActionButtonModal";
import { useAssetsData, useChainAssetsList } from "@/services/useCrypto";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { useCryptoStoreActions } from "@/store/useCryptoStore";
import dynamic from "next/dynamic";
import Link from "next/link";
import ViewNFTModal from "./ViewNFTModal";
import { useAssetList } from "./hooks/useAssetList";

const CryptoAssetList = dynamic(() => import("./CryptoAssetList"));
const FiatList = dynamic(() => import("./FiatList"));
const HomeAssetCryptoFilter = dynamic(() => import("./HomeAssetCryptoFilter"));

interface HomePageAssetsListingProps {
  tab: string;
}

const HomePageAssetsListing = ({ tab }: HomePageAssetsListingProps) => {
  const { tabAssetsListConstants } = useAssetList();
  const [isAdded, setIsAdded] = useState(false);
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const { setAssetDetailsData } = useCryptoStoreActions;
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [openChainDropdown, setOpenChainDropdown] = useState(false);
  const [currency, setCurrency] = useState("");
  const { data: chainNetworkList } = useChainAssetsList();
  const [filterOption, setFilterOption] = useState<{
    chainId: "All" | string | null;
    search: string;
    ShowZeroBalance: boolean;
  }>({
    ShowZeroBalance: true,
    chainId: "All",
    search: "",
  });
  const debouncedValue = useDebounce(filterOption, 600);
  const {
    data: assetsData,
    isLoading,
    refetch,
    isRefetching,
  } = useAssetsData({
    ...(filterOption.chainId !== "All" && {
      ChainIds:
        chainNetworkList?.find((x: any) => x.name === filterOption.chainId)
          ?.id || 1,
    }),
    ...(filterOption.search !== "" && {
      Name: filterOption.search,
    }),
    ShowZeroBalance: filterOption?.ShowZeroBalance,
  });
  useEffect(() => {
    if (["all", "crypto", "fiat"].includes(tab) && assetsData?.length > 0) {
      setIsAdded(true);
    } else if (["fiat", "wealth", "nft"].includes(tab)) {
      setIsAdded(false);
    }
  }, [assetsData, tab]);
  useEffect(() => {
    if (isOpenDropdown) {
      document.body.classList.add("!m-0");
      document.body.classList.add("!overflow-y-auto");
    }
  }, [isOpenDropdown]);

  useEffect(() => {
    refetch();
  }, [debouncedValue]);

  useEffect(() => {
    if (modalOpen || openChainDropdown) {
      document.body.classList.add("!m-0");
      document.body.classList.add("!overflow-y-auto");
    }
  }, [modalOpen, openChainDropdown]);

  return (
    <div className="bg-white dark:bg-white/10 rounded-[24px] mt-10 lg:mt-[52px] sm:mx-2 mb-2">
      <div className="py-6 px-4 sm:p-8 xl:p-12">
        <div className="flex xl:flex-row flex-col gap-y-4 xl:justify-between xl:items-center xl:order-3">
          {!["all", "crypto"].includes(tab) && (
            <h3 className="text-16 leading-5 sm:text-24 text-blue-300 dark:text-white font-500 sm:leading-7">
              {tabAssetsListConstants[tab].titleText}
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
                required
                value={filterOption.search}
                onChange={(e) =>
                  setFilterOption((prev: any) => ({
                    ...prev,
                    search: e.target.value,
                  }))
                }
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
                    Show assets with 0 balance
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <Switch
                      className="data-[state=checked]:bg-blue-300"
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
        <div className="sm:mt-6 mt-1">
          {isAdded &&
          ["all", "crypto"].includes(tab) &&
          assetsData?.length > 0 ? (
            <CryptoAssetList
              assetsData={assetsData}
              setIsOpenDropdown={setIsOpenDropdown}
              setAssetDetailsData={setAssetDetailsData}
              filterOption={filterOption}
              isLoading={isLoading}
              isRefetching={isRefetching}
            />
          ) : isAdded && tab === "fiat" ? (
            <FiatList setCurrency={setCurrency} />
          ) : isAdded && tab === "nft" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2">
              <Card className="sm:min-h-[268px] flex flex-col justify-center items-center bg-gray-100 rounded-[28px]">
                <CardContent>
                  <div className="mb-6 flex justify-center items-center">
                    <div className="w-10 h-10 bg-secondary rounded-full dark:bg-gray-600 dark:border-gray-800 " />
                    <div className="w-10 h-10 bg-secondary rounded-full -ml-4 border-2 border-white dark:bg-gray-600 dark:border-gray-800 " />
                    <div className="w-10 h-10 bg-secondary rounded-full -ml-4 border-2 border-white flex justify-center items-center dark:bg-gray-600 dark:border-gray-800 ">
                      <UilPlus className="w-4 h-4 mx-auto text-blue-300  dark:text-gray-800 " />
                    </div>
                  </div>
                  <p className="font-500 leading-5 text-center">
                    {tabAssetsListConstants[tab].addButtonText}
                  </p>
                  <div className="flex md:flex-row flex-col gap-y-3 justify-center items-center gap-x-1 mt-6">
                    <Button
                      // onClick={() => setIsAdded(true)}
                      className="font-700 text-14 leading-4 py-3 px-4"
                    >
                      {tabAssetsListConstants[tab].marketButtonText}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              {AssetsListTableData[tab].map((item, index) => (
                <Card
                  className="sm:min-h-[268px] flex flex-col bg-gray-100 rounded-[28px] cursor-pointer"
                  key={`wealthCard-${index}`}
                >
                  <CardContent onClick={() => setHandleModal(VIEW_NFT_MODAL)}>
                    <div className="relative">
                      <Image
                        src={item.img}
                        width={158}
                        height={168}
                        className="rounded-t-[28px] w-full"
                        alt="nft-bg"
                      />
                      <div className="absolute top-5 left-5 flex">
                        <Image
                          src={item.img}
                          width={40}
                          height={40}
                          className="rounded-full"
                          alt="nft-bg"
                        />
                      </div>
                      <div className="absolute top-5 right-5">
                        <Image
                          src="/images/svg/OpenSea-logo.svg"
                          width={40}
                          height={40}
                          className="rounded-full"
                          alt="nft-bg"
                        />
                      </div>
                      <div className="absolute left-5 bottom-3 right-5 flex flex-col z-20">
                        <span className="font-500 text-white">
                          €
                          {readableNumber(
                            Number(item.marketPrice.toFixed(2) || 0)
                          )}
                        </span>
                        <span className="font-500 text-gray-300">
                          {item.percentage}
                        </span>
                      </div>
                      <div className="bg-gradient-to-t from-[#061935] dark:from-black-100 from-30% to-transparent pointer-events-none w-full !h-[120px] absolute left-0 bottom-0" />
                    </div>
                    <div className="px-3 py-3 sm:py-5 sm:px-5">
                      <p className="font-500 leading-5 text-blue-300">
                        {item.name}
                      </p>
                      <p className="font-500 text-gray-300 whitespace-break-spaces mt-1 sm:mt-2 leading-5">
                        {item.subText.length > 20
                          ? `${item.subText.substring(0, 20)}...`
                          : item.subText}
                      </p>
                    </div>
                  </CardContent>
                  {modalOpen === VIEW_NFT_MODAL && <ViewNFTModal item={item} />}
                </Card>
              ))}
            </div>
          ) : isAdded && tab === "wealth" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
              <Card className="md:min-h-[348px] p-6 md:p-0 flex flex-col justify-center items-center bg-gray-100 rounded-[28px]">
                <CardContent>
                  <div className="mb-3 md:mb-6 flex justify-center items-center">
                    <div className="w-10 h-10 bg-secondary rounded-full dark:bg-gray-600 dark:border-gray-800 " />
                    <div className="w-10 h-10 bg-secondary rounded-full -ml-4 border-2 border-white dark:bg-gray-600 dark:border-gray-800 " />
                    <div className="w-10 h-10 bg-secondary rounded-full -ml-4 border-2 border-white flex justify-center items-center dark:bg-gray-600 dark:border-gray-800 ">
                      <UilPlus className="w-4 h-4 mx-auto text-blue-300  dark:text-gray-800 " />
                    </div>
                  </div>
                  <p className="font-500 leading-5 text-center">
                    {tabAssetsListConstants[tab].addButtonText}
                  </p>
                  <div className="flex md:flex-row flex-col gap-y-3 justify-center items-center gap-x-1 mt-3 sm:mt-6">
                    <Button
                      // onClick={() => setIsAdded(true)}
                      className="font-700 px-4 py-3 !leading-4 text-14"
                    >
                      {tabAssetsListConstants[tab].marketButtonText}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              {AssetsListTableData[tab].map((item, index) => (
                <Card
                  className="min-h-[348px] flex flex-col bg-gray-100 rounded-[28px]"
                  key={`wealthCard-${index}`}
                >
                  <CardContent className="">
                    <div className="relative">
                      <Image
                        src={item.bg || ""}
                        width={284}
                        height={140}
                        className="rounded-t-[28px] w-full !h-[140px]"
                        alt="nft-bg"
                      />
                      <div className="absolute top-5 left-5 flex gap-x-1">
                        <Image
                          src={item.img}
                          width={40}
                          height={40}
                          className="rounded-full"
                          alt="nft-bg"
                        />
                        <Button
                          variant="secondary"
                          className=" text-12 w-[52px] h-10 !p-0"
                        >
                          Hotel
                        </Button>
                      </div>
                      <div className="absolute top-5 right-5">
                        <Button variant="secondary" className="w-10 h-10 !p-0">
                          <UilAngleRightB className="w-4 h-4 mx-auto text-blue-300" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-5 pt-6">
                      <p className="text-24 font-500 text-blue-300 whitespace-break-spaces leading-7">
                        {item.name}
                      </p>
                      <div className="flex justify-between gap-x-2 mt-6">
                        <div className="flex flex-col p-5 bg-blue-300 rounded-[20px] w-[132px] sm:w-[126px] lg:w-[118px]">
                          <span className="text-gray-300 text-12 pb-2 leading-4">
                            You Invested
                          </span>
                          <span className="text-white font-500 leading-5">
                            $25000
                          </span>
                        </div>
                        <div className="flex flex-col p-5 bg-success-200 text-white rounded-[20px] w-[132px] sm:w-[126px] lg:w-[118px]">
                          <span className="text-12 font-500 pb-2 leading-4">
                            Total Earnings
                          </span>
                          <span className="font-500 leading-5">$25000</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="h-[244px] sm:h-[308px] flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-300/30 rounded-[24px]">
              <div>
                <div className="mb-6 flex justify-center items-center">
                  <div className="w-10 h-10 bg-secondary rounded-full border-2 border-white dark:bg-gray-600 dark:border-gray-800 " />
                  <div className="w-10 h-10 bg-secondary rounded-full -ml-4 border-2 border-white dark:bg-gray-600 dark:border-gray-800 " />
                  <div className="w-10 h-10 bg-secondary rounded-full -ml-4 border-2 border-white flex justify-center items-center dark:bg-gray-600 dark:border-gray-800 ">
                    <UilPlus className="w-4 h-4 mx-auto text-blue-300  dark:text-gray-800 " />
                  </div>
                </div>
                <p className="font-500 leading-5 text-center">
                  {tabAssetsListConstants[tab].noAssetsText}
                </p>
                <div className="flex flex-row gap-y-3 justify-center items-center gap-x-1 mt-6">
                  <Link href={tabAssetsListConstants[tab].link}>
                    <Button
                      // onClick={() => setIsAdded(true)}
                      className="font-700 px-3 sm:px-4 py-3 text-14 leading-4"
                    >
                      {tabAssetsListConstants[tab].marketButtonText}
                    </Button>
                  </Link>
                  {tab === "all" && (
                    <Link href={"/wealth"}>
                      <Button
                        variant="secondary"
                        className="text-blue-300 font-700 px-3 sm:px-4 py-3 text-14 leading-4"
                      >
                        Wealth Dashboard
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Portal>
        {modalOpen === ASSETS_LISTING_ACTION_MODAL && <AssetsActionsModal />}
        {modalOpen === ASSET_FILTER_MODAL && (
          <AssetFilterModal
            filterOption={filterOption}
            setFilterOption={setFilterOption}
            isDashboardFilter
          />
        )}
        {modalOpen === ACTION_BUTTON_MODAL && (
          <ActionButtonModal currency={currency} />
        )}
        {modalOpen === ACCOUNT_DETAIL_MODAL && (
          <AccountDetailModal currency={currency} />
        )}
      </Portal>
    </div>
  );
};

export default HomePageAssetsListing;
