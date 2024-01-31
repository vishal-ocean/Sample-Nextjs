import { UilAngleUp, UilPlus, UilQuestion } from "@/icons";

import CustomModal from "@/components/CustomModal";
import CardDropDown from "@/components/ModalDropDowns/CardDropDown";
import TokenDropDown from "@/components/ModalDropDowns/TokenDropDown";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/form/Input";
import { BUY_MODAL, CONFIRM_BUY_CRYPTO_MODAL } from "@/constants";
import { useBuyDummyLists } from "@/hooks/useBuyDummyLists";
// import { useReactSelectStyles } from "@/hooks/useReactSelectStyles";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { cn } from "@/utils";
import Image from "next/image";
import { useState } from "react";
import Select from "react-select";

const BuyCrypto = () => {
  // const { customSelectStyleWithImage } = useReactSelectStyles();
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal, setHandleModalState } = useHandleModalAction;
  const [tokenValue, setTokenValue] = useState("BTC");
  const [cardValue, setCardValue] = useState("");
  const [openCardDropdown, setOpenCardDropdown] = useState(false);
  const [openTokenDropdown, setOpenTokenDropdown] = useState(false);
  const { TokenDropdownItems, CardList } = useBuyDummyLists();

  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? BUY_MODAL : "");
    setHandleModalState(false);
  };
  const currencyOptions = [
    { value: "usd", label: "USD" },
    { value: "euro", label: "Euro" },
  ];

  const [currency, setCurrency] = useState<any>({});

  const screenWidth = window.screen.width;

  return (
    <>
      <CustomModal
        open={modalOpen == BUY_MODAL}
        onOpenChange={handleOpenChange}
        className="p-5 max-w-[520px]  md:translate-y-[-56%]"
      >
        <div className="flex sm:flex-row flex-col sm:gap-y-0 gap-y-5 sm:justify-between">
          <div className="flex gap-x-2 items-center">
            <span className="bg-success-200 rounded-3xl h-10 w-10 flex justify-center items-center">
              <UilPlus className="h-4 w-4 text-white" />
            </span>
            <span className="text-12 text-blue-300 font-500 leading-4">
              Buy Crypto
            </span>
          </div>
        </div>
        <div className="sm:px-7 flex flex-col">
          <span className="text-24 text-blue-300 font-500 mt-5 sm:mt-6 whitespace-break-spaces text-center leading-7">
            How much do you want to buy?
          </span>
          <div className="flex justify-center mt-8 sm:mt-10 relative">
            <div className="absolute top-0 right-10">
              <Select
                value={currency}
                onChange={setCurrency}
                options={currencyOptions}
                // styles={currencySelectInputStyle}
              />
            </div>
            <Input
              type="text"
              className="w-full !p-0 border-none text-40 font-500 placeholder:text-secondary placeholder:text-40 leading-10 tracking-[-0.8px] text-blue-300 text-center"
              placeholder="€0.00"
              required
            />
          </div>
          <div className="mt-12 flex flex-col">
            <div className="flex justify-between">
              <span className="text-12 text-gray-300 font-500 leading-4">
                You receive
              </span>
              <div className="flex gap-x-2">
                <Image
                  width={16}
                  height={16}
                  alt="icon"
                  src="/images/svg/icon-BTC.svg"
                />
                <span className="text-12 font-500 text-gray-300 leading-4">
                  BTC 0.00
                </span>
              </div>
            </div>
            <hr className="my-3 border-1 border-secondary" />
            <div className="flex justify-between">
              <span className="text-12 text-gray-300 font-500 leading-4">
                Exchange Rate
              </span>

              <span className="text-12 font-500 text-blue-300 leading-4">
                1 BTC = 29399.40 USD
              </span>
            </div>
            <hr className="my-3 border-1 border-secondary" />
            <div className="flex justify-between">
              <span className="text-12 text-gray-300 font-500 leading-4">
                Cashback included
              </span>
              <span className="text-12 font-500 text-primary leading-4">
                0.50% in USD
              </span>
            </div>
          </div>
          <div className="mt-8 sm:mt-12">
            <div className="flex gap-x-1">
              <span className="font-500 text-12 text-gray-300  leading-4">
                Receive
              </span>
              <span className="flex justify-center items-center bg-secondary h-4 w-4 rounded-full">
                <UilQuestion className="h-4 w-4 fill-white" />
              </span>
            </div>
            <div className="flex flex-col">
              <Button
                className="p-[14px] w-full sm:max-w-[396px] max-w-[320px] mt-3 rounded-[16px] bg-gray-100 flex justify-between items-center"
                onClick={() => setOpenTokenDropdown(!openTokenDropdown)}
              >
                <div className="flex gap-x-2 items-center">
                  {tokenValue &&
                    TokenDropdownItems.find((x) => x.value === tokenValue)
                      ?.img && (
                      <Image
                        width={24}
                        height={24}
                        src={
                          TokenDropdownItems.find((x) => x.value === tokenValue)
                            ?.img || ""
                        }
                        alt="image"
                      />
                    )}
                  <span className="font-700 leading-5 text-16 text-blue-300">
                    {tokenValue &&
                      TokenDropdownItems.find((x) => x.value === tokenValue)
                        ?.value}
                  </span>
                </div>
                <div
                  className={cn(
                    "h-6 w-6 rounded-3xl bg-gray-100 flex justify-center items-center text-blue-300 rotate-180",
                    openTokenDropdown && "bg-blue-300 text-white rotate-0"
                  )}
                >
                  <UilAngleUp className="h-6 w-6" />
                </div>
              </Button>
              <TokenDropDown
                openTokenDropdown={openTokenDropdown}
                setOpenTokenDropdown={setOpenTokenDropdown}
                tokenValue={tokenValue}
                setTokenValue={setTokenValue}
                className="mt-0"
                align={"center"}
                networkValue={""}
              />
            </div>
            <span className="mt-5 font-500 text-12 text-gray-300 flex gap-x-1 leading-4">
              Pay With
            </span>
            <div className="flex flex-col">
              <Button
                className="p-[14px] w-full sm:max-w-[396px] max-w-[320px] mt-3 rounded-[16px] bg-gray-100 flex justify-between items-center"
                onClick={() => setOpenCardDropdown(!openCardDropdown)}
              >
                <div className="flex gap-x-2 items-center">
                  {cardValue ? (
                    CardList.find((x) => x.value === cardValue)?.img && (
                      <Image
                        width={24}
                        height={24}
                        src={
                          CardList.find((x) => x.value === cardValue)?.img || ""
                        }
                        alt="image"
                      />
                    )
                  ) : (
                    <div className="w-6 h-6 rounded-3xl bg-secondary" />
                  )}
                  <span
                    className={cn(
                      "font-700 leading-5 text-16 text-blue-300",
                      !cardValue && "text-gray-300"
                    )}
                  >
                    {cardValue
                      ? CardList.find((x) => x.value === cardValue)?.value
                      : "Select"}
                  </span>
                </div>
                <div
                  className={cn(
                    "h-6 w-6 rounded-3xl bg-gray-100 flex justify-center items-center text-blue-300 rotate-180",
                    openCardDropdown && "bg-blue-300 text-white rotate-0"
                  )}
                >
                  <UilAngleUp className="h-6 w-6" />
                </div>
              </Button>
              <CardDropDown
                openCardDropdown={openCardDropdown}
                setOpenCardDropdown={setOpenCardDropdown}
                cardValue={cardValue}
                setCardValue={setCardValue}
              />
            </div>
          </div>
          <Button
            className={cn(
              "bg-secondary mt-6 sm:mt-11 w-max mb-1 sm:mb-6 leading-5 text-gray-300 font-700 self-center",
              "bg-primary text-white"
            )}
            onClick={() => setHandleModal(CONFIRM_BUY_CRYPTO_MODAL)}
          >
            Preview Buy
          </Button>
        </div>
      </CustomModal>
    </>
  );
};

export default BuyCrypto;
