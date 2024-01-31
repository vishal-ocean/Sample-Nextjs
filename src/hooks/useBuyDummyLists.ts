export const useBuyDummyLists = () => {
  const TokenDropdownItems = [
    {
      name: "Bitcoin",
      value: "BTC",
      img: "/images/svg/icon-BTC.svg",
    },
    {
      name: "Tether",
      value: "USDT",
      img: "/images/svg/icon-USDT.svg",
    },
    {
      name: "Ethereum",
      value: "ETH",
      img: "/images/svg/icon-ETH.svg",
    },
    {
      name: "Bitcoin",
      value: "BTC1",
      img: "/images/svg/icon-BTC.svg",
    },
    {
      name: "Tether",
      value: "USDT1",
      img: "/images/svg/icon-USDT.svg",
    },
    {
      name: "Ethereum",
      value: "ETH1",
      img: "/images/svg/icon-ETH.svg",
    },
    {
      name: "Bitcoin",
      value: "BTC2",
      img: "/images/svg/icon-BTC.svg",
    },
    {
      name: "Tether",
      value: "USDT2",
      img: "/images/svg/icon-USDT.svg",
    },
    {
      name: "Ethereum",
      value: "ETH2",
      img: "/images/svg/icon-ETH.svg",
    },
  ];

  const CardList = [
    {
      value: "visa",
      name: "**** 8294",
      img: "/images/svg/icon-VISA.svg",
    },
    {
      value: "MasterCard",
      name: "**** 8294",
      img: "/images/svg/icon-MasterCard.svg",
    },
  ];

  const NetworkList = [
    {
      name: "Bitcoin",
      value: "BTC",
      img: "/images/svg/icon-BTC.svg",
    },
    {
      name: "BNB Smart Chain (BEP20)",
      value: "BSC",
      img: "/images/svg/icon-BNB.svg",
    },
    {
      name: "Ethereum (ERC20)",
      value: "ETH",
      img: "/images/svg/icon-ETH.svg",
    },
    {
      name: "Tron (TRC20)",
      value: "TRX",
      img: "/images/svg/icon-BTC.svg",
    },
    {
      name: "Polygon",
      value: "MATIC",
      img: "/images/svg/icon-BTC.svg",
    },
    {
      name: "Arbitrium One",
      value: "ARBITRIUM",
      img: "/images/svg/icon-BTC.svg",
    },
  ];
  return { TokenDropdownItems, CardList, NetworkList };
};
