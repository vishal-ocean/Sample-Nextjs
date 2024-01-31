"use client";
import { Button } from "@/components/UI/Button";
import { Progress } from "@/components/UI/ProgressBar";
import { CHART_FILTER_DROPDOWN, YIELD_CHART_FILTER_MODAL } from "@/constants";
import { UilAngleDown } from "@/icons";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { cn } from "@/utils";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { useYieldStaticData } from "./components/useYieldStaticData";
const YieldChartFilter: any = dynamic(() =>
  import("@/screens/YieldFarming/Home/modals/YieldChartFilterModal").then(
    (mod) => mod.YieldChartFilter
  )
);

const ChartDropDownModal = dynamic(
  () => import("@/components/ChartDropDownModal")
);
const StackedAreaChart = dynamic(
  () =>
    import("@/components/Chart/StackedAreaChart").then(
      (mod) => mod.StackedAreaChart
    ),
  {
    loading: () => (
      <div className="md:px-7 sm:px-3 px-0">
        <div className=" mt-[103px] sm:mb-5 mb-0 animate-pulse">
          <div className="h-[300px] w-full !rounded-[24px]" />
        </div>
      </div>
    ),
  }
);
const YieldSingleChart = dynamic(() =>
  import("@/components/Chart/YieldSingleChart").then(
    (mod) => mod.YieldSingleChart
  )
);

