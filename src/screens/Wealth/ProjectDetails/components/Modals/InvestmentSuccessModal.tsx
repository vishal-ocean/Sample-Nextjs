"use client";
import { Button } from "@/components/UI/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/UI/Dialog";
import { INVESTMENT_SUCCESS_MODAL } from "@/constants";
import { UilCheck } from "@/icons";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import Image from "next/image";
import { useEffect, useState } from "react";

const InvestmentSuccessModal = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const [showSuccess, setShowSuccess] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowSuccess(true);
    }, 5000);
  }, []);
  return (
    <Dialog
      open={modalOpen === INVESTMENT_SUCCESS_MODAL}
      onOpenChange={(e) => setHandleModal(e ? INVESTMENT_SUCCESS_MODAL : "")}
    >
      <DialogTrigger />
      <DialogContent className="max-w-[656px] rounded-[24px] translate-y-0 sm:-translate-y-1/2">
        <div className="flex gap-x-2 items-center">
          {showSuccess && (
            <div className="w-10 h-10 bg-success-200 flex justify-center items-center rounded-full">
              <UilCheck className="text-white w-4 h-4" />
            </div>
          )}
          <span className="rounded-full w-10 h-10 bg-yellow-100 flex justify-center items-center">
            {/*    <Image
              src="/images/svg/dodo.svg"
              width={16}
              height={16}
              alt="dodo logo"
              className="h-4 w-4"
          /> */}
          </span>
          <div className="flex flex-col">
            <span className="text-blue-300 text-12 font-500 leading-4">
              Polkadot’s Hotel Renovation
            </span>
            <span className="text-blue-300/60 text-12 font-500 leading-4">
              by Gordon Capital Estate
            </span>
          </div>
        </div>
        {showSuccess ? (
          <div className="text-center mx-auto mt-8">
            <p className="text-16 font-500 text-success-200 mb-6">
              All is done
            </p>
            <p className="max-w-[268px] text-24 font-500 text-blue-300 mb-2">
              You invested €25,000
            </p>
            <p className="max-w-[268px] text-16 font-500 text-blue-300/60 mb-11">
              To see your investments use <br />
              <span className="text-blue-300">My Investments</span> tab in
              project page
            </p>
            <Button
              variant="secondary"
              className="mb-1 sm:mb-7 font-700 text-blue-300"
              onClick={() => setHandleModal("")}
            >
              Awesome
            </Button>
          </div>
        ) : (
          <div className="mx-auto text-center">
            <Image
              className="mt-7"
              src={"/images/svg/depositing-funds.svg"}
              width={293}
              height={218}
              alt="depositing-funds"
            />
            <div className="pb-3 sm:pb-10">
              <h3 className="text-24 font-500 text-blue-300 leading-[120%]">
                Processing your investment
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

export default InvestmentSuccessModal;
