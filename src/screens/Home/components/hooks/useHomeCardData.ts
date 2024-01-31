export const useHomeCardData = () => {
  const CARD_TITLES = [
    {
      name: "Crypto Services",
      openModal: "crypto",
      type: "crypto",
      activeCardName: "Crypto",
      link: "/crypto",
      img: [
        "/images/svg/icon-BTC.svg",
        "/images/nft-bg.png",
        "/images/wealth.png",
      ],
    },
    {
      name: "Banking",
      openModal: "fiat",
      type: "banking",
      activeCardName: "Fiat",
      link: "/",
    },

    {
      name: "Wealth Management",
      type: "wealthManagement",
      activeCardName: "Wealth Management",
      link: "/",
      img: [
        "/images/wealth.png",
        "/images/svg/icon-BTC.svg",
        "/images/nft-bg.png",
      ],
    },
    {
      name: "NFT Vault",
      type: "nftVault",
      activeCardName: "NFT Vault",
      link: "/",
      img: [
        "/images/nft-bg.png",
        "/images/svg/icon-BTC.svg",
        "/images/wealth.png",
      ],
    },
  ];

  const CARD_STYLES: Record<string, Record<string, string>> = {
    crypto: {
      bg: "bg-blue-300",
      hoverBg: "lg:hover:bg-primary",
      iconHoverBg: "lg:hover:bg-primary",
      iconBg: "bg-gray-400",
      text: "text-white",
    },
    banking: {
      bg: "bg-blue-300",
      hoverBg: "lg:hover:bg-success-200",
      iconHoverBg: "lg:hover:bg-success-200",
      iconBg: "bg-gray-400",
      text: "text-white",
    },
    nftVault: {
      bg: "bg-blue-300",
      hoverBg: "lg:hover:bg-purple-100",
      iconHoverBg: "lg:hover:bg-purple-200",
      iconBg: "bg-gray-400",
      text: "text-white",
    },
    wealthManagement: {
      bg: "bg-blue-300",
      hoverBg: "lg:hover:bg-orange-200",
      iconHoverBg: "lg:hover:bg-orange-100",
      iconBg: "bg-gray-400",
      text: "text-white",
    },
  };
  return { CARD_TITLES, CARD_STYLES };
};
