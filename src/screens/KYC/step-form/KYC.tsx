import AddressInformation from "./AddressInformation";
import { KYC_STEP, useKYCContext } from "./KycContextProvider";
import OccupationInfo from "./OccupationInfo";
import Register from "./Register";
import SkeletonLoader from "./SkeletonLoader";
import SumSubKYC from "./SumSubKYC";
import { default as VerificationStep } from "./Verification";

const KYC = () => {
  const { loadingUserDetailsFromStriga, stage } = useKYCContext();

  let content = null;

  if (stage === KYC_STEP.Loading || loadingUserDetailsFromStriga) {
    content = <SkeletonLoader />;
  }

  if (stage === KYC_STEP.Register) {
    content = <Register></Register>;
  }

  if (stage === KYC_STEP.Verification) {
    content = content = <VerificationStep />;
  }

  if (stage === KYC_STEP.Occupation) {
    content = <OccupationInfo></OccupationInfo>;
  }

  if (stage === KYC_STEP.Address) {
    content = <AddressInformation></AddressInformation>;
  }

  if (stage === KYC_STEP.Sumsub) {
    content = <SumSubKYC></SumSubKYC>;
  }

  if (stage === KYC_STEP.Error) {
    content = (
      <p>
        Something went wrong please contact{" "}
        <a href="mailto:Support@ocean.money">support here</a>
      </p>
    );
  }

  return <div>{content || "Loading user details..."}</div>;
};

export default KYC;
