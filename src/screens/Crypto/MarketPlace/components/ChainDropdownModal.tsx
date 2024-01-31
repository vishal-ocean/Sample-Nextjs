"use client";
import CustomModal from "@/components/CustomModal";
import { CHAIN_DROPDOWN_MODAL } from "@/constants";
import { UilCheck } from "@/icons";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { FC } from "react";
import { CurrencyDropdownItems } from "./ChainDropdown";

interface ChainDropdownModalProps {
  setCurrency: (currency: string) => void;
  setOpenCurrencyDropdown: (isOpen: boolean) => void;
  currency: string;
}
const ChainDropdownModal: FC<ChainDropdownModalProps> = ({
  setCurrency,
  setOpenCurrencyDropdown,
  currency,
}) => {
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal, setHandleModalState } = useHandleModalAction;
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? CHAIN_DROPDOWN_MODAL : "");
    setHandleModalState(false);
  };

  return (
    <>
      <CustomModal
        open={modalOpen == CHAIN_DROPDOWN_MODAL}
        onOpenChange={handleOpenChange}
        className="p-5 max-w-full bottom-0"
      >
        <p className="text-16 font-500 leading-10 text-blue-300 mn-2">
          Blockchains
        </p>
        <div className="max-h-[200px] overflow-y-auto mt-1">
          {CurrencyDropdownItems.map((item, index) => (
            <>
              <div
                className="w-full flex justify-between items-center py-4 cursor-pointer first:pt-0 last:pb-0"
                onClick={() => {
                  setCurrency(item.currency);
                  setHandleModal("");
                }}
                key={`CurrencyDropdown-${index}`}
              >
                <div className="flex gap-x-3 items-center mr-5">
                  <div className="rounded-3xl h-7 w-7 bg-secondary flex justify-center items-center p-1.5">
                    {item.currencyIcon}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-500 text-14 text-blue-300 leading-4">
                      {item.currency}
                    </span>
                    <span className="font-500 text-12 text-gray-300 leading-4">
                      {item.currencyName}
                    </span>
                  </div>
                </div>
                {currency === item.currency && (
                  <span className="bg-primary rounded-full h-4 w-4 p-[1px] flex items-center justify-center">
                    <UilCheck className="text-white rounded-full" />
                  </span>
                )}
              </div>
              {index !== CurrencyDropdownItems.length - 1 && (
                <hr className="border-gray-300/10" />
              )}
            </>
          ))}
        </div>
      </CustomModal>
    </>
  );
};

export default ChainDropdownModal;
