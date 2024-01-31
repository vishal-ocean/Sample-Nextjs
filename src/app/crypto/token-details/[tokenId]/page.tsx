import dynamic from "next/dynamic";

const TokenDetails = dynamic(() => import("@/screens/Crypto/TokenDetails"));

const TokenDetailsPage = () => {
  return <TokenDetails />;
};

export default TokenDetailsPage;
