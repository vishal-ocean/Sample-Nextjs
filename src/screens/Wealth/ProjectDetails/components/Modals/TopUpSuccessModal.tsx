"use client";
import { Button } from "@/components/UI/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/UI/Dialog";
import { INVEST_MODAL, TOP_UP_SUCCESS_MODAL } from "@/constants";
import { UilCardAtm, UilCheck } from "@/icons";
import { useDepositFiatBalanceStore } from "@/store/depositFiatBalance";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import Image from "next/image";
import { useEffect, useState } from "react";

const TopUpSuccessModal = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const depositFiat = useDepositFiatBalanceStore((state) => state.depositFiat);
  const [showSuccess, setShowSuccess] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowSuccess(true);
    }, 5000);
  }, []);
  return (
    <Dialog
      open={modalOpen === TOP_UP_SUCCESS_MODAL}
      onOpenChange={(e) => setHandleModal(e ? TOP_UP_SUCCESS_MODAL : "")}
    >
      <DialogTrigger />
      <DialogContent className="max-w-[656px]">
        <div className="flex gap-x-2 items-center">
          {showSuccess && (
            <div className="w-10 h-10 bg-success-200 flex justify-center items-center rounded-full">
              <UilCheck className="text-white w-4 h-4" />
            </div>
          )}
          <div className="rounded-full h-10 w-10 bg-blue-300 flex justify-center items-center">
            <UilCardAtm className="w-4 h-4 text-white" />
          </div>
          <span className="text-12 text-blue-300 font-500 leading-4">
            Top Up Balance
          </span>
        </div>
        {showSuccess ? (
          <div className="text-center mx-auto mt-8">
            <div className="mb-6">
              <p className="text-16 font-500 text-success-200">All is done</p>
            </div>
            <div className="max-w-[268px] text-24 font-500 text-blue-300 mb-11 leading-[120%]">
              You deposited €{depositFiat?.[0]?.amount} to your Balance
            </div>
            <Button
              variant="secondary"
              className="mb-6 font-700 text-blue-300"
              onClick={() => setHandleModal(INVEST_MODAL)}
            >
              Continue
            </Button>
          </div>
        ) : (
          <div className="mx-auto text-center">
            <Image
              className=""
              src={"/images/svg/depositing-funds.svg"}
              width={293}
              height={218}
              alt="depositing-funds"
            />
            <div className="pb-12">
              <h3 className="text-24 font-500 text-blue-300">
                Depositing funds
              </h3>
              <p className="text-blue-300/60 font-500 text-16">
                It might take a while
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TopUpSuccessModal;
