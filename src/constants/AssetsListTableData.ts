interface Asset {
  type: string;
  name: string;
  subText: string;
  marketPrice: number;
  percentage?: string;
  isOwned: boolean;
  owned?: number;
  img: string;
  btc?: number;
  bg?: string;
}

export const AssetsListTableData: Record<string, Asset[]> = {
  all: [
    {
      type: "nft",
      name: "#3150",
      subText: "Hydro Whale Mining Official Northern Western Club",
      marketPrice: 20000,
      percentage: "+0.13",
      isOwned: true,
      img: "/images/nft.png",
    },
    {
      type: "fiat",
      name: "United States Dollar",
      subText: "USD",
      marketPrice: 1,
      isOwned: false,
      owned: 100000,
      img: "/images/wealth.png",
    },
    {
      type: "wealth",
      name: "Polkadot’s Hotel Renovation",
      subText: "Empire Estate",
      marketPrice: 25000,
      isOwned: false,
      owned: 100000,
      img: "/images/wealth.png",
    },
    {
      type: "crypto",
      name: "Bitcoin",
      subText: "BTC",
      marketPrice: 27323.12,
      percentage: "+0.13",
      isOwned: false,
      owned: 100000,
      btc: 0.97,
      img: "/images/svg/icon-BTC.svg",
    },
  ],
  crypto: [
    {
      type: "crypto",
      name: "Bitcoin",
      subText: "BTC",
      marketPrice: 27323.12,
      percentage: "+0.13",
      isOwned: false,
      owned: 100000,
      btc: 0.97,
      img: "/images/svg/icon-BTC.svg",
    },
    {
      type: "crypto",
      name: "Bitcoin",
      subText: "BTC",
      marketPrice: 17323.12,
      percentage: "+0.11",
      isOwned: false,
      owned: 110000,
      btc: 0.98,
      img: "/images/svg/icon-BTC.svg",
    },
  ],
  fiat: [
    {
      type: "fiat",
      name: "United States Dollar",
      subText: "USD",
      marketPrice: 1,
      isOwned: false,
      owned: 100000,
      img: "/images/wealth.png",
    },
  ],
  wealth: [
    {
      type: "wealth",
      name: "Polkadot’s Hotel Renovation",
      subText: "Empire Estate",
      marketPrice: 25000,
      isOwned: false,
      owned: 100000,
      img: "/images/wealth.png",
      bg: "/images/wealth-bg.png",
    },
    {
      type: "wealth",
      name: "Polkadot’s Hotel Renovation",
      subText: "Empire Estate",
      marketPrice: 25500,
      isOwned: false,
      owned: 103000,
      img: "/images/wealth.png",
      bg: "/images/wealth-bg.png",
    },
    {
      type: "wealth",
      name: "Polkadot’s Hotel Renovation",
      subText: "Empire Estate",
      marketPrice: 25005,
      isOwned: false,
      owned: 100400,
      img: "/images/wealth.png",
      bg: "/images/wealth-bg.png",
    },
  ],
  nft: [
    {
      type: "nft",
      name: "#3150",
      subText: "Hydro Whale Mining Official Northern Western Club",
      marketPrice: 20000,
      percentage: "+0.13",
      isOwned: true,
      img: "/images/nft-bg.png",
    },
    {
      type: "nft",
      name: "#3151",
      subText: "Hydro Whale",
      marketPrice: 20000,
      percentage: "+0.13",
      isOwned: true,
      img: "/images/nft-bg.png",
    },
    {
      type: "nft",
      name: "#3151",
      subText: "Hydro Whale",
      marketPrice: 20000,
      percentage: "+0.13",
      isOwned: true,
      img: "/images/nft-bg.png",
    },
    {
      type: "nft",
      name: "#3151",
      subText: "Hydro Whale",
      marketPrice: 20000,
      percentage: "+0.13",
      isOwned: true,
      img: "/images/nft-bg.png",
    },
  ],
};
