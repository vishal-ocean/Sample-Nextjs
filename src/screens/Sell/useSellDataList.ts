export const useSellDataList = () => {
  const TRANSFER_DATA = [
    {
      name: "Bitcoin",
      subText: "BTC",
      balance: {
        token: 2.0985,
        usd: 60909.8,
      },
      tokenSymbol: "BTC",
      img: "/images/svg/icon-BTC.svg",
      marketPrice: 21000,
      dynamic: 0.13,
      dynamicStats: "increase",
    },
    {
      name: "Ethereum",
      subText: "ETH",
      balance: {
        token: 200,
        usd: 360909.8,
      },
      tokenSymbol: "ETH",
      img: "/images/svg/icon-ETH.svg",
      marketPrice: 21000,
      dynamic: 0.13,
      dynamicStats: "increase",
    },
    {
      name: "Tether",
      subText: " USDT",
      balance: {
        token: 2000,
        usd: 2000,
      },
      tokenSymbol: "USDT",
      img: "/images/svg/icon-USDT.svg",
      marketPrice: 21000,
      dynamic: 0.13,
      dynamicStats: "decrease",
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
  return { TokenDropdownItems, TRANSFER_DATA };
};
