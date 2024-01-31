import SumsubWebSdk from "@sumsub/websdk-react";
import { useEffect } from "react";
import { useKYCContext } from "./KycContextProvider";
import SkeletonLoader from "./SkeletonLoader";

const SumSubKYC = () => {
  const { getSumSubToken, sumSubToken } = useKYCContext();

  const accessTokenExpirationHandler = (a: any) => {

  };

  const messageHandler = (a: any) => {

  };

  useEffect(() => {
    if (!sumSubToken) {
      getSumSubToken.mutate({});
    }
  }, []);

  if (!sumSubToken || getSumSubToken.isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <SumsubWebSdk
      accessToken={sumSubToken}
      expirationHandler={accessTokenExpirationHandler}
      // config={config}
      // options={options}
      onMessage={messageHandler}
      // onError={errorHandler}
    />
  );
};

export default SumSubKYC;
