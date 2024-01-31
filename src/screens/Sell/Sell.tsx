import CustomModal from "@/components/CustomModal";
import TokenDropDown from "@/components/ModalDropDowns/TokenDropDown";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/form/Input";
import { CONFIRM_SELL_CRYPTO_MODAL, SELL_MODAL } from "@/constants";
import { useBuyDummyLists } from "@/hooks/useBuyDummyLists";
// import { useReactSelectStyles } from "@/hooks/useReactSelectStyles";
import { UilAngleUp, UilMinus, UilQuestion } from "@/icons";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { cn } from "@/utils";
import Image from "next/image";
import { useState } from "react";

const SellCrypto = () => {
  // const { customSelectStyleWithImage } = useReactSelectStyles();
  const [openTokenDropdown, setOpenTokenDropdown] = useState(false);
  const [tokenValue, setTokenValue] = useState("USDT");
  const [BTCValue, setBTCValue] = useState("");
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal, setHandleModalState } = useHandleModalAction;
  const { TokenDropdownItems } = useBuyDummyLists();
  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? SELL_MODAL : "");
    setHandleModalState(false);
  };

  return (
    <>
      <CustomModal
        open={modalOpen == SELL_MODAL}
        onOpenChange={handleOpenChange}
        className="p-5 max-w-[520px]"
      >
        <div className="flex gap-x-2 items-center">
          <span className="bg-secondary rounded-3xl h-10 w-10 flex justify-center items-center">
            <UilMinus className="h-4 w-4 text-blue-300" />
          </span>
          <span className="text-12 text-blue-300 font-500 leading-4">
            Sell Crypto
          </span>
        </div>
        <div className="sm:px-7 flex flex-col">
          <span className="text-24 text-blue-300 font-500 text-center mt-5 sm:mt-6  leading-7">
            How much do you want to sell?
          </span>
          <div className="grid grid-cols-2 mt-10 gap-x-2">
            <Input
              type="text"
              className="p-0 pr-0.5 border-none text-right h-10 text-40 font-500 placeholder:text-gray-300 placeholder:text-40 rounded-none leading-10 tracking-[-0.8px] text-blue-300"
              placeholder="0.00"
              required
              onChange={(e) => setBTCValue(e.target.value)}
            />
            <p className="text-40 font-500 leading-10 tracking-[-0.8px] text-gray-300">
              BTC
            </p>
          </div>

          <div className="flex justify-between mt-12">
            <p className="text-gray-300 text-12 font-500 leading-4">
              Available
            </p>
            <div className="flex gap-x-2">
              <Image
                width={16}
                height={16}
                alt="icon"
                src="/images/svg/icon-BTC.svg"
              />
              <span className="text-12 font-500 text-gray-300 leading-4">
                BTC <strong className="text-blue-300">7.528</strong>
              </span>
            </div>
          </div>
          <hr className="text-secondary my-3" />

          <div className="flex justify-between">
            <p className="text-gray-300 text-12 font-500 leading-4">
              You recieve
            </p>
            <div className="flex gap-x-2">
              <Image
                width={16}
                height={16}
                alt="icon"
                src="/images/svg/icon-USDT.svg"
              />
              <span className="text-12 font-500 text-gray-300 leading-4">
                USDT 0.00
              </span>
            </div>
          </div>
          <hr className="text-secondary my-3" />
          <div className="flex justify-between">
            <p className="text-gray-300 text-12 font-500 leading-4">
              Exchange Rate
            </p>
            <p className="text-blue-300 text-12 font-500 leading-4">
              1 BTC = 29399.40 USDT
            </p>
          </div>
          <div className="mt-10">
            <span className=" font-500 text-12 text-gray-300 flex gap-x-1 leading-4">
              Receive
              <span className="flex justify-center items-center bg-secondary h-4 w-4 rounded-full">
                <UilQuestion className="h-4 w-4 fill-white" />
              </span>
            </span>
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
                align="center"
                networkValue={""}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              className={cn(
                "bg-secondary mt-6 sm:mt-11 w-max mb-1 sm:mb-6 leading-5 text-gray-300 font-700",
                BTCValue ? "bg-primary text-white" : "pointer-events-none "
              )}
              onClick={() => setHandleModal(CONFIRM_SELL_CRYPTO_MODAL)}
            >
              Preview Exchange
            </Button>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default SellCrypto;
