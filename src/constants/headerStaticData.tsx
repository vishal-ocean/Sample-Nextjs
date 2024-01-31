import PendingLoader from "@/components/UI/PendingLoader";
import IconBank from "@/components/icons/IconBank";
import { IconBolt } from "@/components/icons/IconBolt";
import IconCoinExchange from "@/components/icons/IconCoinExchange";
import IconGold from "@/components/icons/IconGold";
import IconOceanCard from "@/components/icons/IconOceanCard";
import IconShield1 from "@/components/icons/IconShield1";
import { IconStaking } from "@/components/icons/IconStaking";
import { IconStar2 } from "@/components/icons/IconStar2";
import { IconSwap } from "@/components/icons/IconSwap";
import IconTimeCoinDeposit from "@/components/icons/IconTimeCoinDeposit";
import IconTimeCoinWithdraw from "@/components/icons/IconTimeCoinWithdraw";
import {
  CRYPTO_DEPOSIT_MODAL,
  SWAP_CRYPTO_MODAL,
  TRANSFER_CRYPTO_MODAL,
} from "@/constants";
import {
  UilBell,
  UilCheckCircle,
  UilCircleLayer,
  UilCompass,
  UilDollarAlt,
  UilShieldCheck,
  UilTimes,
  UilTrophy,
} from "@/icons";

type NavigationItem = {
  name: string;
  icon: JSX.Element;
  link: string;
  openModal?: string;
};

export const AllMenuList: { [key: string]: NavigationItem[] } = {
  Neobanking: [
    {
      name: "Dashboard",
      icon: <IconBank strokeWidth={1.5} className="h-4 w-4" />,
      link: "/neo-banking",
    },
    //   {
    //     name: "Send",
    //     icon: <IconTimeCoinWithdraw className="h-4 w-4" />,
    //     link: "",
    //     openModal: SEND_CURRENCY_MODAL,
    //   },
    //   {
    //     name: "Receive",
    //     icon: <IconTimeCoinDeposit className="h-4 w-4" />,
    //     link: "",
    //     openModal: RECEIVE_CURRENCY_MODAL,
    //   },
    // {
    //   name: "Bill Payment",
    //   icon: <UilInvoice className="h-4 w-4" />,
    //   link: "",
    // },
  ],
  Crypto: [
    {
      name: "Dashboard",
      icon: <IconBank strokeWidth={1.5} className="h-4 w-4" />,
      link: "/crypto",
    },
    {
      name: "Withdraw",
      icon: <IconTimeCoinWithdraw className="h-4 w-4" strokeWidth={1.5} />,
      link: "",
      openModal: TRANSFER_CRYPTO_MODAL,
    },
    {
      name: "Deposit",
      icon: <IconTimeCoinDeposit className="h-4 w-4" strokeWidth={1.5} />,
      link: "",
      openModal: CRYPTO_DEPOSIT_MODAL,
    },
    {
      name: "Swap",
      icon: <IconSwap className="h-4 w-4" />,
      link: "",
      openModal: SWAP_CRYPTO_MODAL,
    },

    // {
    //   name: "Yield Farming",
    //   icon: <IconYieldFarming className="h-4 w-4" />,
    //   link: "/yield-farming",
    // },
    {
      name: "Staking",
      icon: <UilCircleLayer className="h-4 w-4" />,
      link: "/staking",
    },
    // {
    //   name: "Market",
    //   icon: <IconBank strokeWidth={1.5} className="h-4 w-4" />,
    //   link: "/crypto/market-place",
    // },
  ],
  Wealth: [
    {
      name: "Portfolio",
      icon: <IconGold className="h-4 w-4" strokeWidth={1.2} />,
      link: "/wealth",
    },
    {
      name: "Primary Market",
      icon: <IconShield1 className="h-4 w-4" />,
      link: "/wealth/market-place",
    },
  ],
  NFTs: [
    {
      name: "NFTs",
      icon: <IconOceanCard className="h-4 w-4" strokeWidth={1} />,
      link: "",
    },
    {
      name: "Escrow",
      icon: <IconCoinExchange className="h-4 w-4" />,
      link: "",
    },
  ],
};

