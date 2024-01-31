"use client";
import ChartDropDownModal from "@/components/ChartDropDownModal";
import { Button } from "@/components/UI/Button";
import { CHART_FILTER_DROPDOWN } from "@/constants";
import { WEALTH_CHART_DATA } from "@/constants/WealthChartData";
import { UilAngleDown, UilChartPie } from "@/icons";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { cn } from "@/utils";
import { useUser } from "@auth0/nextjs-auth0/client";
import dynamic from "next/dynamic";
import { useState } from "react";

const WealthChart = dynamic(() => import("@/components/Chart/WealthChart"));
function getScreenWidth() {
  if (typeof window !== "undefined") {
    return window.innerWidth;
  }
  return 0; // Default value for SSR
}
const ChartSection = () => {
  const [range, setRange] = useState("All");
  const screenWidth = getScreenWidth();
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const { user } = useUser();
  const [chartInterval, setChartInterval] = useState(
    screenWidth > 768 ? 12 : 5
  );
  const intervalMap: Record<string, number> = {
    "1M": 30,
    "6M": screenWidth > 768 ? 6 : 5,
    default: screenWidth > 768 ? 12 : 5,
  };

  return (
    <>
      <div className="p-3 sm:p-5 bg-white dark:bg-transparent dark:border dark:border-white/15 rounded-[24px] h-full">
        <div className="flex justify-between items-center lg:block pl-2 sm:pl-0">
          <div className="sm:flex justify-end gap-x-1 hidden order-2">
            {["All", "1Y", "6M", "1M"].map((item, index) => (
              <Button
                variant="outline"
                className={cn(
                  "h-10 p-0 py-0 px-4 text-14 text-blue-300 dark:text-white rounded-3xl font-700 leading-4",
                  range === item && "bg-secondary dark:bg-white/15"
                )}
                key={`RangeButton-${index}`}
                onClick={() => {
                  const interval = intervalMap[item] || intervalMap.default;
                  setRange(item);
                  setChartInterval(interval);
                }}
              >
                {item}
              </Button>
            ))}
          </div>
          <div className="flex gap-x-2 items-center sm:order-1 lg:px-7 sm:px-3 px-0">
            <UilChartPie className="h-4 w-4 text-blue-300 dark:text-white" />
            <span className="text-gray-300 text-12 sm:text-16 font-500 leading-5 dark:text-white/30">
              Total Portfolio Balance
            </span>
          </div>

          <Button
            variant="secondary"
            className="text-blue-300 dark:bg-white/15 dark:text-white rounded-3xl flex items-center text-14 font-700 px-4 h-10 py-0 gap-x-2 sm:hidden leading-4"
            onClick={() => setHandleModal(CHART_FILTER_DROPDOWN)}
          >
            {range}
            <UilAngleDown className="text-blue-300 h-4 w-4 dark:text-white" />
          </Button>
        </div>
        <div className="lg:px-7 sm:px-3 px-0">
          <div className="flex gap-2 sm:gap-3 mt-4 sm:flex-row flex-col pl-2 sm:pl-0">
            <span className="sm:text-[56px] text-blue-300 dark:text-white text-40 font-500 sm:tracking-[-1.12px] tracking-[-0.8px] sm:leading-[56px] leading-10">
              {user?.email === "jeel@yopmail.com" ? "€1232.45" : "€0"}
            </span>
            {/* <span className="text-success-200 text-14 font-700 leading-4">
              + 0%
            </span> */}
          </div>
          <div className="h-[406px] mt-5 mb-4 text-12">
            <WealthChart
              chartData={
                user?.email === "jeel@yopmail.com" ? WEALTH_CHART_DATA : []
              }
              interval={chartInterval}
            />
          </div>
        </div>
      </div>
      {modalOpen === CHART_FILTER_DROPDOWN && (
        <ChartDropDownModal range={range} setRange={setRange} />
      )}
    </>
  );
};

export default ChartSection;
