import dynamic from "next/dynamic";

const MarketPlace = dynamic(() => import("@/screens/Crypto/MarketPlace"));

const MarketPlacePage = () => {
  return <MarketPlace />;
};

export default MarketPlacePage;
