import { readableNumber } from "@/helper/readableNumber";
import { useCryptoStore } from "@/store/useCryptoStore";
import { useUserDataStore } from "@/store/userDataStore";
import DashboardBalanceChart from "./Chart/DashboardBalanceChart";
import { useAssetList } from "./hooks/useAssetList";

interface ChartTabContentProps {
  tab: string;
  colorCode: string;
}

const ChartTabContent = ({ tab, colorCode }: ChartTabContentProps) => {
  const { tabAssetsListConstants } = useAssetList();
  const { userWalletDetails } = useUserDataStore();
  const { totalAssetsData } = useCryptoStore();

  return (
    <div className="flex justify-between items-end">
      <div className="flex flex-col gap-3">
        <p className="text-14 leading-4 font-700 text-blue-300 dark:text-white">
          {`${tabAssetsListConstants[tab].titleText} Balance`}
        </p>
        <p className="text-40 leading-10 font-500 text-gray-300 dark:text-white/30">
          €
          {totalAssetsData && tab === "fiat"
            ? `${
                readableNumber(
                  Number(
                    userWalletDetails?.accounts?.EUR?.availableBalance
                      ?.amount || 0
                  ) / 100
                ) || 0
              }`
            : tab === "crypto"
            ? readableNumber(
                Number(
                  totalAssetsData?.balances?.[0]?.balanceFiat?.toFixed(2) || 0
                )
              )
            : 0}
        </p>
      </div>
      <div className="min-w-[300px] h-[120px]">
        <DashboardBalanceChart colorCode={colorCode} />
      </div>
    </div>
  );
};
export default ChartTabContent;
