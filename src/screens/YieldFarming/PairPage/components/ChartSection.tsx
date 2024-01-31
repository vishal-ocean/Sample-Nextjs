"use client";
import ChartDropDownModal from "@/components/ChartDropDownModal";
import ChartOptionsDropDownModal from "@/components/ChartOptionsDropDownModal";
import { Button } from "@/components/UI/Button";
import { CHART_FILTER_DROPDOWN, CHART_OPTIONS_DROPDOWN } from "@/constants";
import { UilAngleDown } from "@/icons";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { cn } from "@/utils";
import dynamic from "next/dynamic";
import { useState } from "react";

const PairAssetChart = dynamic(
  () => import("@/components/Chart/PairAssetChart"),
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

function getScreenWidth() {
  if (typeof window !== "undefined") {
    return window.innerWidth;
  }
  return 0; // Default value for SSR
}
const ChartSection = () => {
  const screenWidth = getScreenWidth();
  const [range, setRange] = useState("All");
  const [options, setOptions] = useState("APY");
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;

  return (
    <>
      <div className="p-5 bg-white rounded-[24px] dark:bg-transparent dark:border dark:border-white/15">
        <div className="sm:flex justify-between gap-x-1 hidden">
          <div>
            {["APY", "TVL", "Price"].map((item, index) => (
              <Button
                variant="outline"
                className={cn(
                  "h-10 p-0 mx-1 py-0 px-4 text-14 text-blue-300 rounded-3xl font-700 leading-4 bg-secondary dark:text-white dark:bg-white/15",
                  options === item &&
                    "bg-black text-white dark:text-blue-300 dark:bg-white"
                )}
                key={`RangeButton-${index}`}
                onClick={() => {
                  setOptions(item);
                }}
              >
                {item}
              </Button>
            ))}
          </div>
          <div>
            {["All", "1Y", "6M", "1M"].map((item, index) => (
              <Button
                variant="outline"
                className={cn(
                  "h-10 p-0 py-0 px-4 text-14 text-blue-300 rounded-3xl font-700 leading-4 dark:text-white",
                  range === item && "bg-secondary dark:bg-white/15"
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

        <div className="md:px-7 sm:px-3 px-0">
          <div className="flex justify-between items-center">
            <Button
              variant="secondary"
              className="text-blue-300 rounded-3xl flex items-center text-14 font-700 px-4 h-10 py-0 gap-x-2 sm:hidden leading-4 dark:text-white"
              onClick={() => {
                setHandleModal(CHART_OPTIONS_DROPDOWN);
              }}
            >
              {options}
              <UilAngleDown className="text-blue-300 dark:text-white h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              className="text-blue-300 dark:text-white rounded-3xl flex items-center text-14 font-700 px-4 h-10 py-0 gap-x-2 sm:hidden leading-4"
              onClick={() => setHandleModal(CHART_FILTER_DROPDOWN)}
            >
              {range}
              <UilAngleDown className="text-blue-300 dark:text-white h-4 w-4" />
            </Button>
          </div>

          <div className="h-[420px] w-full mt-4 text-12">
            <PairAssetChart />
          </div>
        </div>
      </div>
      {modalOpen === CHART_FILTER_DROPDOWN && (
        <ChartDropDownModal range={range} setRange={setRange} />
      )}
      {modalOpen === CHART_OPTIONS_DROPDOWN && (
        <ChartOptionsDropDownModal options={options} setOptions={setOptions} />
      )}
    </>
  );
};

export default ChartSection;
