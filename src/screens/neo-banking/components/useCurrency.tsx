import { IconPound } from "@/components/icons/IconPound";
import { IconSwap } from "@/components/icons/IconSwap";
import IconTopUp from "@/components/icons/IconTopUp";
import IconTransfer from "@/components/icons/IconTransfer";
import {
  ACCOUNT_DETAIL_MODAL,
  EXCHANGE_CURRENCY_MODAL,
  RECEIVE_CURRENCY_MODAL,
  SEND_CURRENCY_MODAL,
} from "@/constants";
import { UilDollarAlt, UilEuro, UilInvoice } from "@/icons";
import { useUser } from "@auth0/nextjs-auth0/client";
const HEADERS = ["Currency", "Balance", ""];
export const useCurrency = () => {
  const { user } = useUser();
  const CurrencyData = [
    {
      currencyName: "Euro",
      currency: "EUR",
      currencyIcon: <UilEuro className="h-4 w-4" />,
      balance: "€0",
    },
    {
      currencyName: "US Dollar",
      currency: "USD",
      currencyIcon: <UilDollarAlt className="h-5 w-5" />,
      balance: "$1040",
      balanceInEuro: "€25540",
    },
    {
      currencyName: "Pound Sterling",
      currency: "GBP",
      currencyIcon: <IconPound className="h-4 w-4" />,
      balance: "£10.00",
      balanceInEuro: "€10.00",
    },
  ];
  const Action = [
    {
      icon: <UilInvoice className="h-4 w-4 " />,
      name: "Account Details",
      modalOpen: ACCOUNT_DETAIL_MODAL,
    },
    {
      icon: <IconTopUp className="h-4 w-4 " strokeWidth={2} />,
      name: "Receive",
      modalOpen: RECEIVE_CURRENCY_MODAL,
    },
    {
      icon: <IconTransfer strokeWidth={2} className="h-4 w-4 " />,
      name: "Send",
      modalOpen: SEND_CURRENCY_MODAL,
    },

    {
      icon: <IconSwap className="h-4 w-4 " />,
      name: "Exchange",
      modalOpen: EXCHANGE_CURRENCY_MODAL,
    },
  ];
  return { CurrencyData, Action };
};
