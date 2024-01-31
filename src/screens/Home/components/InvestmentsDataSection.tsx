import { readableNumber } from "@/helper/readableNumber";
import { useUserDataStore } from "@/store/userDataStore";
import { cn } from "@/utils";

const titles: Record<string, string> = {
  all: "Your Portfolio",
  crypto: "Crypto 100%",
  nft: " NFT 0%",
  fiat: "Fiat 0%",
  wealth: "Wealth 0%",
};

const InvestmentsDataSection = ({
  tab,
  depositValue,
  totalValue,
  availableBalance,
  className,
}: {
  tab: string;
  depositValue?: number;
  totalValue?: number | string;
  availableBalance: number;
  className?: string;
}) => {
  const { userWalletDetails } = useUserDataStore();
  return (
    <div className={cn("w-full", className)}>
      <p className="text-24 font-500 leading-7 text-blue-300 dark:text-white text-center mb-4">
        {titles[tab]}
      </p>
      {tab === "all" && (
        <>
          <div className="flex justify-center gap-x-2">
            <span className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
              In Investments
            </span>
            <span
              className={cn(
                "text-12 font-500 leading-4 text-gray-300",
                depositValue &&
                  depositValue > 0 &&
                  "text-blue-300 dark:text-white"
              )}
            >{`€${depositValue}`}</span>
          </div>
          <div className="flex justify-center gap-x-2">
            <span className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
              Available Balance
            </span>
            <span
              className={cn(
                "text-12 font-500 leading-4 text-gray-300 dark:text-white/30",
                availableBalance > 0 && "text-blue-300 dark:text-white"
              )}
            >{`€${readableNumber(
              Number(availableBalance.toFixed(2) || 0)
            )}`}</span>
          </div>
        </>
      )}
      {tab === "nft" && (
        <>
          <div className="flex justify-center gap-x-2">
            <span className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
              Deposited
            </span>
            <span
              className={cn(
                "text-12 font-500 leading-4 text-gray-300 dark:text-white/30",
                depositValue &&
                  depositValue > 0 &&
                  "text-blue-300 dark:text-white"
              )}
            >{`${depositValue} NFT`}</span>
          </div>
          <div className="flex justify-center gap-x-2">
            <span className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
              Total Volume
            </span>
            <span
              className={cn(
                "text-12 font-500 leading-4 text-gray-300 dark:text-white/30",
                totalValue &&
                  Number(totalValue) > 0 &&
                  "text-blue-300 dark:text-white"
              )}
            >{`${totalValue} ETH`}</span>
          </div>
        </>
      )}
      {tab === "wealth" && (
        <>
          <div className="flex justify-center gap-x-2">
            <span className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
              Total Invested
            </span>
            <span
              className={cn(
                "text-12 font-500 leading-4 text-gray-300 dark:text-white/30",
                depositValue &&
                  depositValue > 0 &&
                  "text-blue-300 dark:text-white"
              )}
            >
              €0
            </span>
          </div>
          <div className="flex justify-center gap-x-2">
            <span className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
              Total Earnings
            </span>
            <span
              className={cn(
                "text-12 font-500 leading-4 text-gray-300 dark:text-white/30"
                // availableBalance > 0 && "text-blue-300 dark:text-white"
              )}
            >
              €0
            </span>
          </div>
        </>
      )}
      {tab === "fiat" && (
        <>
          <div className="flex justify-center gap-x-2">
            <span className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
              Direct Deposit
            </span>
            <span
              className={cn(
                "text-12 font-500 leading-4 text-gray-300 dark:text-white/30",
                Number(
                  userWalletDetails?.accounts?.EUR?.availableBalance?.amount ||
                    0
                ) /
                  100 >
                  0 && "text-blue-300 dark:text-white"
              )}
            >{`€${
              readableNumber(
                Number(
                  userWalletDetails?.accounts?.EUR?.availableBalance?.amount ||
                    0
                ) / 100
              ) || 0
            }`}</span>
          </div>
          <div className="flex justify-center gap-x-2">
            <span className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
              Wealth Earning
            </span>

            <span
              className={cn(
                "text-12 font-500 leading-4 text-gray-300 dark:text-white/30",
                depositValue &&
                  depositValue > 0 &&
                  "text-blue-300 dark:text-white"
              )}
            >{`€${depositValue}`}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default InvestmentsDataSection;
