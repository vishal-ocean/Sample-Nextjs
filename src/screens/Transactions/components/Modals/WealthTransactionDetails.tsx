"use client";
import { WEALTH_TRANSACTION_DETAILS_MODAL } from "@/constants";
import { UilAngleRightB, UilQuestion, UilTimes } from "@/icons";
import Image from "next/image";

import { Button } from "@/components/UI/Button";
import {
  Dialog,
  DialogContentWithoutClose,
  DialogTrigger,
} from "@/components/UI/Dialog";
import { useTransfer } from "@/screens/Transactions/components/hooks/useTransfer";
import { cn } from "@/utils";

const WealthTransactionDetailsModal = ({
  modalOpen,
  transactionType,
  setHandleModal,
}: {
  modalOpen: string;
  transactionType: string;
  setHandleModal: (payload: string) => void;
}) => {
  const { getWealthModalTitle, getWealthIcon } = useTransfer();
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? WEALTH_TRANSACTION_DETAILS_MODAL : "");
  };
  return (
    <Dialog
      open={modalOpen === WEALTH_TRANSACTION_DETAILS_MODAL}
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
            <div className="w-10 h-10 rounded-full bg-orange-300/10 flex justify-center items-center">
              {getWealthIcon[transactionType || "primaryInvestment"]}
            </div>
            <div className="flex flex-col">
              <span className="text-12 font-500 text-blue-300 leading-4">
                {
                  getWealthModalTitle[transactionType || "primaryInvestment"]
                    .title
                }
              </span>
              <span className="text-12 text-gray-300 font-500 leading-4">
                {
                  getWealthModalTitle[transactionType || "primaryInvestment"]
                    .subText
                }
              </span>
            </div>
          </div>
          <Button
            variant="secondary"
            className="!p-0 h-10 w-10 text-blue-300 flex justify-center items-center"
            onClick={() => setHandleModal("")}
          >
            <UilTimes className="w-4 h-4 text-blue-300" />
          </Button>
        </div>
        <div className="sm:mt-6 mt-3">
          <div className="flex flex-col gap-y-2 items-center justify-center">
            <span className="text-12 font-500 text-gray-300 leading-4">
              {transactionType === "transfer" ? "Transferred" : "Received"}
            </span>
            <div className="flex gap-x-2">
              <span className="text-[40px] font-500 text-blue-300 tracking-[-0.8px] leading-10">
                0.00381396
              </span>
              <span className="text-[40px] font-500 text-gray-300 tracking-[-0.8px] leading-10">
                BTC
              </span>
            </div>
          </div>
        </div>
        <div className="sm:mx-7 sm:mt-12 mt-6 sm:mb-7 mb-2">
          {transactionType === "earnings" ? (
            <>
              <div className="flex justify-between">
                <span className="text-12 font-500 text-gray-300 leading-4">
                  Earning Type
                </span>
                <span className="text-12 font-500 text-blue-300 leading-4">
                  Rental Income
                </span>
              </div>
              <hr className="my-3 bg-secondary" />
            </>
          ) : (
            <>
              <div className="flex justify-between">
                <span className="text-12 font-500 text-gray-300 leading-4">
                  Pay With
                </span>
                <div className="flex gap-x-2">
                  {transactionType === "secondaryInvestment" && (
                    <Image
                      src="/images/svg/icon-BTC.svg"
                      height={16}
                      width={16}
                      alt="icon"
                    />
                  )}
                  <span className="text-12 font-500 text-gray-300 leading-4">
                    {transactionType === "secondaryInvestment" ? "P79" : "USD"}{" "}
                    <span className="text-blue-300">
                      {transactionType === "secondaryInvestment" ? 3 : 25000}
                    </span>
                  </span>
                </div>
              </div>
              <hr className="my-3 bg-secondary" />
            </>
          )}
          {transactionType !== "earnings" && (
            <>
              <div className="flex justify-between">
                <span className="text-12 font-500 text-gray-300 leading-4">
                  Exchange Rate
                </span>
                <span className="text-12 font-500 text-blue-300 leading-4">
                  1 P79 = 29399.40 USD
                </span>
              </div>
              <hr className="my-3 bg-secondary" />
            </>
          )}
          <div className="flex justify-between">
            <span className="text-12 font-500 text-gray-300 leading-4">
              Operation Time
            </span>
            <span className="text-12 font-500 text-blue-300 leading-4">
              €0.00
            </span>
          </div>
          <hr className="my-3 bg-secondary" />
          <div className="flex justify-between">
            <span className="text-12 font-500 text-gray-300 leading-4">
              Fee
            </span>
            <span className="text-12 font-500 text-blue-300 leading-4">
              Instantly
            </span>
          </div>
          <hr className="my-3 bg-secondary" />
          <div className="flex justify-between">
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
          <hr className="my-3 bg-secondary" />
          <div className="flex justify-between">
            <span className="text-12 font-500 text-gray-300 leading-4">
              Date
            </span>
            <span className="text-12 font-500 text-blue-300 leading-4">
              Aug 17 2023, 9:14 AM
            </span>
          </div>
          {transactionType !== "secondaryInvestment" && (
            <>
              <hr className="my-3 bg-secondary" />
              <div className="flex justify-between">
                <span className="text-12 font-500 text-gray-300 leading-4">
                  Project
                </span>
                <div className="flex gap-x-1">
                  <span className="text-12 font-500 text-blue-300 leading-4">
                    Polkadot’s Hotel Renovation
                  </span>
                  <Button variant={"outline"} className="!p-0">
                    <UilAngleRightB className="w-4 h-4 text-blue-300" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContentWithoutClose>
    </Dialog>
  );
};

export default WealthTransactionDetailsModal;
