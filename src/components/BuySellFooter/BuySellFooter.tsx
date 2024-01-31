"use client";
import { UilAngleLeft, UilMinus, UilPlus } from "@/icons";
import { useEffect, useState } from "react";

import { FooterContainer } from "@/components/Portal";
import {
  ADD_NEW_CARD_MODAL,
  BUY_CRYPTO_LISTING,
  BUY_MODAL,
  BUY_SWAP_SUCCESS_MODAL,
  CONFIRM_BUY_CRYPTO_MODAL,
  CONFIRM_SELL_CRYPTO_MODAL,
  CRYPTO_SELL_LISTING_MODAL,
  SELL_MODAL,
  SELL_SWAP_SUCCESS_MODAL,
} from "@/constants";
import AddNewCard from "@/screens/Buy/AddNewCard";
import BuyCrypto from "@/screens/Buy/Buy";
import BuyCryptoListing from "@/screens/Buy/BuyCryptoListing";
import BuySuccessModal from "@/screens/Buy/BuySuccessModal";
import ConfirmBuyCrypto from "@/screens/Buy/ConfirmBuyCrypto";
import ConfirmSellCrypto from "@/screens/Sell/ConfirmSellCrypto";
import SellCrypto from "@/screens/Sell/Sell";
import SellCryptoListing from "@/screens/Sell/SellCryptoListing";
import SellSuccessModal from "@/screens/Sell/SellSuccessModal";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { cn } from "@/utils";

type Direction = "up" | "down";

const BUY_MODALS = [
  BUY_MODAL,
  ADD_NEW_CARD_MODAL,
  CONFIRM_BUY_CRYPTO_MODAL,
  BUY_SWAP_SUCCESS_MODAL,
  BUY_CRYPTO_LISTING,
];
const SELL_MODALS = [
  SELL_MODAL,
  CRYPTO_SELL_LISTING_MODAL,
  CONFIRM_SELL_CRYPTO_MODAL,
  SELL_SWAP_SUCCESS_MODAL,
];

const BuySellFooter = () => {
  const [scrollDirection, setScrollDirection] = useState<Direction>("up");
  const { modalOpen, isFooterModal } = useHandleModalStore();
  const { setHandleModalState } = useHandleModalAction;

  useEffect(() => {
    setHandleModalState([...BUY_MODALS, ...SELL_MODALS].includes(modalOpen));
  }, [modalOpen]);
  useEffect(() => {
    let lastScrollY = document.documentElement.scrollTop;

    const updateScrollDirection = () => {
      const scrollY = document.documentElement.scrollTop;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 1 || scrollY - lastScrollY < -1)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection);
    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, [scrollDirection]);

  return (
    <>
      {isFooterModal && (
        <FooterContainer>
          <div
            className={cn(
              "fixed pb-6 pt-1 left-0 right-0 transition-all duration-200 sm:max-w-[368px] mx-auto flex justify-center items-center gap-x-2 z-[60]",
              scrollDirection === "down" ? "-bottom-24" : " bottom-0",
              modalOpen.length > 0 && "bottom-0 md:flex hidden"
            )}
          >
            <div
              className={cn(
                "flex justify-center items-center gap-x-2 bg-white/40 rounded-3xl p-2 backdrop-blur-[10px] h-[68px]",
                modalOpen.length > 0 && "shadow-lg"
              )}
            >
              <div className="bg-secondary rounded-3xl h-[52px] w-[52px] flex items-center justify-center cursor-pointer !p-0">
                <UilAngleLeft className="h-6 w-6 font-700 text-blue-300" />
              </div>

              <div
                className={cn(
                  "h-[52px] w-[52px] flex justify-center items-center cursor-pointer !p-0",
                  BUY_MODALS.includes(modalOpen)
                    ? "bg-success-200 rounded-3xl"
                    : ""
                )}
              >
                <UilPlus
                  className={cn(
                    "h-6 w-6 font-700",
                    SELL_MODALS.includes(modalOpen)
                      ? "text-blue-300"
                      : "text-white"
                  )}
                />
              </div>
              <div
                className={cn(
                  "h-[52px] w-[52px] flex justify-center items-center cursor-pointer !p-0",
                  SELL_MODALS.includes(modalOpen)
                    ? "bg-danger-100 rounded-3xl"
                    : ""
                )}
              >
                <UilMinus
                  className={cn(
                    "h-6 w-6 font-700",
                    SELL_MODALS.includes(modalOpen)
                      ? "text-white"
                      : "text-blue-300"
                  )}
                />
              </div>
            </div>
          </div>
        </FooterContainer>
      )}

      {modalOpen === BUY_MODAL && <BuyCrypto />}
      {modalOpen === ADD_NEW_CARD_MODAL && <AddNewCard />}
      {modalOpen === CONFIRM_BUY_CRYPTO_MODAL && <ConfirmBuyCrypto />}
      {modalOpen === BUY_SWAP_SUCCESS_MODAL && <BuySuccessModal />}
      {modalOpen === BUY_CRYPTO_LISTING && <BuyCryptoListing />}
      {modalOpen === SELL_MODAL && <SellCrypto />}
      {modalOpen === CRYPTO_SELL_LISTING_MODAL && <SellCryptoListing />}
      {modalOpen === CONFIRM_SELL_CRYPTO_MODAL && <ConfirmSellCrypto />}
      {modalOpen === SELL_SWAP_SUCCESS_MODAL && <SellSuccessModal />}
    </>
  );
};

export default BuySellFooter;
