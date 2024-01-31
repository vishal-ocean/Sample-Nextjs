"use client";
import { UilCheck, UilWallet } from "@/icons";
import { useEffect, useState } from "react";

import { Portal } from "@/components/Portal";
import { Button } from "@/components/UI/Button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/Dialog";
import { DEPOSIT_SUCCESS_MODAL } from "@/constants";
import { readableNumber } from "@/helper/readableNumber";
import { useDepositFiatBalanceStore } from "@/store/depositFiatBalance";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import DepositingFunds from "./DepositingFunds";
const DepositFiatDone = () => {
  const depositFiat = useDepositFiatBalanceStore((state) => state.depositFiat);
  const [showSuccess, setShowSuccess] = useState(false);
  const { setHandleModal } = useHandleModalAction;
  const { modalOpen } = useHandleModalStore();
  useEffect(() => {
    setTimeout(() => {
      setShowSuccess(true);
    }, 5000);
  }, []);

  return (
    <Portal>
      <Dialog
        open={modalOpen === DEPOSIT_SUCCESS_MODAL}
        onOpenChange={(e) => setHandleModal(e ? DEPOSIT_SUCCESS_MODAL : "")}
      >
        <DialogTrigger />
        <DialogContent className="sm:max-w-[656px] translate-y-0 sm:-translate-y-1/2">
          <DialogTitle>
            <div className="flex justify-start items-center gap-x-2">
              {showSuccess && (
                <div className="w-10 h-10 bg-success-100 flex justify-center items-center rounded-full">
                  <UilCheck className="text-white w-4 h-4" />
                </div>
              )}
              <div className="w-10 h-10 bg-success-100 flex justify-center items-center rounded-full">
                <UilWallet className="text-white w-4 h-4" />
              </div>
            </div>
          </DialogTitle>
          {showSuccess ? (
            <div className="text-center mx-auto pt-6">
              <div className="mb-4 sm:mb-6">
                <p className="text-16 font-500 text-success-200">All is done</p>
              </div>
              <div className="max-w-[268px] text-24 font-500 text-blue-300 mb-6 sm:mb-11 leading-[120%]">
                You deposited €
                {readableNumber(
                  Number(depositFiat?.[0]?.amount?.toFixed(2) || 0)
                )}{" "}
                to your Balance
              </div>
              <Button
                variant="secondary"
                className="mb-5 sm:mb-7 font-700 text-blue-300 py-3.5"
                onClick={() => setHandleModal("")}
              >
                Continue
              </Button>
            </div>
          ) : (
            <DepositingFunds />
          )}
        </DialogContent>
      </Dialog>
    </Portal>
  );
};

export default DepositFiatDone;
