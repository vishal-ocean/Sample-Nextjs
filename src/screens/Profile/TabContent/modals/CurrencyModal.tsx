import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/UI/Dialog";
import { CURRENCY_MODAL } from "@/constants";
import { UilCheck } from "@/icons";
import { CurrencyDropdownItems } from "@/screens/Profile/TabContent/Settings";
import { cn } from "@/utils";

interface CurrencyModalProps {
  modalOpen: string;
  setHandleModal: (payload: string) => void;
  setCurrency: (newCurrency: string) => void;
  setOpenCurrencyDropdown: (isOpen: boolean) => void;
  currency: string;
}
export const CurrencyModal = ({
  modalOpen,
  setHandleModal,
  setCurrency,
  setOpenCurrencyDropdown,
  currency,
}: CurrencyModalProps) => {
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? CURRENCY_MODAL : "");
  };
  return (
    <Dialog open={modalOpen == CURRENCY_MODAL} onOpenChange={handleOpenChange}>
      <DialogTrigger />
      <DialogContent
        className={cn(
          "max-w-[656px] sm:-translate-y-1/2 translate-y-0 block sm:hidden rounded-[24px] data-[state=closed]:slide-out-to-top-[100%] data-[state=open]:slide-in-from-bottom-[100%] ",
          "p-5 sm:max-w-[520px] w-full bottom-0 top-auto"
        )}
      >
        <DialogTitle className="text-12 flex gap-x-2 items-center text-blue-300 font-500">
          <p className="text-16 font-500 leading-5 text-blue-300">
            Select Currency BTC
          </p>
        </DialogTitle>
        <div className="mt-6">
          <div className="overflow-y-auto mt-1">
            {CurrencyDropdownItems.map((item, index) => (
              <>
                <div
                  className="w-full flex justify-between items-center py-4 cursor-pointer last:pb-0"
                  onClick={() => {
                    setCurrency(item.currency);
                    setOpenCurrencyDropdown(false);
                    setHandleModal("");
                  }}
                  key={`CurrencyDropdown-${index}`}
                >
                  <div className="flex gap-x-3 items-center">
                    <div className="rounded-3xl h-7 w-7 bg-secondary flex justify-center items-center p-1.5">
                      {item.currencyIcon}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-500 text-14 text-blue-300 leading-4">
                        {item.currencyName}
                      </span>
                      <span className="font-500 text-12 text-gray-300 leading-4">
                        {item.currency}
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
        </div>
      </DialogContent>
    </Dialog>
  );
};
