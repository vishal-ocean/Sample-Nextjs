import ChartDropDownModal from "@/components/ChartDropDownModal";
import { Button } from "@/components/UI/Button";
import { CHART_FILTER_DROPDOWN } from "@/constants";
import { readableNumber } from "@/helper/readableNumber";
import { UilAngleDown, UilChartPie } from "@/icons";
import { useGetChartData, useTotalAssetsData } from "@/services/useCrypto";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { cn } from "@/utils";
import moment from "moment";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CryptoChart = dynamic(() => import("@/components/Chart/CryptoChart"));

const getRange: Record<string, string> = {
  All: moment()?.subtract(1, "years")?.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
  "1Y": moment()?.subtract(1, "years")?.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
  "6M": moment()?.subtract(6, "months")?.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
  "1M": moment()?.subtract(30, "days")?.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
  // "1M": moment()?.startOf("month")?.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
};

function getScreenWidth() {
  if (typeof window !== "undefined") {
    return window.innerWidth;
  }
  return 0; // Default value for SSR
}
const ChartSection = () => {
  const screenWidth = getScreenWidth();
  const [range, setRange] = useState("1M");
  const [chartInterval, setChartInterval] = useState(
    screenWidth > 768 ? 12 : 5
  );
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const { data, isLoading } = useTotalAssetsData();
  const chartDataMutation = useGetChartData();
  useEffect(() => {
    chartDataMutation?.mutate({
      Currency: "eur",
      From: getRange?.[range],
      To: moment()?.add(1, "days")?.toISOString(),
    });
  }, [range]);
  const intervalMap: Record<string, number> = {
    "1M": 30,
    "6M": screenWidth > 768 ? 6 : 5,
    default: screenWidth > 768 ? 12 : 5,
  };
  return (
    <>
      <div className="p-5 bg-white rounded-[24px] dark:bg-transparent dark:border dark:border-white/[0.15] ">
        <div className="sm:flex justify-end gap-x-1 hidden">
          {["All", "1Y", "6M", "1M"].map((item, index) => (
            <Button
              variant="outline"
              className={cn(
                "h-10 p-0 py-0 px-4 text-14 text-blue-300 dark:text-white rounded-3xl font-700 leading-4",
                range === item && "bg-secondary dark:bg-secondary/[0.15]"
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

        <div className="md:px-7 sm:px-3 px-0">
          <div className="flex justify-between items-center">
            <div className="flex gap-x-2 items-center">
              <UilChartPie className="h-4 w-4 text-blue-300 dark:text-white" />
              <span className="text-gray-300 text-16 font-500 leading-5 dark:text-white/30">
                Total Crypto Balance
              </span>
            </div>
            <Button
              variant="secondary"
              className="text-blue-300 dark:bg-white/15 dark:text-white rounded-3xl flex items-center text-14 font-700 px-4 h-10 py-0 gap-x-2 sm:hidden leading-4"
              onClick={() => setHandleModal(CHART_FILTER_DROPDOWN)}
            >
              {range}
              <UilAngleDown className="text-blue-300 dark:text-white h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-y-3 sm:gap-x-3 mt-5 sm:flex-row flex-col">
            <span className="sm:text-[56px] text-40 font-500 sm:tracking-[-1.12px] tracking-[-0.8px] sm:leading-[56px] leading-10">
              €
              {readableNumber(
                Number(data?.balances?.[0]?.balanceFiat?.toFixed(2) || 0)
              )}
            </span>
            {/* <span className="text-success-200 text-14 font-700 leading-4">
              + 2.45%
            </span> */}
          </div>
          <div className="h-[355px] w-full mt-5 mb-5 text-12">
            <CryptoChart
              chartData={chartDataMutation?.data}
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
