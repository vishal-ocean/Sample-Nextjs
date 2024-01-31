import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/UI/Popover";
import { SWAP_METHODS } from "@/constants/SwapMethodsList";
import { UilCheckCircle } from "@/icons";
import { cn } from "@/utils";

interface SwapMethodDropDownProps {
  openSwapMethodDropdown: boolean;
  setOpenSwapMethodDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  swapMethod: string;
  setSwapMethod: React.Dispatch<React.SetStateAction<any>>;
  className?: string;
  align?: "center" | "start" | "end" | undefined;
}
const SwapMethodDropDown: React.FC<SwapMethodDropDownProps> = ({
  swapMethod,
  setSwapMethod,
  openSwapMethodDropdown,
  setOpenSwapMethodDropdown,
  className,
  align,
}) => {
  return (
    <Popover
      open={openSwapMethodDropdown}
      // onOpenChange={(e) => setOpenSwapMethodDropdown(e)}
    >
      <PopoverTrigger />
      <PopoverContent
        className={cn(
          "sm:bg-secondary/50 bg-secondary sm:backdrop-blur-[16px] p-4 rounded-[16px] sm:w-[424px] w-[360px]",
          className
        )}
        align={align}
      >
        <p className="text-gray-300 text-12 font-500 leading-5">Swap Methods</p>
        <div className="max-h-[200px] overflow-y-auto mt-1">
          {SWAP_METHODS.map((item, index) => (
            <>
              <div
                className="w-full flex justify-between items-center py-2 cursor-pointer"
                onClick={() => {
                  setSwapMethod(item.value);
                  setOpenSwapMethodDropdown(false);
                }}
                key={`cardDropdown-${index}`}
              >
                <div className="flex gap-x-4 items-center">
                  <div className="rounded-3xl h-7 w-7 bg-blue-300 flex justify-center items-center">
                    {item.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-500 text-14 text-blue-300 leading-4">
                      {item.name}
                    </span>
                    <span className="font-500 text-12 text-blue-700 leading-4">
                      {item.value}
                    </span>
                  </div>
                </div>
                {swapMethod === item.value && (
                  <UilCheckCircle className="text-primary h-4 w-4" />
                )}
              </div>
              {index !== SWAP_METHODS.length - 1 && (
                <hr className="p-0 m-0 bg-gray-300 opacity-10" />
              )}
            </>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SwapMethodDropDown;
