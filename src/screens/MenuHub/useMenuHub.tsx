import IconBank from "@/components/icons/IconBank";
import IconCoinExchange from "@/components/icons/IconCoinExchange";
import IconCoinGrowth from "@/components/icons/IconCoinGrowth";
import IconEthereum from "@/components/icons/IconEthereum";
import IconGold from "@/components/icons/IconGold";
import IconOceanCards from "@/components/icons/IconOceanCards";
import IconShield1 from "@/components/icons/IconShield1";
import IconShield2 from "@/components/icons/IconShield2";
import { IconSwap } from "@/components/icons/IconSwap";
import IconTimeCoinDeposit from "@/components/icons/IconTimeCoinDeposit";
import IconTimeCoinWithdraw from "@/components/icons/IconTimeCoinWithdraw";
import IconTopUp from "@/components/icons/IconTopUp";
import IconTransaction from "@/components/icons/IconTransaction";
import IconTransfer from "@/components/icons/IconTransfer";
import {
  CRYPTO_DEPOSIT_MODAL,
  RECEIVE_CURRENCY_MODAL,
  SEND_CURRENCY_MODAL,
  SWAP_CRYPTO_MODAL,
  TRANSFER_CRYPTO_MODAL,
} from "@/constants";
import {
  UilCardAtm,
  UilCircleLayer,
  UilEstate,
  UilInvoice,
  UilNewspaper,
} from "@/icons";
export const useMenuHub = () => {
  const BASIC_NAVIGATION_MENU = [
    {
      name: "Home",
      icon: <UilEstate className="w-6 h-6 text-blue-300 dark:text-white" />,
      link: "/",
      openModal: "",
    },
    {
      name: "Transactions",
      icon: (
        <IconTransaction
          className="w-6 h-6 text-blue-300 dark:text-white "
          strokeWidth={0.5}
        />
      ),
      link: "/transactions",
      openModal: "",
    },
    // {
    //   name: "Notifications",
    //   icon: <UilBell className="w-6 h-6 text-blue-300 dark:text-white " />,
    //   link: "",
    //   openModal: "",
    // },
    {
      name: "News",
      icon: <UilNewspaper className="w-6 h-6 text-blue-300 dark:text-white " />,
      link: "/news-updates",
      openModal: "",
    },
  ];

  const BANK_MENU_ITEMS = [
    {
      name: "Dashboard",
      icon: (
        <IconBank className="w-6 h-6 text-blue-300 dark:text-white  group-hover:text-white" />
      ),
      link: "/neo-banking",
      openModal: "",
      hoverColor: "hover:bg-success-200/60 dark:hover:bg-success-200/60",
    },
    {
      name: "Cards",
      icon: <UilCardAtm className="w-6 h-6 text-blue-300 dark:text-white " />,
      link: "/cards",
      hoverColor: "dark:hover:bg-white/30",

      openModal: "",
    },
    {
      name: "Send",
      icon: (
        <IconTransfer
          strokeWidth={1.5}
          className="w-6 h-6 text-blue-300 dark:text-white "
        />
      ),
      link: "",
      hoverColor: "dark:hover:bg-white/30",

      openModal: SEND_CURRENCY_MODAL,
    },
    {
      name: "Receive",
      icon: (
        <IconTopUp
          strokeWidth={1.5}
          className="w-6 h-6 text-blue-300 dark:text-white "
        />
      ),
      link: "",
      hoverColor: "dark:hover:bg-white/30",

      openModal: RECEIVE_CURRENCY_MODAL,
    },
    {
      name: "Bill Payment",
      icon: <UilInvoice className="w-6 h-6 text-blue-300 dark:text-white " />,
      link: "",
      hoverColor: "dark:hover:bg-white/30",

      openModal: "",
    },
  ];
  const CRYPTO_MENU_ITEMS = [
    {
      name: "Dashboard",
      icon: (
        <IconEthereum
          strokeWidth={1.5}
          className="w-6 h-6 text-blue-300 dark:text-white  group-hover:text-white"
        />
      ),
      link: "/crypto",
      openModal: "",
      hoverColor: "hover:bg-primary/80 dark:hover:bg-primary/80",
    },
    {
      name: "Withdraw",
      icon: (
        <IconTimeCoinWithdraw
          strokeWidth={1.2}
          className="w-6 h-6 text-blue-300 dark:text-white "
        />
      ),
      link: "",
      hoverColor: "dark:hover:bg-white/30",
      openModal: TRANSFER_CRYPTO_MODAL,
    },

    {
      name: "Deposit",
      icon: (
        <IconTimeCoinDeposit
          strokeWidth={1.2}
          className="w-6 h-6 text-blue-300 dark:text-white "
        />
      ),
      link: "",
      hoverColor: "dark:hover:bg-white/30",
      openModal: CRYPTO_DEPOSIT_MODAL,
    },
    {
      name: "Swap",
      icon: <IconSwap className="w-6 h-6 text-blue-300 dark:text-white " />,
      link: "",
      hoverColor: "dark:hover:bg-white/30",
      openModal: SWAP_CRYPTO_MODAL,
    },

    {
      name: "Market",
      icon: (
        <IconCoinGrowth
          className="w-6 h-6 text-blue-300 dark:text-white "
          strokeWidth={0.7}
        />
      ),
      link: "/crypto/market-place",
      hoverColor: "",
      openModal: "",
    },
    // {
    //   name: "Yield Farming",
    //   icon: (
    //     <IconYieldFarming className="w-6 h-6 text-blue-300 dark:text-white " />
    //   ),
    //   link: "/yield-farming",
    //   openModal: "",
    //   hoverColor: "dark:hover:bg-white/30",
    // },
    {
      name: "Staking",
      icon: (
        <UilCircleLayer className="w-6 h-6 text-blue-300 dark:text-white" />
      ),
      link: "/staking",
      openModal: "",
      hoverColor: "dark:hover:bg-white/30",
    },
  ];
  const WEALTH_MENU_ITEMS = [
    {
      subName: "Wealth",
      name: "Portfolio",
      icon: (
        <IconGold className="w-6 h-6 text-blue-300 dark:text-white  group-hover:text-white" />
      ),
      link: "/wealth",
      openModal: "",
      hoverColor: "hover:bg-orange-300/80 dark:hover:bg-orange-300/80",
    },
    {
      subName: "Wealth",
      name: "Market",
      icon: <IconShield1 className="w-6 h-6 text-blue-300 dark:text-white " />,
      link: "/wealth/market-place",
      hoverColor: "dark:hover:bg-white/30",
      openModal: "",
    },
    {
      subName: "Wealth",
      name: "P2P Market",
      icon: <IconShield2 className="w-6 h-6 text-blue-300 dark:text-white " />,
      link: "/wealth/market-place",
      hoverColor: "",
      openModal: "",
    },
  ];
  const NFT_MENU_ITEMS = [
    {
      subName: "NFTs",
      name: "Dashboard",
      icon: (
        <IconOceanCards className="w-6 h-6 text-blue-300 dark:text-white  group-hover:text-white" />
      ),
      link: "",
      openModal: "",
      hoverColor: "hover:bg-purple-200/80 dark:hover:bg-purple-200/80",
    },
    {
      subName: "Escrow",
      name: "Service",
      icon: (
        <IconCoinExchange className="w-6 h-6 text-blue-300 dark:text-white " />
      ),
      link: "",
      openModal: "",
      hoverColor: "",
    },
  ];

  return {
    BASIC_NAVIGATION_MENU,
    WEALTH_MENU_ITEMS,
    CRYPTO_MENU_ITEMS,
    NFT_MENU_ITEMS,
    BANK_MENU_ITEMS,
  };
};
