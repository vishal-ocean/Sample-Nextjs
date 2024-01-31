import CustomModal from "@/components/CustomModal";
import { IconSwap } from "@/components/icons/IconSwap";
import {
  EXCHANGE_CURRENCY_MODAL,
  PREVIEW_EXCHANGE_CURRENCY_MODAL,
} from "@/constants";
import { UilAngleUp, UilExchange, UilSearch } from "@/icons";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { useState } from "react";

import { Button } from "@/components/UI/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/UI/Popover";
import { Input } from "@/components/UI/form/Input";
import { cn } from "@/utils";
import { CurrencyDropdownContent } from "../CurrencyDropdownContent";
import { useCurrency } from "../useCurrency";

const ExchangeCurrencyModal = () => {
  const { modalOpen } = useHandleModalStore();
  const [currencyFromValue, setCurrencyFromValue] = useState("");
  const [currencyFromToValue, setCurrencyFromToValue] = useState("");
  const [currencyFromAmount, setCurrencyFromAmount] = useState(0);
  const [currencyFromToAmount, setCurrencyFromToAmount] = useState(0);
  const [openCurrencyFromDropdown, setOpenCurrencyFromDropdown] =
    useState(false);
  const [openCurrencyFromToDropdown, setOpenCurrencyFromToDropdown] =
    useState(false);
  const { setHandleModal } = useHandleModalAction;
  const { CurrencyData } = useCurrency();
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? EXCHANGE_CURRENCY_MODAL : "");
  };

  // const CurrencySignData = [
  //   {
  //     currency: "USD",
  //     currencySign: "$",
  //   },
  //   {
  //     currency: "EUR",
  //     currencySign: "€",
  //   },
  //   {
  //     currency: "GBP",
  //     currencySign: "£",
  //   },
  // ];
  return (
    <CustomModal
      open={modalOpen === EXCHANGE_CURRENCY_MODAL}
      onOpenChange={handleOpenChange}
      className="max-w-[520px] p-5 bottom-0 md:bottom-auto translate-y-0 sm:-translate-y-1/2"
    >
      <div className="flex gap-x-2 items-center mb-6">
        <span className="h-10 w-10 bg-primary text-white flex justify-center items-center rounded-full">
          <IconSwap className="h-4 w-4" />
        </span>
        <span>
          <p className="text-blue-300 text-12 font-500 leading-4">Exchange</p>
        </span>
      </div>
      <div className="sm:px-7 mb-5 sm:mb-7">
        <div>
          <p className="text-12 font-500 leading-4 text-gray-300">From</p>
          <div className="bg-gray-100 rounded-[16px] flex items-center h-[52px] mt-3">
            <Popover
              open={openCurrencyFromDropdown}
              onOpenChange={(e) => setOpenCurrencyFromDropdown(e)}
            >
              <PopoverTrigger className="">
                <Button
                  className={`w-[110px] bg-transparent flex justify-between items-center ${
                    currencyFromValue
                      ? "pl-3.5 pr-0 py-3"
                      : "py-[10px] pl-3.5 pr-0"
                  }`}
                  onClick={() =>
                    setOpenCurrencyFromDropdown(!openCurrencyFromDropdown)
                  }
                >
                  <div className="flex gap-x-2 items-center">
                    {currencyFromValue ? (
                      <div className="h-7 w-7 rounded-full bg-blue-300 text-white flex justify-center items-center">
                        {
                          CurrencyData.find(
                            (x) => x.currency === currencyFromValue
                          )?.currencyIcon
                        }
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-3xl bg-secondary" />
                    )}
                    <span
                      className={cn(
                        "font-700 leading-5 text-16 text-blue-300",
                        !currencyFromValue && "text-gray-300"
                      )}
                    >
                      {currencyFromValue
                        ? CurrencyData.find(
                            (x) => x.currency === currencyFromValue
                          )?.currency
                        : "Select"}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "h-6 w-6 rounded-3xl bg-gray-100 flex justify-center items-center text-blue-300 rotate-180",
                      openCurrencyFromDropdown &&
                        "bg-blue-300 text-white rotate-0"
                    )}
                  >
                    <UilAngleUp className="h-6 w-6" />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className={cn(
                  "bg-secondary/50  backdrop-blur-[16px] p-4 rounded-[16px] bottom-0 w-[300px] sm:w-[424px]"
                )}
                align="start"
                sideOffset={10}
              >
                <p className="font-500 leading-4 text-12 text-blue-300 mb-2">
                  Currency
                </p>
                <div className="relative">
                  <span className="flex justify-center absolute top-2.5 items-center text-center pl-3 pointer-events-none">
                    <UilSearch className="h-5 w-5 text-blue-300" />
                  </span>
                  <input
                    type="text"
                    id="search-assets"
                    className="input w-full leading-5 rounded-xl outline-none py-2.5 pl-10 lg:placeholder:text-16 placeholder:text-gray-300  placeholder:font-500 placeholder:font-body placeholder:text-14 text-14 lg:text-16  font-500 font-body cursor-pointer text-blue-300 bg-white/60 lg:h-fit h-10"
                    placeholder="Search"
                    required
                  />
                </div>
                <CurrencyDropdownContent
                  CurrencyData={CurrencyData}
                  setCurrencyValue={setCurrencyFromValue}
                  setOpenCurrencyDropdown={setOpenCurrencyFromDropdown}
                />
              </PopoverContent>
            </Popover>
            <hr className="w-10 rotate-90 border-1 border-secondary m-0 p-0" />
            <Input
              type="number"
              className="w-full !p-0 !pr-3.5 border-none text-16 font-500 placeholder:text-gray-300 placeholder:text-16 leading-10 tracking-[-0.8px] text-blue-300 rounded-[5px]"
              placeholder="0.00"
              //   value={`€${currencyFromAmount}`}
              //   onChange={(e) => {
              //     const value = parseFloat(e.target.value.replace(/\D/g, ""));
              //     console.log("dsds", value, currencyFromAmount);
              //     setCurrencyFromAmount(!isNaN(value) ? value : 0);
              //   }}
              //   value={
              //     currencyFromAmount < 1
              //       ? ""
              //       : `${
              //           CurrencySignData.find(
              //             (x) => x.currency === currencyFromValue
              //           )?.currencySign
              //         }${currencyFromAmount}`
              //   }
            />
          </div>
          <div className="flex justify-between mt-3">
            <p className="text-12 font-500 leading-4 text-gray-300">
              Available 0.00
            </p>
            <span className="flex gap-x-2">
              <p className="text-12 font-500 leading-4 text-blue-300">25%</p>
              <p className="text-12 font-500 leading-4 text-blue-300">50%</p>
              <p className="text-12 font-500 leading-4 text-blue-300">100%</p>
            </span>
          </div>
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] gap-x-2 items-center my-4">
          <hr className="w-full" />
          <div className="h-10 w-10 bg-gray-100 flex justify-center items-center rounded-full">
            <UilExchange className="h-4 w-4 text-blue-300 rotate-90" />
          </div>
          <hr className="w-full" />
        </div>
        <div>
          <p className="text-12 font-500 leading-4 text-gray-300">From</p>
          <div className="bg-gray-100 rounded-[16px] flex items-center h-[52px] mt-3">
            <Popover
              open={openCurrencyFromToDropdown}
              onOpenChange={(e) => setOpenCurrencyFromToDropdown(e)}
            >
              <PopoverTrigger className="">
                <Button
                  className={`w-[110px] bg-transparent flex justify-between items-center ${
                    currencyFromToValue
                      ? "pl-3.5 pr-0 py-3"
                      : "py-[10px] pl-3.5 pr-0"
                  }`}
                  onClick={() =>
                    setOpenCurrencyFromToDropdown(!openCurrencyFromToDropdown)
                  }
                >
                  <div className="flex gap-x-2 items-center">
                    {currencyFromToValue ? (
                      <div className="h-7 w-7 rounded-full bg-blue-300 text-white flex justify-center items-center">
                        {
                          CurrencyData.find(
                            (x) => x.currency === currencyFromToValue
                          )?.currencyIcon
                        }
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-3xl bg-secondary" />
                    )}
                    <span
                      className={cn(
                        "font-700 leading-5 text-16 text-blue-300",
                        !currencyFromToValue && "text-gray-300"
                      )}
                    >
                      {currencyFromToValue
                        ? CurrencyData.find(
                            (x) => x.currency === currencyFromToValue
                          )?.currency
                        : "Select"}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "h-6 w-6 rounded-3xl bg-gray-100 flex justify-center items-center text-blue-300 rotate-180",
                      openCurrencyFromToDropdown &&
                        "bg-blue-300 text-white rotate-0"
                    )}
                  >
                    <UilAngleUp className="h-6 w-6" />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className={cn(
                  "bg-secondary/50  backdrop-blur-[16px] p-4 rounded-[16px] bottom-0 w-[300px] sm:w-[424px]"
                )}
                align="start"
                sideOffset={10}
              >
                <p className="font-500 leading-4 text-12 text-blue-300 mb-2">
                  Currency
                </p>
                <div className="relative">
                  <span className="flex justify-center absolute top-2.5 items-center text-center pl-3 pointer-events-none">
                    <UilSearch className="h-5 w-5 text-blue-300" />
                  </span>
                  <input
                    type="text"
                    id="search-assets"
                    className="input w-full leading-5 rounded-xl outline-none py-2.5 pl-10 lg:placeholder:text-16 placeholder:text-gray-300  placeholder:font-500 placeholder:font-body placeholder:text-14 text-14 lg:text-16  font-500 font-body cursor-pointer text-blue-300 bg-white/60 lg:h-fit h-10"
                    placeholder="Search"
                    required
                  />
                </div>
                <CurrencyDropdownContent
                  CurrencyData={CurrencyData}
                  setCurrencyValue={setCurrencyFromToValue}
                  setOpenCurrencyDropdown={setOpenCurrencyFromToDropdown}
                />
              </PopoverContent>
            </Popover>
            <hr className="w-10 rotate-90 border-1 border-secondary m-0 p-0" />
            <Input
              type="number"
              className="w-full !p-0 !pr-3.5 border-none text-16 font-500 placeholder:text-gray-300 placeholder:text-16 leading-10 tracking-[-0.8px] text-blue-300 rounded-[5px]"
              placeholder="0.00"
            />
          </div>
          <div className="flex justify-between mt-3">
            <p className="text-12 font-500 leading-4 text-gray-300">
              Available 0.00
            </p>
            <span className="flex gap-x-2">
              <p className="text-12 font-500 leading-4 text-blue-300">25%</p>
              <p className="text-12 font-500 leading-4 text-blue-300">50%</p>
              <p className="text-12 font-500 leading-4 text-blue-300">100%</p>
            </span>
          </div>
        </div>
        <Button
          className={cn(
            "text-16 !font-700 leading-5 px-6 py-4 mt-10 flex mx-auto",
            currencyFromValue && currencyFromToValue
              ? ""
              : "text-gray-300 bg-secondary pointer-events-none"
          )}
          onClick={() => setHandleModal(PREVIEW_EXCHANGE_CURRENCY_MODAL)}
        >
          Preview Exchange
        </Button>
      </div>
    </CustomModal>
  );
};
export default ExchangeCurrencyModal;
