import animationDataCrypto from "@/constants/lotties/Blue.json";
import animationDataFiat from "@/constants/lotties/Green.json";
import animationDataWealth from "@/constants/lotties/Orange.json";
import animationDataNFT from "@/constants/lotties/Purple.json";
import { useUser } from "@auth0/nextjs-auth0/client";
import Lottie from "react-lottie";
const NestedCharts = ({ totalAssetsData, tab }: any) => {
  const { user } = useUser();
  // const defaultOptions = {
  //   loop: false,
  //   autoplay: true,
  //   animationData: animationData(totalAssetsData, user, tab),
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // };

  const animationData: Record<string, any> = {
    all: animationDataCrypto,
    crypto: animationDataCrypto,
    fiat: animationDataFiat,
    wealth: animationDataWealth,
    nft: animationDataNFT,
  };
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData[tab],
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Lottie
        options={defaultOptions}
        height={300}
        width={300}
        isClickToPauseDisabled
      />
    </div>
  );
};

export default NestedCharts;
