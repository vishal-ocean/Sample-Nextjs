import ChartDropDownModal from "@/components/ChartDropDownModal";
import { Button } from "@/components/UI/Button";
import { CHART_FILTER_DROPDOWN } from "@/constants";
import { getTransactionGraphData } from "@/helper/getTransactionGraphData";
import { readableNumber } from "@/helper/readableNumber";
import { UilAngleDown, UilChartPie } from "@/icons";
import { useGetTransactionsByAccountMutation } from "@/services/useStrigaWallet";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { useNeoBankingStore } from "@/store/useNeoBankingStore";
import { useUserDataStore } from "@/store/userDataStore";
import { cn } from "@/utils";
import { useUser } from "@auth0/nextjs-auth0/client";
import moment from "moment";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const NeoBankingChart = dynamic(
  () => import("@/components/Chart/NeoBankingChart")
);
function getScreenWidth() {
  if (typeof window !== "undefined") {
    return window.innerWidth;
  }
  return 0; // Default value for SSR
}
const ChartSection = () => {
  const [range, setRange] = useState("All");
  const screenWidth = getScreenWidth();
  const { transactions } = useNeoBankingStore();
  const [chartInterval, setChartInterval] = useState(
    screenWidth > 768 ? 12 : 5
  );
  const { modalOpen } = useHandleModalStore();
  const getTransactionsByAccount: any = useGetTransactionsByAccountMutation();
  const { strigaUserData, userWalletDetails } = useUserDataStore();
  const [chartData, setChartData] = useState<
    { timestamp: any; amount: number }[] | null
  >(null);

  const { setHandleModal } = useHandleModalAction;
  const { user } = useUser();
  const endDate = moment().endOf("day");

  useEffect(() => {
    if (userWalletDetails?.accounts) {
      getTransactionsByAccount.mutate({
        userId: strigaUserData.strigaId,
        accountId: userWalletDetails?.accounts?.EUR?.accountId,
        startDate: moment().subtract(2, "years").format("x"),
        endDate: moment().format("x"),
        page: 1,
        limit: 100,
      });
    }
  }, [userWalletDetails]);

  useEffect(() => {
    const getStartDate = (range: string) => {
      const ranges: Record<string, number> = {
        ALL: 12,
        "1Y": 12,
        "6M": 6,
        "1M": 1,
      };
      const months = ranges[range] || 12;
      return moment().subtract(months, "months").startOf("day");
    };

    const startDate = getStartDate(range);
    const result = getTransactionGraphData(transactions, startDate, endDate);
    setChartData(result);
  }, [range, transactions]);

  const intervalMap: Record<string, number> = {
    "1M": 30,
    "6M": screenWidth > 768 ? 6 : 5,
    default: screenWidth > 768 ? 12 : 5,
  };

  return (
    <>
      <div className="p-5 bg-white dark:bg-transparent dark:border dark:border-white/10 rounded-[24px]">
        <div className="sm:flex justify-end gap-x-1 hidden">
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

        <div className="md:px-7 sm:px-3 px-0">
          <div className="flex justify-between items-center">
            <div className="flex gap-x-2 items-center">
              <UilChartPie className="h-4 w-4 text-blue-300 dark:text-white" />
              <span className="text-gray-300 dark:text-white/30 text-16 font-500 leading-5">
                Total Fiat Balance
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
              €
              {readableNumber(
                Number(
                  userWalletDetails?.accounts?.EUR?.availableBalance?.amount ||
                    0
                ) / 100
              ) || 0}
            </span>
            {/* <span className="text-success-200 text-14 font-700 leading-4">
              + 2.45%
           </span> */}
          </div>
          <div className="h-[368px] w-full mt-5 mb-5 text-12">
            <NeoBankingChart chartData={chartData} interval={chartInterval} />
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
