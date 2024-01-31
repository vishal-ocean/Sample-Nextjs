import IconShield1 from "@/components/icons/IconShield1";
import IconShield2 from "@/components/icons/IconShield2";
import { IconSwap } from "@/components/icons/IconSwap";
import IconTimeCoinDeposit from "@/components/icons/IconTimeCoinDeposit";
import IconTimeCoinWithdraw from "@/components/icons/IconTimeCoinWithdraw";
import { UilCircleLayer, UilMinus, UilPlus } from "@/icons";
export const useFilterSection = () => {
  const AssetsDropdownItems = [
    {
      name: "All Types",
      value: "all",
      icon: <UilCircleLayer className="h-4 w-4" />,
    },
    {
      name: "Bitcoin (BTC)",
      value: "BTC",
      img: "/images/svg/icon-BTC.svg",
    },
    {
      name: "Tether (USDT)",
      value: "USDT",
      img: "/images/svg/icon-USDT.svg",
    },
    {
      name: "Ethereum (ETH)",
      value: "ETH",
      img: "/images/svg/icon-ETH.svg",
    },
    {
      name: "Bitcoin (BTC)",
      value: "BTC1",
      img: "/images/svg/icon-BTC.svg",
    },
    {
      name: "Tether (USDT)",
      value: "USDT1",
      img: "/images/svg/icon-USDT.svg",
    },
    {
      name: "Ethereum (ETH)",
      value: "ETH1",
      img: "/images/svg/icon-ETH.svg",
    },
    {
      name: "Bitcoin (BTC)",
      value: "BTC2",
      img: "/images/svg/icon-BTC.svg",
    },
    {
      name: "Tether (USDT)",
      value: "USDT2",
      img: "/images/svg/icon-USDT.svg",
    },
    {
      name: "Ethereum (ETH)",
      value: "ETH2",
      img: "/images/svg/icon-ETH.svg",
    },
  ];
  const TransactionTypeDropdownItems = [
    {
      name: "All Types",
      value: "All",
      icon: <UilCircleLayer className="h-4 w-4" />,
      disabled: false,
    },
    {
      name: "Deposit",
      value: "Deposit",
      icon: <IconTimeCoinDeposit strokeWidth={1.2} className="h-4 w-4" />,
      disabled: false,
    },
    {
      name: "Withdraw",
      value: "Withdrawal1",
      icon: <IconTimeCoinWithdraw className="h-4 w-4" strokeWidth={1.2} />,
      disabled: false,
    },
    {
      name: "Swap",
      value: "swap",
      icon: <IconSwap className="h-4 w-4" />,
      disabled: true,
    },
    {
      name: "Buy",
      value: "buy",
      icon: <UilPlus className="h-4 w-4" />,
      disabled: true,
    },
    {
      name: "Sell",
      value: "sell",
      icon: <UilMinus className="h-4 w-4" />,
      disabled: true,
    },
    {
      name: "Primary Investing",
      value: "primaryInvesting",
      icon: <IconShield1 className="h-4 w-4" />,
      disabled: true,
    },
    {
      name: "Secondary Investing",
      value: "secondaryInvesting",
      icon: <IconShield2 className="h-4 w-4" />,
      disabled: true,
    },
  ];

  const formatDate = (timestamp: any) => {
    const month = String(timestamp?.getMonth() + 1).padStart(2, "0"); // Adding 1 to get the correct month (0-indexed)
    const day = String(timestamp?.getDate()).padStart(2, "0");
    const year = timestamp?.getFullYear();
    return `${month}.${day}.${year}`;
  };

  return {
    AssetsDropdownItems,
    TransactionTypeDropdownItems,
    formatDate,
  };
};
