"use client";
import ChartDropDownModal from "@/components/ChartDropDownModal";
import { Button } from "@/components/UI/Button";
import { CHART_FILTER_DROPDOWN } from "@/constants";
import { UilAngleDown, UilChartPie } from "@/icons";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { cn } from "@/utils";
import dynamic from "next/dynamic";
import { useState } from "react";

const WealthChart = dynamic(() => import("@/components/Chart/WealthChart"));

const ChartSection = () => {
  const [range, setRange] = useState("All");
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;

  return (
    <>
      <div className="p-5 bg-white rounded-[24px] h-full">
        <div className="sm:flex justify-end gap-x-1 hidden">
          {["All", "1Y", "6M", "1M"].map((item, index) => (
            <Button
              variant="outline"
              className={cn(
                "h-10 p-0 py-0 px-4 text-14 text-blue-300 rounded-3xl font-700 leading-4",
                range === item && "bg-secondary"
              )}
              key={`RangeButton-${index}`}
              onClick={() => setRange(item)}
            >
              {item}
            </Button>
          ))}
        </div>

        <div className="md:px-7 sm:px-3 px-0">
          <div className="flex justify-between items-center">
            <div className="flex gap-x-2 items-center">
              <UilChartPie className="h-4 w-4 text-blue-300" />
              <span className="text-gray-300 text-16 font-500 leading-5">
                Investments
              </span>
            </div>
            <Button
              variant="secondary"
              className="text-blue-300 rounded-3xl flex items-center text-14 font-700 px-4 h-10 py-0 gap-x-2 sm:hidden leading-4"
              onClick={() => setHandleModal(CHART_FILTER_DROPDOWN)}
            >
              {range}
              <UilAngleDown className="text-blue-300 h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-y-3 sm:gap-x-3 mt-5 sm:flex-row flex-col">
            <span className="sm:text-[56px] text-40 font-500 sm:tracking-[-1.12px] tracking-[-0.8px] sm:leading-[56px] leading-10">
              €29,618.99
            </span>
            <span className="text-success-200 text-14 font-700 leading-4">
              + 2.45%
            </span>
          </div>
          <div className="h-[406px] w-full mt-5 mb-4 text-12">
            <WealthChart />
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
