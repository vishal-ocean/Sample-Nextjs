"use client";
import { Button } from "@/components/UI/Button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/Dialog";
import { Input } from "@/components/UI/form/Input";
import { ADD_CARD_MODAL } from "@/constants";
import { UilPlus } from "@/icons";
import { cn } from "@/utils";
import { useState } from "react";

type AddCardModalProps = {
  modalOpen: string;
  setHandleModal: (payload: string) => void;
};

export const AddCardModal = ({
  modalOpen,
  setHandleModal,
}: AddCardModalProps) => {
  const [isAddingCard, setIsAddingCard] = useState(false);

  const handleAddCardClick = () => {
    setIsAddingCard(true);

    // Simulate a 2-second delay before changing back to "Add Card"
    setTimeout(() => {
      setIsAddingCard(false);
      setHandleModal("");
    }, 3000);
  };
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? ADD_CARD_MODAL : "");
  };
  return (
    <Dialog open={modalOpen == ADD_CARD_MODAL} onOpenChange={handleOpenChange}>
      <DialogTrigger />
      <DialogContent
        className={cn(
          "max-w-[656px] sm:-translate-y-1/2 translate-y-0 rounded-[24px] data-[state=closed]:slide-out-to-top-[100%] data-[state=open]:slide-in-from-bottom-[100%] ",
          "p-5 sm:max-w-[520px] w-full bottom-0 top-auto"
        )}
      >
        <DialogTitle className="text-12 flex gap-x-2 items-center text-blue-300 font-500">
          <Button
            variant="secondary"
            className="w-auto h-10 px-4 py-0 text-14 font-700"
            onClick={() => setHandleModal("")}
          >
            Go Back
          </Button>
          <div className="rounded-full h-10 w-10 bg-secondary flex justify-center items-center">
            <UilPlus className="text-blue-400 w-4 h-4 mx-auto" />
          </div>
          <span className="text-12 text-blue-300">Add New Card</span>
        </DialogTitle>
        <form autoComplete="off">
          <div className="px-1 sm:px-7">
            <div className="mb-10 mt-6">
              <h2 className="text-blue-300 text-24 font-500 leading-[120%]">
                Card Details
              </h2>
            </div>
            <div>
              <div className="relative">
                <Input
                  placeholder="Cardholder Name"
                  className={`!bg-gray-100 !border-0 placeholder:!text-blue-300/60 !rounded-[28px] !px-7 leading-5 !text-blue-300 !py-[26px] `}
                />
              </div>
            </div>
            <div className="pt-2">
              <div className=" relative">
                <Input
                  placeholder="Card Number"
                  className={`!bg-gray-100 !border-0 placeholder:!text-blue-300/60 !rounded-[28px] !px-7 leading-5 !text-blue-300 !py-[26px] `}
                />
              </div>
            </div>
            <div className="pt-2 grid grid-cols-2 gap-x-2">
              <div>
                <div className="relative">
                  <Input
                    placeholder="Expiration"
                    className={`!bg-gray-100 !border-0 placeholder:!text-blue-300/60 !rounded-[28px] !px-7 leading-5 !text-blue-300 !py-[26px] `}
                  />
                </div>
              </div>
              <div>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="CVV"
                    className={`!bg-gray-100 !border-0 placeholder:!text-blue-300/60 !rounded-[28px] !px-7 leading-5 !text-blue-300 !py-[26px] `}
                  />
                </div>
              </div>
            </div>

            <Button
              variant="default"
              className="mt-6 sm:mt-11 disabled:bg-blue-300 disabled:text-white  mb-1 sm:mb-7 py-3.5 font-700"
              onClick={() => handleAddCardClick()}
              disabled={isAddingCard}
            >
              {isAddingCard ? "Adding your card..." : "Add Card"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
