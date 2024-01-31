import { UilCircleLayer } from "@/icons";
import Image from "next/image";

export const useYieldStaticData = () => {
  const AssetsDropdownItems = [
    {
      assetsName: "All Assets",
      assets: "All Assets",
      assetsIcon: <UilCircleLayer className="h-4 w-4" />,
    },
    {
      assetsName: "Ethereum",
      assets: "ETH",
      assetsIcon: (
        <Image
          src={"/images/svg/icon-ETH.svg"}
          height={16}
          width={16}
          alt=""
          className="h-4 w-4 rounded-full"
        />
      ),
    },
    {
      assetsName: "Bitcoin",
      assets: "BTC",
      assetsIcon: (
        <Image
          src={"/images/svg/icon-BTC.svg"}
          height={16}
          width={16}
          alt=""
          className="h-4 w-4 rounded-full"
        />
      ),
    },
    {
      assetsName: "Tether",
      assets: "USDT",
      assetsIcon: (
        <Image
          src={"/images/svg/icon-USDT.svg"}
          height={16}
          width={16}
          alt=""
          className="h-4 w-4 rounded-full"
        />
      ),
    },
    {
      assetsName: "Ethereum",
      assets: "ETH",
      assetsIcon: (
        <Image
          src={"/images/svg/icon-ETH.svg"}
          height={16}
          width={16}
          alt=""
          className="h-4 w-4 rounded-full"
        />
      ),
    },
    {
      assetsName: "Bitcoin",
      assets: "BTC",
      assetsIcon: (
        <Image
          src={"/images/svg/icon-BTC.svg"}
          height={16}
          width={16}
          alt=""
          className="h-4 w-4 rounded-full"
        />
      ),
    },
    {
      assetsName: "Tether",
      assets: "USDT",
      assetsIcon: (
        <Image
          src={"/images/svg/icon-USDT.svg"}
          height={16}
          width={16}
          alt=""
          className="h-4 w-4 rounded-full"
        />
      ),
    },
  ];
  const ChainDropdownItems = [
    {
      chainName: "All Chain",
      chain: "All Chain",
      chainIcon: <UilCircleLayer className="h-4 w-4" />,
    },
    {
      chainName: "Ethereum",
      chain: "ETH",
      chainIcon: (
        <Image
          src={"/images/svg/icon-ETH.svg"}
          height={16}
          width={16}
          alt=""
          className="h-4 w-4 rounded-full"
        />
      ),
    },
    {
      chainName: "Bitcoin",
      chain: "BTC",
      chainIcon: (
        <Image
          src={"/images/svg/icon-BTC.svg"}
          height={16}
          width={16}
          alt=""
          className="h-4 w-4 rounded-full"
        />
      ),
    },
    {
      chainName: "Tether",
      chain: "USDT",
      chainIcon: (
        <Image
          src={"/images/svg/icon-USDT.svg"}
          height={16}
          width={16}
          alt=""
          className="h-4 w-4 rounded-full"
        />
      ),
    },
    {
      chainName: "Ethereum",
      chain: "ETH",
      chainIcon: (
        <Image
          src={"/images/svg/icon-ETH.svg"}
          height={16}
          width={16}
          alt=""
          className="h-4 w-4 rounded-full"
        />
      ),
    },
    {
      chainName: "Bitcoin",
      chain: "BTC",
      chainIcon: (
        <Image
          src={"/images/svg/icon-BTC.svg"}
          height={16}
          width={16}
          alt=""
          className="h-4 w-4 rounded-full"
        />
      ),
    },
    {
      chainName: "Tether",
      chain: "USDT",
      chainIcon: (
        <Image
          src={"/images/svg/icon-USDT.svg"}
          height={16}
          width={16}
          alt=""
          className="h-4 w-4 rounded-full"
        />
      ),
    },
  ];
  const TokenChainData = [
    {
      name: "BTC",
      value: "btc",
      bgColor: "bg-orange-100",
      hexColor: "#F7931A",
      increase: 67.54,
    },
    {
      name: "ETH",
      value: "eth",
      bgColor: "bg-blue-950",
      hexColor: "#627EEA",
      increase: 67.54,
    },
    {
      name: "XRP",
      value: "xrp",
      bgColor: "bg-purple-600",
      hexColor: "#9B47CF",
      increase: 67.54,
    },
    {
      name: "USDT",
      value: "usdt",
      bgColor: "bg-success-500",
      hexColor: "#04CFC4",
      increase: 67.54,
    },
    {
      name: "Other",
      value: "other",
      bgColor: "bg-gray-300",
      hexColor: "#8A94A1",
      increase: 67.54,
    },
  ];
  const VaultsData = [
    {
      Pair: "Gyroscope wstETH / cbETH",
      Deposit: "0.0000024 ETH",
      Now: "0.00",
      Yield: "0.00",
      DailyYield: "0.0000024 ETH",
    },
    {
      Pair: "Gyroscope wstETH / cbETH",
      Deposit: "0.0000024 ETH",
      Now: "0.00",
      Yield: "0.00",
      DailyYield: "0.0000024 ETH",
    },
    {
      Pair: "Gyroscope wstETH / cbETH / cbETH",
      Deposit: "0.0000024 ETH",
      Now: "0.00",
      Yield: "0.00",
      DailyYield: "0.0000024 ETH",
    },
    {
      Pair: "USDC / USDCe / USDT / DAI",
      Deposit: "0.0000024 ETH",
      Now: "0.00",
      Yield: "0.00",
      DailyYield: "0.0000024 ETH",
    },
  ];
  return {
    AssetsDropdownItems,
    ChainDropdownItems,
    TokenChainData,
    VaultsData,
  };
};
