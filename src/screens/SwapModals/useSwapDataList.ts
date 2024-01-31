export const useSwapDataList = () => {
  const NETWORK_LIST = [
    {
      value: "Avalanche1",
      label: "Avalanche",
      img: "/images/svg/icon-avalanche.svg",
    },
    {
      value: "Avalanche2",
      label: "Avalanche",
      img: "/images/svg/icon-avalanche.svg",
    },
    {
      value: "Avalanche3",
      label: "Avalanche",
      img: "/images/svg/icon-avalanche.svg",
    },
    {
      value: "Avalanche4",
      label: "Avalanche",
      img: "/images/svg/icon-avalanche.svg",
    },
  ];
  const TokenDropdownItems = [
    {
      value: "BTC",
      label: "BTC",
      img: "/images/svg/icon-BTC.svg",
    },
    {
      value: "USDT",
      label: "USDT",
      img: "/images/svg/icon-USDT.svg",
    },
    {
      value: "ETH",
      label: "ETH",
      img: "/images/svg/icon-ETH.svg",
    },
    {
      value: "BNB",
      label: "BNB",
      img: "/images/svg/icon-BNB.svg",
    },
  ];
  return { NETWORK_LIST, TokenDropdownItems };
};
