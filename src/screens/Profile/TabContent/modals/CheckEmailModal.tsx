import { Button } from "@/components/UI/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/UI/Dialog";
import { CHECK_EMAIL } from "@/constants";
import { UilCheck } from "@/icons";
import { cn } from "@/utils";

type CheckEmailModalProps = {
  modalOpen: string;
  setHandleModal: (payload: string) => void;
};

export const CheckEmailModal = ({
  modalOpen,
  setHandleModal,
}: CheckEmailModalProps) => {
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? CHECK_EMAIL : "");
  };
  return (
    <Dialog open={modalOpen == CHECK_EMAIL} onOpenChange={handleOpenChange}>
      <DialogTrigger />
      <DialogContent
        className={cn(
          "max-w-[656px] sm:-translate-y-1/2 translate-y-0 rounded-[24px] data-[state=closed]:slide-out-to-top-[100%] data-[state=open]:slide-in-from-bottom-[100%] ",
          "p-5 sm:max-w-[520px] w-full bottom-0 top-auto"
        )}
      >
        <div className="h-10 w-10 flex items-center justify-center bg-success-200 rounded-full">
          <UilCheck className="h-4 w-4 text-white" />
        </div>
        <div className="mt-6">
          <p className="text-center text-24 font-500 leading-7 text-blue-300">
            Check your email
          </p>
          <p className="text-center text-16 font-500 leading-5 text-blue-300/60 mt-3">
            We&apos;ve sent a password reset link to your email
          </p>
          <Button
            className="text-16 font-700 leading-5 text-white py-4 px-6 mx-auto flex mt-6 mb-10 bg-secondary text-blue-300"
            onClick={() => setHandleModal("")}
          >
            Awesome
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
