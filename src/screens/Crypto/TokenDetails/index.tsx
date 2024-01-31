"use client";
import IconBorrow from "@/components/icons/IconBorrow";
import IconExchange from "@/components/icons/IconExchange";
import { IconSwap } from "@/components/icons/IconSwap";
import IconTimeCoinDeposit from "@/components/icons/IconTimeCoinDeposit";
import IconTimeCoinWithdraw from "@/components/icons/IconTimeCoinWithdraw";
import {
  CRYPTO_DEPOSIT_MODAL,
  SWAP_CRYPTO_MODAL,
  TRANSFER_CRYPTO_MODAL,
} from "@/constants";
import { readableNumber } from "@/helper/readableNumber";
import {
  UilArrowCircleUp,
  UilArrowGrowth,
  UilGraphBar,
  UilMinus,
  UilPlus,
  UilWallet,
} from "@/icons";
import { useGetAsset } from "@/services/useCrypto";
import { useHandleModalAction } from "@/store/handleModal";
import { useCryptoStoreActions } from "@/store/useCryptoStore";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import CardsSection from "./components/CardsSection";
import ChartSection from "./components/ChartSection";
import HeaderCard from "./components/HeaderCard";

const TokenDetails = () => {
  const { setHandleModal } = useHandleModalAction;
  const { tokenId } = useParams();
  const getAssetMutation = useGetAsset();
  const { setAssetDetailsData } = useCryptoStoreActions;

  useEffect(() => {
    if (tokenId) {
      getAssetMutation.mutate(Number(tokenId));
    }
  }, [tokenId]);

  return (
    <div className="">
      <HeaderCard
        assetData={getAssetMutation?.data}
        isLoading={getAssetMutation?.isLoading}
      />
      <div className="grid lg:grid-cols-12 grid-cols-1 mt-2 md:mt-6 gap-x-6 lg:px-4 xl:px-0">
        <div className="grid lg:col-span-4 xl:col-span-3 lg:hidden grid-cols-1 lg:grid-cols-1 gap-2 lg:mt-0 mb-6 md:px-10 lg:px-0 px-3 sm:px-10">
          <div className="w-full flex flex-col  bg-white rounded-[20px] p-2 pt-5 h-max dark:bg-white/10">
            {getAssetMutation?.isLoading ? (
              <div className="animate-pulse flex justify-between">
                <div className="h-10 w-[140px]"></div>
                <div className="h-10 w-[60px]"></div>
              </div>
            ) : (
              <>
                <div className="">
                  <span className="flex gap-2 px-3">
                    <UilWallet
                      className="h-4 w-4 text-blue-300 dark:text-white"
                      strokeWidth={1.2}
                    />
                    <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                      Balance
                    </p>
                  </span>
                </div>
                <div className="flex flex-col px-3 mb-10 mt-4 gap-1">
                  <span className="text-40 text-blue-300 dark:text-white font-500 leading-10">
                    €
                    {readableNumber(
                      Number(
                        getAssetMutation?.data?.balanceFiat.toFixed(4) || 0
                      )
                    )}
                  </span>
                  <span className="text-16 text-gray-300 dark:text-white/30 font-700 leading-5">
                    {Number(getAssetMutation?.data?.balance.toFixed(6) || 0)}{" "}
                    {getAssetMutation?.data?.shortName}
                  </span>
                </div>

                <div className=" grid grid-cols-2 gap-2">
                  <div
                    className="rounded-[24px] bg-gray-100 dark:bg-white/10 py-5 px-3 flex flex-col items-center gap-3 group cursor-pointer"
                    onClick={() => {
                      setHandleModal(TRANSFER_CRYPTO_MODAL);
                      setAssetDetailsData(getAssetMutation?.data);
                    }}
                  >
                    <span className="h-10 w-10 bg-primary rounded-full flex justify-center items-center group-hover:bg-blue-300">
                      <IconTimeCoinWithdraw
                        strokeWidth={1.2}
                        className=" h-4 w-4 text-white"
                      />
                    </span>
                    <p className="text-14 font-700 leading-4 text-blue-300 dark:text-white">
                      Withdraw
                    </p>
                  </div>
                  <div
                    className="rounded-[24px] bg-gray-100 dark:bg-white/10 py-5 px-3 flex flex-col items-center gap-3 group cursor-pointer"
                    onClick={() => {
                      setHandleModal(CRYPTO_DEPOSIT_MODAL);
                      setAssetDetailsData(getAssetMutation?.data);
                    }}
                  >
                    <span className="h-10 w-10 bg-primary rounded-full flex justify-center items-center group-hover:bg-blue-300">
                      <IconTimeCoinDeposit
                        strokeWidth={1.2}
                        className=" h-4 w-4 text-white"
                      />
                    </span>
                    <p className="text-14 font-700 leading-4 text-blue-300 dark:text-white">
                      Deposit
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="lg:col-span-8 xl:col-span-9 col-span-1 w-full px-3 sm:px-10 lg:px-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
            <div className="rounded-[20px] bg-white p-5 lg:p-4 xl:p-5 dark:bg-white/10">
              <span className="flex gap-2 items-center text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                <UilArrowGrowth className="h-4 w-4 text-blue-300 dark:text-white" />
                Market Cap
              </span>
              <p className="text-16 font-700 leading-5 text-blue-300 dark:text-white mt-5">
                €
                {readableNumber(
                  Number(getAssetMutation?.data?.marketCap?.toFixed(2) || 0)
                )}
              </p>
            </div>
            <div className="rounded-[20px] bg-white p-5 lg:p-4 xl:p-5 dark:bg-white/10">
              <span className="flex gap-2 items-center text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                <UilGraphBar className="h-4 w-4 text-blue-300 dark:text-white" />
                Volume, 24H
              </span>
              <p className="text-16 font-700 leading-5 text-blue-300 dark:text-white mt-5">
                €
                {readableNumber(
                  Number(getAssetMutation?.data?.volume24H?.toFixed(2) || 0)
                )}
              </p>
            </div>
            <div className="rounded-[20px] bg-white p-5 lg:p-4 xl:p-5 dark:bg-white/10">
              <span className="flex gap-2 items-center text-12 font-500 leading-4 text-gray-300 dark:text-white/30 whitespace-nowrap">
                <IconExchange className="h-4 w-4 text-blue-300 dark:text-white" />
                Circulating Supply
              </span>
              <p className="text-16 font-700 leading-5 text-blue-300 dark:text-white mt-5">
                €
                {readableNumber(
                  Number(
                    getAssetMutation?.data?.circulatingSupply?.toFixed(2) || 0
                  )
                )}
              </p>
            </div>
            <div className="rounded-[20px] bg-white p-5 lg:p-4 xl:p-5 dark:bg-white/10">
              <span className="flex gap-2 items-center text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                <UilArrowCircleUp className="h-4 w-4 text-blue-300 dark:text-white" />
                All Time High
              </span>
              <p className="text-16 font-700 leading-5 text-blue-300 dark:text-white mt-5">
                €
                {readableNumber(
                  Number(getAssetMutation?.data?.allTimeHigh?.toFixed(2) || 0)
                )}
              </p>
            </div>
          </div>
          <ChartSection
            assetData={getAssetMutation?.data}
            isLoading={getAssetMutation?.isLoading}
            tokenId={tokenId}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 ">
            <div
              className="rounded-[24px] bg-white dark:bg-white/10 py-5 px-3 flex flex-col items-center gap-3 group cursor-pointer"
              onClick={() => setHandleModal(SWAP_CRYPTO_MODAL)}
            >
              <span className="h-10 w-10 bg-primary rounded-full flex justify-center items-center group-hover:bg-blue-300">
                <IconSwap className=" h-4 w-4 text-white" />
              </span>
              <p className="text-14 font-700 leading-4 text-blue-300 dark:text-white">
                Swap
              </p>
            </div>
            {/* <div
              className="rounded-[24px] bg-white dark:bg-white/10 py-5 px-3 flex flex-col items-center gap-3 group cursor-pointer"
              onClick={() => {
                setHandleModal(TRANSFER_CRYPTO_MODAL);
                setAssetDetailsData(getAssetMutation?.data);
              }}
            >
              <span className="h-10 w-10 bg-primary rounded-full flex justify-center items-center group-hover:bg-blue-300">
                <IconTimeCoinWithdraw
                  strokeWidth={1.2}
                  className=" h-4 w-4 text-white"
                />
              </span>
              <p className="text-14 font-700 leading-4 text-blue-300 dark:text-white">
                Withdraw
              </p>
            </div>
            <div
              className="rounded-[24px] bg-white dark:bg-white/10 py-5 px-3 flex flex-col items-center gap-3 group cursor-pointer"
              onClick={() => {
                setHandleModal(CRYPTO_DEPOSIT_MODAL);
                setAssetDetailsData(getAssetMutation?.data);
              }}
            >
              <span className="h-10 w-10 bg-primary rounded-full flex justify-center items-center group-hover:bg-blue-300">
                <IconTimeCoinDeposit
                  strokeWidth={1.2}
                  className=" h-4 w-4 text-white"
                />
              </span>
              <p className="text-14 font-700 leading-4 text-blue-300 dark:text-white">
                Deposit
              </p>
            </div> */}
            <div className="rounded-[24px] bg-gray-100 dark:bg-white/5 py-5 px-3 flex flex-col items-center gap-3 group pointer-events-none">
              <span className="h-10 w-10 bg-secondary dark:bg-white/15 rounded-full flex justify-center items-center">
                <UilPlus className=" h-4 w-4 text-gray-300 dark:text-white/30" />
              </span>
              <p className="text-14 font-700 leading-4 text-gray-300 dark:text-white/30 ">
                Buy
              </p>
            </div>
            <div className="rounded-[24px] bg-gray-100 dark:bg-white/5 py-5 px-3 flex flex-col items-center gap-3 group pointer-events-none">
              <span className="h-10 w-10 bg-secondary dark:bg-white/15 rounded-full flex justify-center items-center">
                <UilMinus className=" h-4 w-4 text-gray-300 dark:text-white/30" />
              </span>
              <p className="text-14 font-700 leading-4 text-gray-300 dark:text-white/30 ">
                Sell
              </p>
            </div>
            <div className="rounded-[24px] bg-gray-100 dark:bg-white/5 py-5 px-3 flex flex-col items-center gap-3 group pointer-events-none">
              <span className="h-10 w-10 bg-secondary dark:bg-white/15 rounded-full flex justify-center items-center">
                <IconBorrow className=" h-4 w-4 text-gray-300 dark:text-white/30" />
              </span>
              <p className="text-14 font-700 leading-4 text-gray-300 dark:text-white/30 ">
                Borrow
              </p>
            </div>
          </div>
        </div>
        <CardsSection
          assetData={getAssetMutation?.data}
          isLoading={getAssetMutation?.isLoading}
        />
      </div>
    </div>
  );
};

export default TokenDetails;
