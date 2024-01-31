import { Button } from "@/components/UI/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/UI/Dialog";
import { REMOVE_CARD } from "@/constants";
import { UilExclamationTriangle } from "@/icons";
import { cn } from "@/utils";
REMOVE_CARD;

type RemoveCardModalProps = {
  modalOpen: string;
  setHandleModal: (payload: string) => void;
};
export const RemoveCardModal = ({
  modalOpen,
  setHandleModal,
}: RemoveCardModalProps) => {
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? REMOVE_CARD : "");
  };
  return (
    <Dialog open={modalOpen == REMOVE_CARD} onOpenChange={handleOpenChange}>
      <DialogTrigger />
      <DialogContent
        className={cn(
          "max-w-[656px] sm:-translate-y-1/2 translate-y-0 rounded-[24px] data-[state=closed]:slide-out-to-top-[100%] data-[state=open]:slide-in-from-bottom-[100%] ",
          "p-5 sm:max-w-[520px] w-full bottom-0 top-auto"
        )}
      >
        <div className="h-10 w-10 flex items-center justify-center bg-blue-300 rounded-full">
          <UilExclamationTriangle className="h-4 w-4 text-white" />
        </div>
        <div className="mt-6">
          <p className="text-center text-24 font-500 leading-7 text-blue-300">
            Remove this card?
          </p>
          <p className="text-center text-16 font-500 leading-5 text-blue-300/60 mt-3">
            Once removed, you won’t be able to buy or make any transactions with
            this card.
          </p>
          <p className="text-center text-16 font-500 leading-5 text-blue-300/60 mt-3">
            To link it again, you will have to wait until we verify your card
            due to security reasons
          </p>
          <div className="flex justify-center gap-2 mt-6 mb-10">
            <Button
              className="text-16 font-700 leading-5 text-white py-4 px-6 bg-secondary text-blue-300"
              onClick={() => setHandleModal("")}
            >
              No, cancel
            </Button>
            <Button
              className="text-16 font-700 leading-5 text-white py-4 px-6"
              onClick={() => setHandleModal("")}
            >
              Yes, remove
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
