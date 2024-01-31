"use client";
import { Button } from "@/components/UI/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/UI/Dialog";
import { DEPOSIT_MODAL, TOP_UP_BALANCE_MODAL } from "@/constants";
import { UilExclamationTriangle } from "@/icons";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";

const TopUpBalanceModal = () => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  return (
    <Dialog
      open={modalOpen === TOP_UP_BALANCE_MODAL}
      onOpenChange={(e) => setHandleModal(e ? TOP_UP_BALANCE_MODAL : "")}
    >
      <DialogTrigger />
      <DialogContent className="max-w-[656px]">
        <div className="flex gap-x-2 items-center">
          <div className="bg-danger-200 w-10 h-10 rounded-full flex justify-center items-center">
            <UilExclamationTriangle className="w-4 h-4 text-white" />
          </div>
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
            <span className="text-gray-300 text-12 font-500 leading-4">
              by Gordon Capital Estate
            </span>
          </div>
        </div>
        <div className="mx-auto max-w-[232px] text-center mt-6">
          <p className="text-24 font-500 text-blue-300 leading-7">
            Your balance is €0.00
          </p>
          <p className="text-16 font-500 text-gray-300 mt-3 leading-5">
            In order to continue — top up your balance
          </p>
          <Button
            className="mt-11 font-700 text-14 px-6 mb-7 leading-4"
            onClick={() => setHandleModal(DEPOSIT_MODAL)}
          >
            Top Up Balance
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TopUpBalanceModal;
