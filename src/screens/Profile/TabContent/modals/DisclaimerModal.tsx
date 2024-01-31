"use client";
import { Button } from "@/components/UI/Button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/Dialog";
import { DISCLAIMER_MODAL } from "@/constants";
import { UilInfoCircle } from "@/icons";
import { cn } from "@/utils";

type DisclaimerModalProps = {
  modalOpen: string;
  setHandleModal: (payload: string) => void;
};

export const DisclaimerModal = ({
  modalOpen,
  setHandleModal,
}: DisclaimerModalProps) => {
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? DISCLAIMER_MODAL : "");
  };
  return (
    <Dialog
      open={modalOpen == DISCLAIMER_MODAL}
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
          <div className="rounded-full h-10 w-10 bg-secondary dark:bg-white/15 flex justify-center items-center">
            <UilInfoCircle className="text-blue-400 dark:text-white w-4 h-4 mx-auto" />
          </div>
        </DialogTitle>
        <div className="my-6">
          <p className="text-24 font-500 leading-7 text-blue-300 dark:text-white">
            Disclaimer
          </p>
          <p className="text-16 font-500 leading-5 text-blue-300 dark:text-white mt-6">
            The WAVE token tier system and associated benefits are subject to
            change at any time and without prior notice. Ocean Money reserves
            the right to modify or discontinue any aspect of the tier system,
            including but not limited to the number of tokens required for each
            tier, the benefits associated with each tier, and the availability
            of the tier system itself. Users are encouraged to regularly review
            the latest information about the Wave token tier system and its
            benefits. By participating in the tier system, users acknowledge and
            accept this possibility of changes and discontinuation.
          </p>
          <Button
            className="text-16 font-700 leading-5 text-blue-300 dark:text-white mt-6 bg-secondary dark:bg-white/15 py-4 px-6"
            onClick={() => setHandleModal("")}
          >
            Got It
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
