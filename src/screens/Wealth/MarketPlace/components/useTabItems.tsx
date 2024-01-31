import { IconBitcoin } from "@/components/icons/IconBitcoin";
import { IconCircleLayer } from "@/components/icons/IconCircleLayer";
import { IconCryptoGrowth } from "@/components/icons/IconCryptoGrowth";
import IconEthereum from "@/components/icons/IconEthereum";
import IconShield1 from "@/components/icons/IconShield1";
import IconShield2 from "@/components/icons/IconShield2";
import { PRIMARY_MARKET, SECONDARY_MARKET } from "@/constants";
import { UilEstate } from "@/icons";
export const useTabItems = () => {
  const marketTabItems = [
    {
      tabName: "Primary Market",
      tab: PRIMARY_MARKET,
      bg: "bg-secondary",
      activeTabBg:
        "data-[state=active]:bg-blue-300 data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-blue-300",
      icon: <IconShield1 className="h-4 w-4 " />,
      tooltip: "Primary Market",
    },
    {
      tabName: "Secondary Market",
      tab: SECONDARY_MARKET,
      bg: "bg-secondary",
      activeTabBg:
        "data-[state=active]:bg-blue-300 data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-blue-300",
      icon: <IconShield2 className="h-4 w-4 " />,
      tooltip: "Coming Soon",
    },
  ];
  const tabItems = [
    {
      tabName: "All",
      tab: "all",
      tooltip: "All",
      icon: <IconCircleLayer className="h-4 w-4" />,
    },
    {
      tabName: "Real Estate",
      tab: "real-estate",
      tooltip: "Real Estate",
      icon: <UilEstate className="h-4 w-4" />,
    },
    {
      tabName: "Crypto ETFs",
      tab: "crypto-etf",
      tooltip: "Coming Soon",
      icon: <IconEthereum className="h-4 w-4" strokeWidth={1.2} />,
    },
    {
      tabName: "BTC Mining Funds",
      tab: "btc-mining-fund",
      tooltip: "Coming Soon",
      icon: <IconBitcoin className="h-4 w-4" />,
    },
    {
      tabName: "Crypto Hedge Funds",
      tab: "crypto-hedge-fund",
      tooltip: "Coming Soon",
      icon: <IconCryptoGrowth className="h-4 w-4" />,
    },
  ];

  return { marketTabItems, tabItems };
};