export const NeoBanking: NavigationItem[] = [
  {
    name: "Dashboard",
    icon: <IconBank strokeWidth={1.5} className="h-4 w-4" />,
    link: "/neo-banking",
  },
  //   {
  //     name: "Send",
  //     icon: <IconTimeCoinWithdraw className="h-4 w-4" />,
  //     link: "",
  //     openModal: SEND_CURRENCY_MODAL,
  //   },
  //   {
  //     name: "Receive",
  //     icon: <IconTimeCoinDeposit className="h-4 w-4" />,
  //     link: "",
  //     openModal: RECEIVE_CURRENCY_MODAL,
  //   },
  // {
  //   name: "Bill Payment",
  //   icon: <UilInvoice className="h-4 w-4" />,
  //   link: "",
  // },
];
export const Crypto = [
  {
    name: "Dashboard",
    icon: <IconBank strokeWidth={1.5} className="h-4 w-4" />,
    link: "/crypto",
  },
  {
    name: "Withdraw",
    icon: <IconTimeCoinWithdraw className="h-4 w-4" strokeWidth={1.5} />,
    link: "",
    openModal: TRANSFER_CRYPTO_MODAL,
  },
  {
    name: "Deposit",
    icon: <IconTimeCoinDeposit className="h-4 w-4" strokeWidth={1.5} />,
    link: "",
    openModal: CRYPTO_DEPOSIT_MODAL,
  },
  {
    name: "Swap",
    icon: <IconSwap className="h-4 w-4" />,
    link: "",
    openModal: SWAP_CRYPTO_MODAL,
  },
  // {
  //   name: "Yield Farming",
  //   icon: <IconYieldFarming className="h-4 w-4" strokeWidth={1.5} />,
  //   link: "/yield-farming",
  // },
  {
    name: "Staking",
    icon: <IconStaking className="h-4 w-4" />,
    link: "/staking",
  },
  // {
  //   name: "Market",
  //   icon: <IconBank strokeWidth={1.5} className="h-4 w-4" />,
  //   link: "/crypto/market-place",
  // },
];
export const Wealth = [
  {
    name: "Portfolio",
    icon: <IconGold className="h-4 w-4" strokeWidth={1.2} />,
    link: "/wealth",
  },
  {
    name: "Primary Market",
    icon: <IconShield1 className="h-4 w-4" />,
    link: "/wealth/market-place",
  },
];
export const NFTs = [
  {
    name: "NFTs",
    icon: <IconOceanCard className="h-4 w-4" strokeWidth={1} />,
    link: "",
  },
  {
    name: "Escrow",
    icon: <IconCoinExchange className="h-4 w-4" />,
    link: "",
  },
];

type NotificationStyleIcon = {
  icon: JSX.Element;
  iconBgClass?: string;
  textClass?: string;
};

type NotificationStyleIcons = {
  [key: string]: NotificationStyleIcon;
};

export const getNotificationStyleIcons: NotificationStyleIcons = {
  neutral: {
    icon: <UilBell className="w-4 h-4 text-gray-300" />,
    iconBgClass: "bg-blue-300/10",
    textClass: "text-blue-300",
  },
  crypto: {
    icon: <UilCircleLayer className="w-4 h-4 text-primary" />,
    iconBgClass: "bg-primary/10",
    textClass: "text-primary",
  },
  wealth: {
    icon: <IconGold strokeWidth={1.2} className="w-4 h-4 text-orange-300" />,
    iconBgClass: "bg-orange-300/10",
    textClass: "text-orange-300",
  },
  neoBanking: {
    icon: <UilDollarAlt className="w-4 h-4 text-success-100" />,
    iconBgClass: "bg-success-100/10",
    textClass: "text-success-200",
  },
  pending: {
    icon: <PendingLoader />,
  },
  completed: {
    icon: <UilCheckCircle className="w-4 h-4 text-success-200" />,
  },
  failed: {
    icon: <UilTimes className="w-4 h-4 text-danger-100" />,
  },
  error: {
    icon: <UilTimes className="w-4 h-4 text-danger-100" />,
  },
};

export const Tier = [
  {
    currentTier: false,
    tierName: "starter",
    tierIcon: <IconBolt className="w-4 h-4 " />,
    bgColor: "bg-secondary",
    bgSecondary: "bg-blue-300",
    borderColor: "ring-blue-300",
    textColor: "text-white",
    currentWave: 2500,
    wave: 2500,
    benefits: ["1", "1", "1", "5"],
    bgImage: "/images/starter-header-banner.png",
    background: "/images/starter-bg.png",
  },
  {
    currentTier: false,
    tierName: "explorer",
    tierIcon: <UilCompass className="w-4 h-4 " />,
    bgColor: "bg-success-800",
    borderColor: "ring-success-800",
    textColor: "text-success-800",
    currentWave: 25000,
    wave: 25000,
    benefits: ["0.75", "3", "1", "25"],
    bgImage: "/images/explorer-header-banner.png",
    background: "/images/explorer-bg.png",
  },
  {
    currentTier: true,
    tierName: "pioneer",
    tierIcon: <IconStar2 className="w-4 h-4 " />,
    bgColor: "bg-orange-500",
    borderColor: "ring-orange-500",
    textColor: "text-orange-500",
    currentWave: 15500,
    wave: 25000,
    benefits: ["0.5", "5", "0.75", "50"],
    bgImage: "/images/pioneer-header-banner.png",
    background: "/images/pioneer-bg.png",
  },
  {
    currentTier: false,
    tierName: "warrior",
    tierIcon: <UilShieldCheck className="w-4 h-4 " />,
    bgColor: "bg-purple-700",
    borderColor: "ring-purple-700",
    textColor: "text-purple-700",
    currentWave: 40000,
    wave: 50000,
    benefits: ["0.5", "5", "0.75", "75"],
    bgImage: "/images/warrior-header-banner.png",
    background: "/images/warrior-bg.png",
  },
  {
    currentTier: false,
    tierName: "elite",
    tierIcon: <UilTrophy className="w-4 h-4 " />,
    bgColor: "bg-primary",
    borderColor: "ring-primary",
    textColor: "text-primary",
    currentWave: 150000,
    wave: 250000,
    benefits: ["0.25", "25", "0.25", "100"],
    bgImage: "/images/elite-header-banner.png",
    background: "/images/elite-bg.png",
  },
];
