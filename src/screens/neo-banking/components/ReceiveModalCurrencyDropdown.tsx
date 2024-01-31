import { Button } from "@/components/UI/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/UI/Popover";
import { UilAngleUp, UilCheck, UilEuro } from "@/icons";
import { cn } from "@/utils";
interface ReceiveModalCurrencyDropdownProps {
  openCurrencyDropdown: boolean;
  setOpenCurrencyDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  currencyValue: string;
  handleCurrencySelection: (value: string) => void;
  userWalletDetails: any;
}

const ReceiveModalCurrencyDropdown = ({
  currencyValue,
  openCurrencyDropdown,
  setOpenCurrencyDropdown,
  handleCurrencySelection,
  userWalletDetails,
}: ReceiveModalCurrencyDropdownProps) => {
  return (
    <Popover
      open={openCurrencyDropdown}
      onOpenChange={(e) => setOpenCurrencyDropdown(e)}
    >
      <PopoverTrigger className="w-full mt-3">
        <Button
          className={cn(
            `w-full sm:max-w-[396px] max-w-[94%] rounded-[16px] bg-gray-100 flex justify-between items-center dark:bg-white dark:bg-opacity-5`,
            currencyValue ? "px-[14px] py-3" : "p-[14px] "
          )}
          onClick={() => setOpenCurrencyDropdown(!openCurrencyDropdown)}
        >
          <div className="flex gap-x-2 items-center">
            {currencyValue ? (
              <div className="h-7 w-7 rounded-full bg-blue-300 text-white dark:text-blue-300 dark:bg-white flex justify-center items-center">
                <UilEuro className="h-4 w-4" />
              </div>
            ) : (
              <div className="w-6 h-6 rounded-3xl bg-secondary dark:bg-gray-250/30" />
            )}
            <span
              className={cn(
                "font-700 leading-5 text-16 text-blue-300 dark:text-white",
                !currencyValue && "text-gray-300"
              )}
            >
              {currencyValue ? "Euro" : "Select"}
            </span>
          </div>
          <div
            className={cn(
              "h-6 w-6 rounded-3xl bg-gray-100 flex justify-center items-center text-gray-300 rotate-180 dark:bg-transparent dark:text-white",
              openCurrencyDropdown &&
                "bg-blue-300 text-white rotate-0 dark:bg-white dark:text-blue-300"
            )}
          >
            <UilAngleUp className="h-6 w-6" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "bg-secondary/50 dark:bg-gray-250/30 backdrop-blur-[16px] p-4 rounded-[16px] bottom-0 w-[300px] sm:w-[424px] dark:border-none"
        )}
        align="center"
      >
        <p className="font-500 leading-4 text-12 text-blue-300 mb-1 dark:text-white">
          Currencies
        </p>
        <div className="max-h-[160px] overflow-y-auto mt-1">
          <div
            className="w-full flex justify-between items-center py-2 cursor-pointer last:pb-0"
            onClick={() => {
              handleCurrencySelection(
                userWalletDetails?.accounts?.EUR?.currency
              );
            }}
          >
            <div className="flex gap-x-3 items-center">
              <div
                className={cn(
                  "rounded-3xl h-7 w-7 bg-blue-300 text-white dark:text-blue-300 dark:bg-white flex justify-center items-center p-1.5"
                )}
              >
                <UilEuro className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-500 text-14 text-blue-300 leading-4 dark:text-white">
                  Euro
                </span>
                <span className="font-500 text-12 text-gray-300 dark:text-white/30 leading-4">
                  {userWalletDetails?.accounts?.EUR?.currency}
                </span>
              </div>
            </div>
            {currencyValue === "EUR" && (
              <span className="bg-primary rounded-full h-4 w-4 p-[1px] flex items-center justify-center">
                <UilCheck className="text-white rounded-full" />
              </span>
            )}
          </div>
          {/* {index !== CurrencyData.length - 1 && (
              <hr className="border-gray-300/10" />
            )} */}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ReceiveModalCurrencyDropdown;
