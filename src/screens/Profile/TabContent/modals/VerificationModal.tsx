"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/Dialog";
import { VERIFICATION_MODAL } from "@/constants";
import { UilUserCheck } from "@/icons";
import { cn } from "@/utils";
import Image from "next/image";

type VerificationModalProps = {
  modalOpen: string;
  setHandleModal: (payload: string) => void;
};
export const VerificationModal = ({
  modalOpen,
  setHandleModal,
}: VerificationModalProps) => {
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? VERIFICATION_MODAL : "");
  };
  return (
    <Dialog
      open={modalOpen == VERIFICATION_MODAL}
      onOpenChange={handleOpenChange}
    >
      <DialogTrigger />
      <DialogContent
        className={cn(
          "max-w-[656px] sm:-translate-y-1/2 translate-y-0 rounded-[24px] data-[state=closed]:slide-out-to-top-[100%] data-[state=open]:slide-in-from-bottom-[100%] ",
          "p-5 sm:max-w-[520px] w-full bottom-0 top-auto"
        )}
      >
        <DialogTitle className="text-12 flex gap-x-2 items-center text-blue-300 font-500">
          <div className="rounded-full h-10 w-10 bg-secondary dark:bg-white/15  flex justify-center items-center">
            <UilUserCheck className="text-blue-400 dark:text-white w-4 h-4 mx-auto" />
          </div>
          <div className="grid">
            <span className="text-12 font-500 leading-4 text-blue-300 dark:text-white">
              Identity Verification
            </span>
            <span className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
              Submit KYC
            </span>
          </div>
        </DialogTitle>
        <div className="my-2 max-h-[480px] overflow-auto">
          <Image
            src={"/images/verification.png"}
            width={480}
            height={480}
            className="w-full h-[600px]"
            alt=""
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
