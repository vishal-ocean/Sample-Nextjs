import animationData from "@/constants/lotties/PendingLoader.json";
import Lottie from "react-lottie";
const PendingLoader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} height={40} width={40} />
    </div>
  );
};

export default PendingLoader;
