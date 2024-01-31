"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/UI/Popover";
import { Switch } from "@/components/UI/Switch";
import { CURRENCY_MODAL } from "@/constants";
import { UilAngleUp, UilCheck, UilDollarAlt, UilEuro, UilPound } from "@/icons";
import { cn } from "@/utils";
import { useState } from "react";
import { CurrencyModal } from "./modals/CurrencyModal";

export const CurrencyDropdownItems = [
  {
    currencyName: "US Dollar",
    currency: "USD",
    currencyIcon: <UilDollarAlt className="text-blue-300 h-6 w-6" />,
  },
  {
    currencyName: "Euro",
    currency: "EUR",
    currencyIcon: <UilEuro className="text-blue-300 h-5 w-5" />,
  },
  {
    currencyName: "Pounds Sterling",
    currency: "GBP",
    currencyIcon: <UilPound className="text-blue-300 h-5 w-5" />,
  },
];

type SettingProps = {
  modalOpen: string;
  setHandleModal: (payload: string) => void;
};
export default function Settings({ modalOpen, setHandleModal }: SettingProps) {
  const [openCurrencyDropdown, setOpenCurrencyDropdown] = useState(false);
  const [currency, setCurrency] = useState("USD");
  return (
    <div className="mt-6">
      <div className="grid sm:grid-cols-[340px] lg:grid-cols-[332px]">
        <div className="p-5 bg-white rounded-2xl">
          <p className="text-16 font-500 leading-5 text-blue-300">
            Display Currency
          </p>
          <p className="text-12 font-500 leading-4 text-gray-300 mt-0.5">
            Select Currency
          </p>
          <div
            className="p-3.5 w-full mt-5 rounded-xl bg-gray-100 flex sm:hidden justify-between items-center"
            onClick={() => setHandleModal(CURRENCY_MODAL)}
          >
            <div className="flex gap-x-2 items-center">
              {currency &&
                CurrencyDropdownItems.find((x) => x.currency === currency)
                  ?.currencyIcon &&
                (CurrencyDropdownItems.find((x) => x.currency === currency)
                  ?.currencyIcon ||
                  "")}
              <span className="font-700 leading-5 text-16 text-blue-300">
                {
                  CurrencyDropdownItems.find((x) => x.currency === currency)
                    ?.currencyName
                }{" "}
                (
                {
                  CurrencyDropdownItems.find((x) => x.currency === currency)
                    ?.currency
                }
                )
              </span>
            </div>
            <div
              className={cn(
                "h-6 w-6 rounded-3xl bg-gray-100 flex justify-center items-center text-blue-300 rotate-180",
                openCurrencyDropdown && "bg-blue-300 text-white rotate-0"
              )}
            >
              <UilAngleUp className="h-6 w-6" />
            </div>
          </div>
          <Popover
            open={openCurrencyDropdown}
            onOpenChange={(e) => setOpenCurrencyDropdown(e)}
          >
            <PopoverTrigger className="w-full hidden sm:block">
              <div
                className="p-3.5 w-full mt-5 rounded-xl bg-gray-100 flex justify-between items-center"
                onClick={() => setOpenCurrencyDropdown(!openCurrencyDropdown)}
              >
                <div className="flex gap-x-2 items-center">
                  {currency &&
                    CurrencyDropdownItems.find((x) => x.currency === currency)
                      ?.currencyIcon &&
                    (CurrencyDropdownItems.find((x) => x.currency === currency)
                      ?.currencyIcon ||
                      "")}
                  <span className="font-700 leading-5 text-16 text-blue-300">
                    {
                      CurrencyDropdownItems.find((x) => x.currency === currency)
                        ?.currencyName
                    }{" "}
                    (
                    {
                      CurrencyDropdownItems.find((x) => x.currency === currency)
                        ?.currency
                    }
                    )
                  </span>
                </div>
                <div
                  className={cn(
                    "h-6 w-6 rounded-3xl bg-gray-100 flex justify-center items-center text-blue-300 rotate-180",
                    openCurrencyDropdown && "bg-blue-300 text-white rotate-0"
                  )}
                >
                  <UilAngleUp className="h-6 w-6" />
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent
              className={cn(
                "sm:bg-secondary/50  sm:backdrop-blur-[16px] p-4 rounded-[16px] bottom-0"
              )}
              align="center"
            >
              <div className="max-h-[160px] overflow-y-auto mt-1">
                {CurrencyDropdownItems.map((item, index) => (
                  <>
                    <div
                      className="w-full flex justify-between items-center py-2 cursor-pointer"
                      onClick={() => {
                        setCurrency(item.currency);
                        setOpenCurrencyDropdown(false);
                      }}
                      key={`CurrencyDropdown-${index}`}
                    >
                      <div className="flex gap-x-3 items-center">
                        <div className="rounded-3xl h-7 w-7 bg-white flex justify-center items-center p-1.5">
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
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="mt-6 grid lg:grid-cols-2 gap-6">
        <div className="">
          <p className="text-16 font-500 leading-5 text-gray-300">
            Saving Interest Preferences
          </p>
          <div className="grid md:grid-cols-2 gap-2 mt-3 lg:h-[calc(100%-32px)]">
            <div className="p-5 bg-white rounded-xl">
              <Switch />
              <p className="text-16 font-500 leading-5 text-blue-300 mt-6">
                Interest payout in the same currency
              </p>
              <p className="text-12 font-500 leading-4 text-gray-300 mt-2">
                For example, top up BTC and receive interest in BTC
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl">
              <div className="flex items-center justify-between">
                <Switch />
                <p className="text-12 font-500 leading-4 text-primary">
                  Bonus up to 2%
                </p>
              </div>

              <p className="text-16 font-500 leading-5 text-blue-300 mt-6">
                Interest payout in <span className="text-primary">WAVE</span>{" "}
                Tokens
              </p>
              <p className="text-12 font-500 leading-4 text-gray-300 mt-2">
                Receive up to 2% bonus interest on all your assets by choosing
                to get paid in WAVE tokens
              </p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-16 font-500 leading-5 text-gray-300">
            Loan Protection
          </p>
          <div className="grid md:grid-cols-2 gap-2 mt-3">
            <div className="p-5 bg-white rounded-xl">
              <Switch />
              <p className="text-16 font-500 leading-5 text-blue-300 mt-6">
                Automatic Collateral Transfer
              </p>
              <p className="text-12 font-500 leading-4 text-gray-300 mt-2">
                When Automatic Collateral Transfer is enabled, in events when
                the assets in your Credit Line Wallet do not cover the required
                Loan-to-Value ratio, the Ocean Money blockchain oracle
                automatically transfers small portion of assets from the Savings
                Wallet to the Credit Line Wallets to fulfil the gap and keep
                your loan health at check, thus protecting your crypto from
                automatic repayments.
              </p>
            </div>
            <div className="p-5 bg-white rounded-xl">
              <Switch />
              <p className="text-16 font-500 leading-5 text-blue-300 mt-6">
                Unlock Fixed Terms
              </p>
              <p className="text-12 font-500 leading-4 text-gray-300 mt-2">
                When Automatic Collateral Transfer is enabled, in events when
                the assets in your Credit Line Wallet do not cover the required
                Loan-to-Value ratio, the Ocean Money blockchain oracle
                automatically transfers small portion of assets from the Savings
                Wallet to the Credit Line Wallets to fulfil the gap and keep
                your loan health at check, thus protecting your crypto from
                automatic repayments.
              </p>
            </div>
          </div>
        </div>
      </div>
      {modalOpen === CURRENCY_MODAL && (
        <CurrencyModal
          modalOpen={modalOpen}
          setHandleModal={setHandleModal}
          setCurrency={setCurrency}
          setOpenCurrencyDropdown={setOpenCurrencyDropdown}
          currency={currency}
        />
      )}
    </div>
  );
}
