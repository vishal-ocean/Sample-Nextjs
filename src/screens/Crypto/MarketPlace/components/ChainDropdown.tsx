"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/UI/Popover";
import { CHAIN_DROPDOWN_MODAL } from "@/constants";
import { UilAngleUp, UilCheck } from "@/icons";
import { useHandleModalAction } from "@/store/handleModal";
import { cn } from "@/utils";
import Image from "next/image";

type ChainDropdownProps = {
  openCurrencyDropdown: boolean;
  setOpenCurrencyDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  currency: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
};
export const CurrencyDropdownItems = [
  {
    currencyName: "Ethereum (ERC20)",
    currency: "ETH",
    currencyIcon: (
      <Image
        src={"/images/svg/icon-ETH.svg"}
        height={16}
        width={16}
        alt=""
        className="h-4 w-4"
      />
    ),
  },
  {
    currencyName: "Polygon",
    currency: "MATIC",
    currencyIcon: (
      <Image
        src={"/images/svg/icon-Polygon.svg"}
        height={16}
        width={16}
        alt=""
        className="h-4 w-4"
      />
    ),
  },
  {
    currencyName: "BNB Smart Chain (BEP20)",
    currency: "BSC",
    currencyIcon: (
      <Image
        src={"/images/svg/icon-BNB.svg"}
        height={16}
        width={16}
        alt=""
        className="h-4 w-4"
      />
    ),
  },
];
export const ChainDropdown = ({
  openCurrencyDropdown,
  setOpenCurrencyDropdown,
  currency,
  setCurrency,
}: ChainDropdownProps) => {
  const { setHandleModal, setHandleModalState } = useHandleModalAction;

  return (
    <>
      <div
        className={cn(
          "px-5 py-2 w-full bg-secondary flex sm:hidden justify-between items-center rounded-full min-w-[92px]",
          openCurrencyDropdown && "bg-blue-300"
        )}
        onClick={() => setHandleModal(CHAIN_DROPDOWN_MODAL)}
      >
        <div className="flex gap-x-2 items-center mr-2">
          {currency &&
            CurrencyDropdownItems.find((x) => x.currency === currency)
              ?.currencyIcon &&
            (CurrencyDropdownItems.find((x) => x.currency === currency)
              ?.currencyIcon ||
              "")}
        </div>
        <div
          className={cn(
            "h-6 w-6 rounded-3xl flex justify-center items-center text-blue-300 rotate-180",
            openCurrencyDropdown && " text-white rotate-0"
          )}
        >
          <UilAngleUp className="h-6 w-6" />
        </div>
      </div>
      <Popover
        open={openCurrencyDropdown}
        onOpenChange={(e) => setOpenCurrencyDropdown(e)}
      >
        <PopoverTrigger className=" hidden sm:block">
          <div
            className={cn(
              "px-4 py-2 w-[190px] bg-secondary flex justify-between items-center rounded-full",
              openCurrencyDropdown && "bg-blue-300"
            )}
            onClick={() => setOpenCurrencyDropdown(!openCurrencyDropdown)}
          >
            <div className="flex gap-x-2 items-center mr-2">
              {currency &&
                CurrencyDropdownItems.find((x) => x.currency === currency)
                  ?.currencyIcon &&
                (CurrencyDropdownItems.find((x) => x.currency === currency)
                  ?.currencyIcon ||
                  "")}
              <span
                className={cn(
                  "font-700 leading-4 text-14 text-blue-300",
                  openCurrencyDropdown && " text-white"
                )}
              >
                {
                  CurrencyDropdownItems.find((x) => x.currency === currency)
                    ?.currency
                }{" "}
                Chain
              </span>
            </div>
            <div
              className={cn(
                "h-6 w-6 rounded-3xl flex justify-center items-center text-blue-300 rotate-180",
                openCurrencyDropdown && " text-white rotate-0"
              )}
            >
              <UilAngleUp className="h-6 w-6" />
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            "sm:bg-secondary/50  sm:backdrop-blur-[16px] p-4 rounded-[16px] bottom-0 w-max"
          )}
          align="center"
        >
          <div className="max-h-[200px] overflow-y-auto mt-1">
            <p className="text-12 font-500 leading-4 text-gray-300 mb-1">
              Blockchains
            </p>
            {CurrencyDropdownItems.map((item, index) => (
              <>
                <div
                  className="w-full flex justify-between items-center py-2 cursor-pointer last:pb-0"
                  onClick={() => {
                    setCurrency(item.currency);
                    setOpenCurrencyDropdown(false);
                  }}
                  key={`CurrencyDropdown-${index}`}
                >
                  <div className="flex gap-x-3 items-center mr-5">
                    <div className="rounded-3xl h-7 w-7 bg-white flex justify-center items-center p-1.5">
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
        </PopoverContent>
      </Popover>
    </>
  );
};
