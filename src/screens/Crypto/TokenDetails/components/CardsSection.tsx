"use client";
import { Button } from "@/components/UI/Button";
import { IconSwap } from "@/components/icons/IconSwap";
import IconTimeCoinDeposit from "@/components/icons/IconTimeCoinDeposit";
import IconTimeCoinWithdraw from "@/components/icons/IconTimeCoinWithdraw";
import { CRYPTO_DEPOSIT_MODAL, TRANSFER_CRYPTO_MODAL } from "@/constants";
import { readableNumber } from "@/helper/readableNumber";
import { UilPlus, UilWallet } from "@/icons";
import { useGetAsset } from "@/services/useCrypto";
import { useTransactionsData } from "@/services/useTransactions";
import { useHandleModalAction } from "@/store/handleModal";
import { useCryptoStoreActions } from "@/store/useCryptoStore";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const getIcon: Record<string, any> = {
  Deposit: <IconTimeCoinDeposit strokeWidth={1.2} className=" h-4 w-4" />,
  Withdrawal: <IconTimeCoinWithdraw strokeWidth={1.2} className=" h-4 w-4" />,
  Swap: <IconSwap className=" h-4 w-4 text-gray-300" />,
};
const CardSection = ({ assetData, isLoading: isAssetDataLoading }: any) => {
  const { tokenId } = useParams();
  const { setHandleModal } = useHandleModalAction;

  const {
    data: TransactionData,
    isLoading,
    refetch,
  } = useTransactionsData({
    params: {
      TransactionType: "All",
      assets: Number(tokenId),
    },
  });

  const getAssetMutation = useGetAsset();
  const { setAssetDetailsData } = useCryptoStoreActions;

  useEffect(() => {
    if (tokenId) {
      getAssetMutation.mutate(Number(tokenId));
    }
  }, [tokenId]);

  // useEffect(() => {
  //   refetch();
  // }, [assetData]);
  return (
    <div className="lg:col-span-4 xl:col-span-3 px-3 sm:px-10 lg:px-0">
      <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2 lg:mt-0 mt-6">
        <div className="w-full flex flex-col  bg-white rounded-[20px] p-2 pt-5 h-max dark:bg-white/10">
          {isAssetDataLoading ? (
            <div className="animate-pulse flex justify-between">
              <div className="h-10 w-[140px]"></div>
              <div className="h-10 w-[60px]"></div>
            </div>
          ) : (
            <>
              <div className="">
                <span className="flex gap-2 px-3">
                  <UilWallet
                    className="h-4 w-4 text-blue-300 dark:text-white"
                    strokeWidth={1.2}
                  />
                  <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                    Balance
                  </p>
                </span>
              </div>
              <div className="flex flex-col px-3 mb-10 mt-4 gap-1">
                <span className="text-40 text-blue-300 dark:text-white font-500 leading-10">
                  €
                  {readableNumber(
                    Number(assetData?.balanceFiat.toFixed(4) || 0)
                  )}
                </span>
                <span className="text-16 text-gray-300 dark:text-white/30 font-700 leading-5">
                  {Number(assetData?.balance.toFixed(6) || 0)}{" "}
                  {assetData?.shortName}
                </span>
              </div>

              <div className=" grid grid-cols-2 gap-2">
                <div
                  className="rounded-[24px] bg-gray-100 dark:bg-white/10 py-5 px-3 flex flex-col items-center gap-3 group cursor-pointer"
                  onClick={() => {
                    setHandleModal(TRANSFER_CRYPTO_MODAL);
                    setAssetDetailsData(getAssetMutation?.data);
                  }}
                >
                  <span className="h-10 w-10 bg-primary rounded-full flex justify-center items-center group-hover:bg-blue-300">
                    <IconTimeCoinWithdraw
                      strokeWidth={1.2}
                      className=" h-4 w-4 text-white"
                    />
                  </span>
                  <p className="text-14 font-700 leading-4 text-blue-300 dark:text-white">
                    Withdraw
                  </p>
                </div>
                <div
                  className="rounded-[24px] bg-gray-100 dark:bg-white/10 py-5 px-3 flex flex-col items-center gap-3 group cursor-pointer"
                  onClick={() => {
                    setHandleModal(CRYPTO_DEPOSIT_MODAL);
                    setAssetDetailsData(getAssetMutation?.data);
                  }}
                >
                  <span className="h-10 w-10 bg-primary rounded-full flex justify-center items-center group-hover:bg-blue-300">
                    <IconTimeCoinDeposit
                      strokeWidth={1.2}
                      className=" h-4 w-4 text-white"
                    />
                  </span>
                  <p className="text-14 font-700 leading-4 text-blue-300 dark:text-white">
                    Deposit
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {isLoading && (
        <div className="py-6 px-5 bg-white rounded-[24px] h-fit mt-6 flex flex-col gap-y-6 order-3 animate-pulse">
          <div className="h-10 w-[140px]"></div>
          <div className="h-10 w-[60px]"></div>
        </div>
      )}
      {!isLoading &&
        (TransactionData?.length > 0 ? (
          <div className="py-6 px-5 bg-white rounded-[24px] h-fit mt-6 flex flex-col gap-y-6 order-3">
            {TransactionData?.map((item: any) => (
              <div
                className="flex justify-between"
                key={`TransactionListing-${item.id}`}
              >
                <div className="flex gap-x-3">
                  <span className="h-10 w-10 flex justify-center items-center rounded-3xl bg-secondary dark:bg-white/15 text-blue-300 dark:text-white">
                    {getIcon[item?.type || "Deposit"]}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-16 text-blue-300 dark:text-white font-500 leading-5">
                      {item?.type}
                    </span>
                    <span className="text-16 text-gray-300 dark:text-white/30 font-500 leading-5 truncate max-w-[110px]">
                      {assetData?.name}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-16 text-blue-300 dark:text-white font-500 leading-5">
                    {["Deposit"].includes(item?.type) ? "+" : "-"} €
                    {readableNumber(Number(item?.amountFiat.toFixed(2) || 0))}
                  </span>
                  <span className="text-16 text-gray-300 dark:text-white/30 font-500 leading-5">
                    {["Deposit"].includes(item?.type) ? "+" : "-"}{" "}
                    {Number(item?.amount.toFixed(6) || 0)} {item?.shortName}
                  </span>
                </div>
              </div>
            ))}
            <Link href="/transactions" className="self-center">
              <Button
                variant="secondary"
                className="text-blue-300 h-10 py-0 px-4 text-14 font-700 leading-4"
              >
                All Transactions
              </Button>
            </Link>
          </div>
        ) : (
          <div className="py-12 px-5 bg-white dark:bg-white/10 rounded-[24px] h-fit mt-6 lg:mt-2 flex flex-col gap-y-6 justify-center items-center order-2">
            <div className="flex justify-center items-center">
              <div className="w-10 h-10 bg-secondary dark:bg-white/15 dark:text-white rounded-full -ml-4 border-2 border-white dark:border-white/5" />
              <div className="w-10 h-10 bg-secondary dark:bg-white/15 rounded-full -ml-4 border-2 border-white dark:border-white/5" />
              <div className="w-10 h-10 bg-secondary dark:bg-white/15 rounded-full -ml-4 border-2 border-white flex justify-center items-center dark:border-white/5">
                <UilPlus className="w-4 h-4 mx-auto text-gray-300 dark:text-white/30" />
              </div>
            </div>
            <span className="text-center w-[180px] text-gray-300 dark:text-white/30 text-16 font-500 leading-5">
              You have no transactions of this asset yet
            </span>
          </div>
        ))}
    </div>
  );
};

export default CardSection;
