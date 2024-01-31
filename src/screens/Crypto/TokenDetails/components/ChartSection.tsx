"use client";
import ChartDropDownModal from "@/components/ChartDropDownModal";
import { CHART_FILTER_DROPDOWN } from "@/constants";
import { readableNumber } from "@/helper/readableNumber";
import { useGetAssetsChartData } from "@/services/useCrypto";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { cn } from "@/utils";
import moment from "moment";
import dynamic from "next/dynamic";
import { useState } from "react";

const CryptoChart = dynamic(() => import("@/components/Chart/CryptoChart"));

function getScreenWidth() {
  if (typeof window !== "undefined") {
    return window.innerWidth;
  }
  return 0; // Default value for SSR
}
const ChartSection = ({ assetData, isLoading, tokenId }: any) => {
  const screenWidth = getScreenWidth();
  const [range, setRange] = useState("All");
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const [chartInterval, setChartInterval] = useState(
    screenWidth > 768 ? 12 : 5
  );
  const chartParamsData = {
    Currency: "eur",
    From: moment()?.subtract(1, "months")?.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
    To: moment()?.toISOString(),
  };
  const { data, isLoading: chartLoading } = useGetAssetsChartData(
    chartParamsData,
    tokenId
  );
  return (
    <>
      <div className="py-5 bg-white dark:bg-transparent dark:border dark:border-white/15 rounded-[24px]">
        {/* <div className="flex justify-end gap-x-1">
          <div className="sm:block hidden">
            {["All", "1Y", "6M", "1M"].map((item, index) => (
              <Button
                variant="outline"
                className={cn(
                  "h-10 p-0 py-0 px-4 text-14 rounded-3xl font-700 text-blue-300 leading-4",
                  range === item && "bg-secondary"
                )}
                key={`RangeButton-${index}`}
                onClick={() => setRange(item)}
              >
                {item}
              </Button>
            ))}
          </div>
          <div className="sm:hidden block">
            <Button
              variant="secondary"
              className="text-blue-300 rounded-3xl flex items-center text-14 font-700 px-4 h-10 py-0 gap-x-2 sm:hidden leading-4"
              onClick={() => setHandleModal(CHART_FILTER_DROPDOWN)}
            >
              {range}
              <UilAngleDown className="text-blue-300 h-4 w-4" />
            </Button>
          </div>
        </div> */}
        <div className="md:px-7 px-0">
          <span className="px-5 text-gray-300 dark:text-white/30 text-16 font-500 leading-5">
            Market Price
          </span>
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-[56px] w-full max-w-[200px]"></div>
            </div>
          ) : (
            <div className="flex gap-x-3 mt-[18px] px-5">
              <span className="sm:text-[56px] text-40 dark:text-white text-blue-300 font-500 tracking-[-0.8px] sm:tracking-[-1.12px] leading-10 sm:leading-[56px]">
                €
                {readableNumber(
                  Number(assetData?.marketPrice?.toFixed(2) || 0)
                )}
              </span>
              <span
                className={cn(
                  "text-14 font-700 leading-4",
                  assetData?.dynamic > 0
                    ? "text-success-200"
                    : assetData?.dynamic < 0
                    ? "text-danger-100"
                    : "text-blue-300"
                )}
              >
                {assetData?.dynamic > 0 ? "+" : ""}{" "}
                {Number(assetData?.dynamic?.toFixed(2) || 0)} %
              </span>
            </div>
          )}
          <div className="h-[406px] w-full mt-5 mb-4 text-12">
            <CryptoChart
              chartData={data}
              interval={chartInterval}
              isTokenChart
            />
          </div>
          {/* <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 md:gap-2 gap-4">
            <div className="flex flex-col gap-y-2">
              <div className="flex gap-x-2 items-center">
                <UilArrowGrowth className="w-4 h-4 text-blue-300" />
                <span className="text-14 text-gray-300 font-500 leading-4">
                  Market Cap
                </span>
              </div>
              <span className="text-14 font-700 text-blue-300 leading-4">
                €{readableNumber(Number(assetData?.marketCap?.toFixed(2) || 0))}
              </span>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex gap-x-2 items-center">
                <UilGraphBar className="w-4 h-4 text-blue-300" />
                <span className="text-14 text-gray-300 font-500 leading-4">
                  Volume, 24H
                </span>
              </div>
              <span className="text-14 font-700 text-blue-300 leading-4">
                €{readableNumber(Number(assetData?.volume24H?.toFixed(2) || 0))}
              </span>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex gap-x-2 items-center">
                <UilRefresh className="w-4 h-4 text-blue-300" />
                <span className="text-14 text-gray-300 font-500 leading-4">
                  Circulating Supply
                </span>
              </div>
              <span className="text-14 font-700 text-blue-300 leading-4">
                €
                {readableNumber(
                  Number(assetData?.circulatingSupply?.toFixed(2) || 0)
                )}
              </span>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex gap-x-2 items-center">
                <UilArrowCircleUp className="w-4 h-4 text-blue-300" />
                <span className="text-14 text-gray-300 font-500 leading-4">
                  All Time High
                </span>
              </div>
              <span className="text-14 font-700 text-blue-300 leading-4">
                €
                {readableNumber(
                  Number(assetData?.allTimeHigh?.toFixed(2) || 0)
                )}
              </span>
            </div>
          </div> */}
        </div>
      </div>
      {modalOpen === CHART_FILTER_DROPDOWN && (
        <ChartDropDownModal range={range} setRange={setRange} />
      )}
    </>
  );
};

export default ChartSection;
