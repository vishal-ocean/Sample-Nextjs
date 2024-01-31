import IconTimeCoinDeposit from "@/components/icons/IconTimeCoinDeposit";
import IconTimeCoinWithdraw from "@/components/icons/IconTimeCoinWithdraw";
import {
  CRYPTO_TRANSACTION_DETAILS_MODAL,
  WEALTH_TRANSACTION_DETAILS_MODAL,
} from "@/constants";
import {
  UilArrowCircleDown,
  UilChartPieAlt,
  UilExchange,
  UilMinus,
  UilPlus,
} from "@/icons";

type TabItem = {
  tabName: string;
  tab: string;
  bg: string;
  activeTabBg: string;
};

export const useTransfer = () => {
  const tabItems: TabItem[] = [
    {
      tabName: "All",
      tab: "all",
      bg: "bg-white",
      activeTabBg:
        "data-[state=active]:bg-blue-300 dark:data-[state=active]:bg-white",
    },
    {
      tabName: "Crypto",
      tab: "crypto",
      bg: "bg-primary",
      activeTabBg: "data-[state=active]:bg-primary",
    },
    {
      tabName: "Wealth",
      tab: "wealth",
      bg: "bg-orange-300",
      activeTabBg: "data-[state=active]:bg-orange-300",
    },
    {
      tabName: "Neo Banking",
      tab: "neoBanking",
      bg: "bg-success-100",
      activeTabBg: "data-[state=active]:bg-success-100",
    },
  ];
  const getCryptoIcon: { [key: string]: JSX.Element } = {
    topup: <IconTimeCoinDeposit className="w-4 h-4" />,
    deposit: <IconTimeCoinDeposit className="w-4 h-4" />,
    swap: <UilExchange className="w-4 h-4" />,
    withdrawal: <IconTimeCoinWithdraw className="w-4 h-4" />,
    buy: <UilPlus className="w-4 h-4" />,
    sell: <UilMinus className="w-4 h-4" />,
  };
  const getWealthIcon: { [key: string]: JSX.Element } = {
    primaryInvestment: <UilChartPieAlt className="w-4 h-4" />,
    secondaryInvestment: <UilExchange className="w-4 h-4" />,
    earnings: <UilArrowCircleDown className="w-4 h-4" />,
  };
  const getModalType: { [key: string]: string } = {
    crypto: CRYPTO_TRANSACTION_DETAILS_MODAL,
    wealth: WEALTH_TRANSACTION_DETAILS_MODAL,
  };
  const getCryptoModalTitle: { [key: string]: string } = {
    TopUp: "Deposit",
    buy: "Buy",
    sell: "Sell",
    swap: "Swap",
    transfer: "Transfer",
  };
  const getWealthModalTitle: {
    [key: string]: { title: string; subText: string };
  } = {
    primaryInvestment: {
      title: "Invested in Project 79",
      subText: "Primary Investment",
    },
    secondaryInvestment: {
      title: "Offer, P79 to USDT",
      subText: "Secondary Investment",
    },
    earnings: {
      title: "Earning from P79",
      subText: "Rental Income",
    },
  };
  return {
    tabItems,
    getCryptoIcon,
    getWealthIcon,
    getModalType,
    getCryptoModalTitle,
    getWealthModalTitle,
  };
};
