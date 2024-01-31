import animationData from "@/constants/lotties/KYC_checking.json";
import Lottie from "react-lottie";

const PendingReview = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="bg-white rounded-[16px] mt-20 p-6 py-10 text-center">
      <Lottie
        options={defaultOptions}
        height={300}
        width={300}
        isClickToPauseDisabled
      />
      <h2 className="text-24 font-500 leading-7 mb-3">
        Thank you for submitting your details! <br />
        We are currently verifying your info.
      </h2>
      <p className="text-gray-300">This shouldn&rsquo;t take long</p>
    </div>
  );
};

export default PendingReview;
