"use client";

import useChartTabContent from "./hooks/useChartTabContent";

import NestedCharts from "@/components/Chart/NestedCharts";
import { Button } from "@/components/UI/Button";
import {
  CONTACT_SUPPORT_MODAL,
  CRYPTO_DEPOSIT_MODAL,
  DEPOSIT_MODAL,
  RECEIVE_CURRENCY_MODAL,
  SEND_CURRENCY_MODAL,
  TRANSFER_CRYPTO_MODAL,
} from "@/constants";
import { readableNumber } from "@/helper/readableNumber";
import { useHandleModalAction } from "@/store/handleModal";
import { useCryptoStore } from "@/store/useCryptoStore";
import { useUserDataStore } from "@/store/userDataStore";
import { cn } from "@/utils";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useMemo } from "react";
import InvestmentsDataSection from "./InvestmentsDataSection";

interface ChartTabContentProps {
  tab: string;
}

const ChartTabContent = ({ tab }: ChartTabContentProps) => {
  const { tabColorClasses, tabLabels } = useChartTabContent();
  const { setHandleModal } = useHandleModalAction;
  const { userWalletDetails } = useUserDataStore();

  const { user } = useUser();

  const { totalAssetsData } = useCryptoStore();
  const NestedChartComponent = useMemo(() => {
    if (
      user &&
      totalAssetsData &&
      totalAssetsData.balances &&
      totalAssetsData.balances.length > 0
    ) {
      return <NestedCharts totalAssetsData={totalAssetsData} tab={tab} />;
    }
    return null;
  }, [user, totalAssetsData, tab]);

  return (
    <>
      <div
        className={cn(
          "mt-10",
          !["all", "crypto", "fiat"].includes(tab) &&
            "opacity-50 pointer-events-none"
        )}
      >
        <div>
          <div className="grid md:block justify-items-center ">
            <p className="text-blue-300 text-12 font-500 mb-2 md:mb-3 dark:text-white/30">
              Total Portfolio Value
            </p>
            <div className="flex items-center">
              <span className="lg:text-[56px] text-40 font-500 font-body leading-[56px] text-blue-300 dark:text-white">
                €
                {totalAssetsData && tab === "all"
                  ? readableNumber(
                      Number(
                        totalAssetsData?.balances?.[0]?.balanceFiat?.toFixed(
                          2
                        ) || 0
                      ) +
                        (Number(
                          userWalletDetails?.accounts?.EUR?.availableBalance
                            ?.amount || 0
                        ) / 100 || 0)
                    )
                  : tab === "fiat"
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
                        totalAssetsData?.balances?.[0]?.balanceFiat?.toFixed(
                          2
                        ) || 0
                      )
                    )
                  : 0}
              </span>
            </div>
          </div>
          <div className="mx-auto w-[320px] h-[320px] md:hidden block relative">
            <InvestmentsDataSection
              tab={tab}
              {...tabLabels[tab]}
              availableBalance={
                Number(totalAssetsData?.balances?.[0]?.balanceFiat || 0) +
                Number(
                  userWalletDetails?.accounts?.EUR?.availableBalance?.amount ||
                    0
                ) /
                  100
              }
              className="absolute top-[38%] left-0"
            />

            {NestedChartComponent}
          </div>
          <div
            className={cn(
              "flex justify-center md:justify-start items-center gap-x-1 md:pt-0 pt-5 md:h-full mt-10"
              // tab === "crypto"
              //   ? "lg:mt-[174px] md:mt-[104px] mt-4"
              //   : "lg:mt-[108px] md:mt-[38px] mt-4"
            )}
          >
            <Button
              type="submit"
              className={cn(
                tabColorClasses[tab].bg,
                "font-700 py-3.5 hover:bg-blue-300",
                !["all", "crypto", "fiat"].includes(tab) &&
                  "opacity-50 pointer-events-none"
              )}
              onClick={() => {
                if (tab === "crypto") setHandleModal(CRYPTO_DEPOSIT_MODAL);
                if (tab === "all") setHandleModal(DEPOSIT_MODAL);
                if (tab === "fiat") setHandleModal(RECEIVE_CURRENCY_MODAL);
              }}
              disabled={!["all", "crypto", "fiat"]}
            >
              {tabLabels[tab].buttonText}
            </Button>

            <Button
              variant="secondary"
              className={cn(
                "text-blue-300 font-700 py-3.5 hover:bg-secondary/10 dark:bg-white dark:bg-opacity-15 dark:text-white",
                !["all", "crypto", "fiat"].includes(tab) &&
                  "opacity-50 pointer-events-none"
              )}
              onClick={() => {
                if (tab === "wealth") setHandleModal(CONTACT_SUPPORT_MODAL);

                if (tab === "crypto" || tab === "all")
                  setHandleModal(TRANSFER_CRYPTO_MODAL);

                if (tab === "fiat") setHandleModal(SEND_CURRENCY_MODAL);
              }}
            >
              Withdraw
            </Button>
          </div>
        </div>
      </div>
      <div className="h-[400px] lg:w-[400px] md:block hidden relative">
        <InvestmentsDataSection
          tab={tab}
          {...tabLabels[tab]}
          availableBalance={
            Number(totalAssetsData?.balances?.[0]?.balanceFiat || 0) +
            Number(
              userWalletDetails?.accounts?.EUR?.availableBalance?.amount || 0
            ) /
              100
          }
          className="absolute top-[32%] left-0"
        />
        {NestedChartComponent}
      </div>
    </>
  );
};

export default ChartTabContent;