export const ChartSection = () => {
  const [chartFilter, setChartFilter] = useState("Token");
  const [tokenFilter, setTokenFilter] = useState("btc");
  const [tokenColor, setTokenColor] = useState("#F7931A");
  const [range, setRange] = useState("All");
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const { TokenChainData } = useYieldStaticData();

  return (
    <>
      <div className="bg-white p-5 rounded-[24px] hidden sm:block dark:bg-transparent dark:border dark:border-white/15">
        <div className="flex justify-between">
          <div className="flex gap-1">
            <Button
              className={cn(
                "px-4 py-3 text-14 font-700 leading-4",
                chartFilter === "Token"
                  ? "bg-blue-300 text-white dark:bg-white dark:text-blue-300"
                  : "bg-secondary text-blue-300 dark:text-white dark:bg-white/15"
              )}
              onClick={() => setChartFilter("Token")}
            >
              Token
            </Button>
            <Button
              className={cn(
                "px-4 py-3 text-14 font-700 leading-4",
                chartFilter === "Chain"
                  ? "bg-blue-300 text-white dark:bg-white dark:text-blue-300"
                  : "bg-secondary text-blue-300 dark:text-white dark:bg-white/15"
              )}
              onClick={() => setChartFilter("Chain")}
            >
              Chain
            </Button>
            <Button
              className={cn(
                "px-4 py-3 text-14 font-700 leading-4",
                chartFilter === "Platform"
                  ? "bg-blue-300 text-white dark:bg-white dark:text-blue-300"
                  : "bg-secondary text-blue-300 dark:text-white dark:bg-white/15"
              )}
              onClick={() => setChartFilter("Platform")}
            >
              Platform
            </Button>
          </div>
          <div className="flex gap-1">
            {["All", "1Y", "6M", "1M"].map((item, index) => (
              <Button
                variant="outline"
                className={cn(
                  "h-10 p-0 py-0 px-4 text-14 text-blue-300 rounded-3xl font-700 leading-4 dark:text-white",
                  range === item
                    ? "bg-secondary dark:bg-white/15"
                    : "bg-transparent"
                )}
                key={`RangeButton-${index}`}
                onClick={() => {
                  setRange(item);
                }}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
        <div className="mt-9">
          <StackedAreaChart />
        </div>
      </div>
      <div className="hidden sm:grid grid-cols-3 min-[1180px]:grid-cols-5 gap-2 mt-2">
        <div className="p-3 bg-white rounded-[16px]  dark:bg-white/10">
          <div className="flex justify-between">
            <span className="flex gap-x-2 items-center">
              <Image
                src={"/images/svg/icon-BTC.svg"}
                height={24}
                width={24}
                alt=""
              />
              <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                BTC
              </p>
            </span>
            <p className="text-16 font-500 leading-5 text-blue-300 dark:text-white">
              67.54%
            </p>
          </div>
          <Progress
            max={100}
            value={67.54}
            className="!h-3 mt-9 dark:bg-white/5"
            fieldProgressClass="bg-orange-100"
          />
        </div>
        <div className="p-3 bg-white rounded-[16px] dark:bg-white/10">
          <div className="flex justify-between">
            <span className="flex gap-x-2 items-center">
              <Image
                src={"/images/svg/icon-ETH.svg"}
                height={24}
                width={24}
                alt=""
              />
              <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                ETH
              </p>
            </span>
            <p className="text-16 font-500 leading-5 text-blue-300 dark:text-white">
              67.54%
            </p>
          </div>
          <Progress
            max={100}
            value={67.54}
            className="!h-3 mt-9 dark:bg-white/5"
            fieldProgressClass="bg-blue-950"
          />
        </div>
        <div className="p-3 bg-white rounded-[16px] dark:bg-white/10">
          <div className="flex justify-between">
            <span className="flex gap-x-2 items-center">
              <Image
                src={"/images/svg/icon-XRP.svg"}
                height={24}
                width={24}
                alt=""
              />
              <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                XRP
              </p>
            </span>
            <p className="text-16 font-500 leading-5 text-blue-300 dark:text-white">
              67.54%
            </p>
          </div>
          <Progress
            max={100}
            value={67.54}
            className="!h-3 mt-9 dark:bg-white/5"
            fieldProgressClass="bg-purple-600"
          />
        </div>
        <div className="p-3 bg-white rounded-[16px] dark:bg-white/10">
          <div className="flex justify-between">
            <span className="flex gap-x-2 items-center">
              <Image
                src={"/images/svg/icon-USDT.svg"}
                height={24}
                width={24}
                alt=""
              />
              <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                USDT
              </p>
            </span>
            <p className="text-16 font-500 leading-5 text-blue-300 dark:text-white">
              67.54%
            </p>
          </div>
          <Progress
            max={100}
            value={67.54}
            className="!h-3 mt-9 dark:bg-white/5"
            fieldProgressClass="bg-success-700"
          />
        </div>
        <div className="p-3 bg-white rounded-[16px] dark:bg-white/10">
          <div className="flex justify-between">
            <span className="flex gap-x-2 items-center">
              <div className="h-6 w-6 rounded-full bg-gray-300" />
              <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                Other
              </p>
            </span>
            <p className="text-16 font-500 leading-5 text-blue-300 dark:text-white">
              67.54%
            </p>
          </div>
          <Progress
            max={100}
            value={67.54}
            className="!h-3 mt-9 dark:bg-white/5"
            fieldProgressClass="bg-gray-300"
          />
        </div>
      </div>
      <div className="bg-white p-3 pb-5  rounded-[24px] sm:hidden dark:bg-transparent dark:border dark:border-white/15">
        <div className="flex justify-between">
          <Button
            variant="secondary"
            className="text-blue-300 rounded-3xl flex items-center text-14 font-700 px-4 h-10 py-0 gap-x-2  leading-4 sm:hidden dark:bg-white/15 dark:text-white"
            onClick={() => setHandleModal(YIELD_CHART_FILTER_MODAL)}
          >
            {chartFilter}
            <UilAngleDown className="text-blue-300 h-4 w-4 dark:text-white" />
          </Button>
          <Button
            variant="secondary"
            className="text-blue-300 rounded-3xl flex items-center text-14 font-700 px-4 h-10 py-0 gap-x-2  sm:hidden leading-4 dark:text-white dark:bg-white/15"
            onClick={() => setHandleModal(CHART_FILTER_DROPDOWN)}
          >
            {range}
            <UilAngleDown className="text-blue-300 h-4 w-4 dark:text-white" />
          </Button>
        </div>
        <div className="flex gap-1 overflow-auto remove-scrollbar mt-5 mb-4">
          {TokenChainData.map((item, index) => (
            <div
              key={`token-${index}`}
              className={cn(
                "px-4 py-2 flex gap-2 rounded-full items-center cursor-pointer",
                item.value === tokenFilter && item.bgColor
              )}
              onClick={() => {
                setTokenFilter(item.value), setTokenColor(item.hexColor);
              }}
            >
              {item.value !== tokenFilter && (
                <div className={cn("h-2.5 w-2.5 rounded-full", item.bgColor)} />
              )}

              <p className="font-700 whitespace-nowrap">
                <span
                  className={cn(
                    "text-blue-300 text-14 inline-block leading-4 dark:text-white",
                    item.value === tokenFilter && "text-white"
                  )}
                >
                  {item.name}
                </span>
                &nbsp;
                <span
                  className={cn(
                    "text-gray-300 text-12 inline-block leading-4 dark:text-white/30",
                    item.value === tokenFilter && "text-white/60"
                  )}
                >
                  {item.increase}%
                </span>
              </p>
            </div>
          ))}
        </div>
        <YieldSingleChart tokenColor={tokenColor} />
      </div>
      {modalOpen === CHART_FILTER_DROPDOWN && (
        <ChartDropDownModal range={range} setRange={setRange} />
      )}
      {modalOpen === YIELD_CHART_FILTER_MODAL && (
        <YieldChartFilter
          chartFilter={chartFilter}
          setChartFilter={setChartFilter}
        />
      )}
    </>
  );
};
