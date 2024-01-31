"use client";
import {
  BUY_MODAL,
  CRYPTO_DEPOSIT_MODAL,
  SELL_MODAL,
  SWAP_CRYPTO_MODAL,
  TRANSFER_CRYPTO_MODAL,
} from "@/constants";
import {
  UilArrowCircleDown,
  UilExchange,
  UilLocationArrow,
  UilMinusCircle,
  UilPlusCircle,
} from "@/icons";
export const useTradeDropDownList = () => {
  const TRADE_DROPDOWN_LIST = [
    {
      name: "Buy",
      openModal: BUY_MODAL,
      ItemIcon: <UilPlusCircle className="w-4 h-4 text-blue-300" />,
    },
    {
      name: "Sell",
      openModal: SELL_MODAL,
      ItemIcon: <UilMinusCircle className="w-4 h-4 text-blue-300" />,
    },
    {
      name: "Swap",
      openModal: SWAP_CRYPTO_MODAL,
      ItemIcon: <UilExchange className="w-4 h-4 text-blue-300" />,
    },
    {
      name: "Top Up",
      openModal: CRYPTO_DEPOSIT_MODAL,
      ItemIcon: <UilArrowCircleDown className="w-4 h-4 text-blue-300" />,
    },
    {
      name: "Transfer",
      openModal: TRANSFER_CRYPTO_MODAL,
      ItemIcon: <UilLocationArrow className="w-4 h-4 text-blue-300" />,
    },
  ];
  return { TRADE_DROPDOWN_LIST };
};
