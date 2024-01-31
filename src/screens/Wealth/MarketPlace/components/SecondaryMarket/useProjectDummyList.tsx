import { UilCircleLayer } from "@/icons";
export const useProjectDummyList = () => {
  const PROJECT_LIST = [
    {
      name: "All",
      value: "all",
      icon: <UilCircleLayer className="h-4 w-4 text-blue-300" />,
    },
    {
      name: "Polkadot’s Hotel Renovation",
      value: "P79",
      img: "/images/svg/icon-BTC.svg",
    },
    {
      name: "Horizon Realty Services",
      value: "HRS68",
      img: "/images/svg/icon-USDT.svg",
    },
    {
      name: "Willow Tree Real Estate",
      value: "WT23",
      img: "/images/svg/icon-ETH.svg",
    },
    {
      name: "ClearRoute66",
      value: "CR66",
      img: "/images/svg/icon-BTC.svg",
    },
    {
      name: "VinsProperty",
      value: "VP52",
      img: "/images/svg/icon-USDT.svg",
    },
  ];
  return { PROJECT_LIST };
};
