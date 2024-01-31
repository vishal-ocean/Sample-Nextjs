"use client";
import { UilCheck, UilCopy, UilTimes } from "@/icons";
import { cn } from "@/utils";
import Image from "next/image";

import { Button } from "@/components/UI/Button";
import {
  Dialog,
  DialogContentWithoutClose,
  DialogTrigger,
} from "@/components/UI/Dialog";
import CustomToolTip from "@/components/UI/Tooltip";
import { CRYPTO_TRANSACTION_DETAILS_MODAL } from "@/constants";
import { AssetImages } from "@/constants/AssetsImages";
import { readableNumber } from "@/helper/readableNumber";
import { useTransfer } from "@/screens/Transactions/components/hooks/useTransfer";
import { useChainAssetsList } from "@/services/useCrypto";
import { useTransactionStore } from "@/store/useTransactionStore";
import { UseMutationResult } from "@tanstack/react-query";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const CryptoTransactionDetailsModal = ({
  modalOpen,
  transactionType,
  setHandleModal,
  transactionDetailsMutation,
}: {
  modalOpen: string;
  transactionType: string;
  setHandleModal: (payload: string) => void;
  transactionDetailsMutation?: UseMutationResult<any, unknown, string, unknown>;
}) => {
  const { getCryptoModalTitle, getCryptoIcon } = useTransfer();
  const { transactionDetails } = useTransactionStore();

  const [isDataCopy, setIsDataCopy] = useState(false);
  const { data: chainNetworkList } = useChainAssetsList();
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? CRYPTO_TRANSACTION_DETAILS_MODAL : "");
  };
  function getChainShortNameByAssetId(assetId: number) {
    let obj: any = {};
    chainNetworkList?.forEach((chain: any) => {
      const foundAsset = chain?.assets?.find(
        (asset: any) => asset.id === assetId
      );
      if (foundAsset) {
        obj = { ...chain };
      }
    });
    return obj;
  }
  return (
    <Dialog
      open={modalOpen === CRYPTO_TRANSACTION_DETAILS_MODAL}
      onOpenChange={handleOpenChange}
    >
      <DialogTrigger />
      <DialogContentWithoutClose
        className={cn(
          "max-w-[656px] sm:-translate-y-1/2 translate-y-0 rounded-[24px] data-[state=closed]:slide-out-to-top-[100%] data-[state=open]:slide-in-from-bottom-[100%] ",
          "p-5 sm:max-w-[520px] w-full bottom-0 top-auto"
        )}
      >
        <div className="flex justify-between">
          <div className="flex gap-x-2 items-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary flex justify-center items-center">
              {
                getCryptoIcon[
                  transactionDetails?.type?.toLowerCase() || "topup"
                ]
              }
            </div>
            <div className="flex flex-col">
              <span className="text-12 font-500 text-blue-300 dark:text-white leading-4">
                {getCryptoModalTitle[transactionDetails?.type || "topUp"]}{" "}
                {transactionDetails?.shortName || "ETH"}
              </span>
              {transactionDetailsMutation?.isLoading ? (
                <div className="animate-pulse">
                  <div className="h-3 w-[120px]" />
                </div>
              ) : (
                <span className="text-12 text-gray-300 dark:text-white/30 font-500 leading-4">
                  {`${
                    ["sell", "swap"].includes(
                      transactionDetails?.type || "topUp"
                    )
                      ? "from"
                      : "to"
                  } ${transactionDetails?.destinationAddress?.slice(
                    0,
                    5
                  )}...${transactionDetails?.destinationAddress?.slice(-4)}`}
                </span>
              )}
            </div>
          </div>
          <Button
            variant="secondary"
            className="!p-0 h-10 w-10 text-blue-300 dark:bg-white/10 flex justify-center items-center"
            onClick={() => setHandleModal("")}
          >
            <UilTimes className="w-4 h-4 text-blue-300 dark:text-white" />
          </Button>
        </div>
        <div className="sm:mt-6 mt-3">
          <div className="flex flex-col gap-y-2 items-center justify-center">
            <span className="text-12 font-500 text-gray-300 dark:text-white/30 leading-4">
              {transactionType === "withdrawal" ? "Withdraw" : "Received"}
            </span>
            {transactionDetailsMutation?.isLoading ? (
              <div className="animate-pulse">
                <div className="h-10 w-[180px]" />
              </div>
            ) : (
              <div className="flex gap-x-2">
                <span className="text-[40px] font-500 text-blue-300 dark:text-white tracking-[-0.8px] leading-10">
                  {Number(transactionDetails?.amount?.toFixed(6) || 0)}
                </span>
                <span className="text-[40px] font-500 text-gray-300 dark:text-white/30 tracking-[-0.8px] leading-10">
                  {transactionDetails?.shortName || "ETH"}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="sm:mx-7 sm:mt-12 mt-6 sm:mb-7 mb-2">
          {transactionType === "withdrawal" ? (
            <>
              <div className="flex justify-between">
                <span className="text-12 font-500 text-gray-300 dark:text-white/30 leading-4">
                  Network
                </span>
                {transactionDetailsMutation?.isLoading ? (
                  <div className="animate-pulse">
                    <div className="h-4 w-[120px]" />
                  </div>
                ) : (
                  <div className="flex gap-x-2">
                    <Image
                      src={
                        AssetImages[
                          getChainShortNameByAssetId(
                            transactionDetails?.assetId
                          )?.shortName
                        ]
                      }
                      height={16}
                      width={16}
                      alt="icon"
                    />
                    <span className="text-12 font-500 text-blue-300 dark:text-white leading-4">
                      {
                        getChainShortNameByAssetId(transactionDetails?.assetId)
                          ?.name
                      }
                    </span>
                  </div>
                )}
              </div>
              <hr className="my-3 bg-secondary" />
              <div className="flex justify-between">
                <span className="text-12 font-500 text-gray-300 dark:text-white/30 leading-4">
                  Destination
                </span>
                {transactionDetailsMutation?.isLoading ? (
                  <div className="animate-pulse">
                    <div className="h-4 w-[120px]" />
                  </div>
                ) : (
                  <span className="text-12 font-500 text-blue-300 dark:text-white leading-4 truncate w-52">
                    {transactionDetails?.destinationAddress}
                  </span>
                )}
              </div>
              <hr className="my-3 bg-secondary" />
            </>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <span className="text-12 font-500 text-gray-300 dark:text-white/30 leading-4">
                  Tnx Hash
                </span>
                {transactionDetailsMutation?.isLoading ? (
                  <div className="animate-pulse">
                    <div className="h-4 w-[120px]" />
                  </div>
                ) : (
                  <div className="flex gap-x-2 items-center">
                    <Link
                      href={transactionDetails?.link || ""}
                      target="_blank"
                      className="text-primary font-500 text-12 truncate w-[150px] underline underline-offset-2 "
                    >
                      {(transactionDetails?.link?.split("/") || []).pop()}
                    </Link>
                    <CustomToolTip
                      content={"Copied to clipboard"}
                      className="h-5"
                    >
                      <Button
                        variant={"outline"}
                        className="p-0"
                        onClick={() => {
                          navigator.clipboard
                            .writeText(transactionDetails?.txHash)
                            .then(() => {
                              // Text was successfully copied to clipboard
                              toast.success("Copied to clipboard", {
                                toastId: transactionDetails?.txHash,
                              });
                              setIsDataCopy(true);
                            })
                            .catch((error) => {
                              // Handle the error if the text couldn't be copied
                              toast.error("Error in copied to clipboard", {
                                toastId: transactionDetails?.txHash,
                              });
                            });
                        }}
                      >
                        {isDataCopy ? (
                          <div className="h-4 w-4 bg-success-200 flex justify-center items-center rounded-full">
                            <UilCheck className="text-white w-4 h-4" />
                          </div>
                        ) : (
                          <UilCopy className="text-blue-300 w-4 h-4 cursor-pointer dark:text-white" />
                        )}
                      </Button>
                    </CustomToolTip>
                  </div>
                )}
                {/* <div className="flex gap-x-2">
                      {["topUp", "buy"].includes(
                        transactionType || "topUp"
                      ) && (
                        <Image
                          src="/images/svg/icon-BTC.svg"
                          height={16}
                          width={16}
                          alt="icon"
                        />
                      )}
                      <span className="text-12 font-500 text-gray-300 leading-4">
                        {
                          getChainShortNameByAssetId(transactionDetails?.assetId)
                            ?.shortName
                        }{" "}
                        <span className="text-blue-300">
                          {Number(transactionDetails?.amount?.toFixed(6) || 0)}
                        </span>
                      </span>
                    </div> */}
              </div>
              <hr className="my-3 bg-secondary" />
              <div className="flex justify-between">
                <span className="text-12 font-500 text-gray-300 dark:text-white/30 leading-4">
                  Exchange Rate
                </span>
                {transactionDetailsMutation?.isLoading ? (
                  <div className="animate-pulse">
                    <div className="h-4 w-[120px]" />
                  </div>
                ) : (
                  <span className="text-12 font-500 text-blue-300 dark:text-white leading-4">
                    {Number(transactionDetails?.amount?.toFixed(6) || 0)}{" "}
                    {transactionDetails?.shortName || "ETH"} = €
                    {readableNumber(
                      Number(transactionDetails?.amountFiat?.toFixed(2) || 0)
                    )}{" "}
                  </span>
                )}
              </div>
              <hr className="my-3 bg-secondary" />
            </>
          )}
          {/* <div className="flex justify-between">
                <span className="text-12 font-500 text-gray-300 leading-4">
                  Operation Time
                </span>
                <span className="text-12 font-500 text-blue-300 leading-4">
                  Instantly
                </span>
              </div>
              <hr className="my-3 bg-secondary" /> */}
          <div className="flex justify-between">
            <span className="text-12 font-500 text-gray-300 dark:text-white/30 leading-4">
              Gas Fee
            </span>
            {transactionDetailsMutation?.isLoading ? (
              <div className="animate-pulse">
                <div className="h-4 w-[120px]" />
              </div>
            ) : (
              <span className="text-12 font-500 text-blue-300 dark:text-white leading-4">
                {transactionDetails?.fee?.feeCurrency}
                {transactionDetails?.fee}
              </span>
            )}
          </div>
          <hr className="my-3 bg-secondary" />
          {/* <div className="flex justify-between">
                <div className="flex gap-x-1">
                  <span className="text-12 text-gray-300 font-500 leading-4">
                    Cashback included (0.50%)
                  </span>

                  <span className="flex justify-center items-center bg-secondary h-4 w-4 rounded-full">
                    <UilQuestion className="h-4 w-4 fill-white" />
                  </span>
                </div>
                <span className="text-12 font-500 text-primary leading-4">
                  BTC 0.00001897
                </span>
              </div>
              <hr className="my-3 bg-secondary" /> */}
          <div className="flex justify-between">
            <span className="text-12 font-500 text-gray-300 dark:text-white/30 leading-4">
              Date
            </span>
            {transactionDetailsMutation?.isLoading ? (
              <div className="animate-pulse">
                <div className="h-4 w-[120px]" />
              </div>
            ) : (
              <span className="text-12 font-500 text-blue-300 dark:text-white leading-4">
                {moment(transactionDetails?.createdAt).format(
                  "MMM D YYYY, h:mm A"
                )}
              </span>
            )}
          </div>
        </div>
      </DialogContentWithoutClose>
    </Dialog>
  );
};

export default CryptoTransactionDetailsModal;
