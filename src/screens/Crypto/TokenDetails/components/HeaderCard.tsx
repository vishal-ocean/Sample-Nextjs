"use client";
import { Button } from "@/components/UI/Button";
import CustomToastMessage from "@/components/UI/CustomToast/CustomToastMessage";
import { AssetImages } from "@/constants/AssetsImages";
import { UilAngleLeftB } from "@/icons";
import { useChainAssetsList } from "@/services/useCrypto";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const HeaderCard = ({ assetData, isLoading }: any) => {
  const { data: chainNetworkList } = useChainAssetsList();

  const router = useRouter();
  const handleSellClick = () => {
    toast.error(
      <CustomToastMessage
        message="You have 0 balance to sell"
        subText="Deposit or buy the asset first"
      />
    );
  };
  const handleGoBack = () => {
    router.back();
  };
  const network = chainNetworkList?.find(
    (val: any) => val.id == assetData?.chainId
  );

  return (
    <>
      <div className="bg-black absolute top-0 h-40 w-full sm:hidden -z-10" />
      <div className="px-0 sm:px-10 lg:px-4 xl:px-0">
        <div className="w-full rounded-b-xl sm:rounded-[24px] relative bg-black sm:bg-transparent">
          <hr className="border-t border-white/15 sm:border-none mx-6" />
          <div className="bg-primary blur-[200px] h-[467px] w-[467px] absolute rounded-full bottom-full -left-1/2 sm:hidden" />

          {/* <Image
          src="/images/small-token-details-banner.png"
          height={3000}
          width={3000}
          className="absolute h-full w-full rounded-[24px] object-cover -z-10 block sm:hidden"
          alt="banner"
        /> */}
          <Image
            src="/images/token-details-banner.png"
            height={3000}
            width={3000}
            className="absolute h-full w-full rounded-[24px] object-cover object-right -z-10 hidden sm:block"
            alt="banner"
          />
          <div className="bg-transparent  p-3 pt-6 sm:pt-6 sm:px-6 pb-10 md:p-12 flex flex-col ">
            <div className="flex justify-between md:items-start items-center">
              <Button
                variant="secondary"
                className="rounded-3xl bg-secondary/10 text-white h-10 w-10 md:h-fit md:w-fit md:py-4 md:px-6 p-0 font-700 leading-5"
                onClick={handleGoBack}
              >
                <UilAngleLeftB className="block md:hidden h-4 w-4" />
                <span className="hidden md:block">Go Back</span>
              </Button>
              <div className="flex gap-1">
                <div className="md:hidden grid grid-cols-[16px_1fr] items-center py-3 px-4 gap-2 bg-white/15 rounded-3xl">
                  <Image
                    height={16}
                    width={16}
                    src={AssetImages[network?.shortName]}
                    alt="token-image"
                    className="rounded-3xl"
                  />
                  <span className="text-white font-700 text-14 tracking-[-0.64px] sm:tracking-[-0.8px] md:tracking-[-1.12px] leading-4">
                    {network?.name}
                  </span>
                </div>
                <div className="relative">
                  <Image
                    height={16}
                    width={16}
                    src={AssetImages[network?.shortName]}
                    alt="token-image"
                    className="rounded-3xl md:hidden block absolute top-0 right-0"
                  />
                  <Image
                    height={40}
                    width={40}
                    src={AssetImages[assetData?.shortName]}
                    alt="token-image"
                    className="rounded-3xl md:hidden block"
                  />
                </div>
              </div>
            </div>
            <div className="mt-[80px] grid grid-cols-[auto_auto] sm:gap-y-0 gap-y-5 sm:justify-between items-start lg:items-center gap-2">
              {isLoading ? (
                <div className="animate-pulse">
                  <div className="h-[56px] w-full min-w-[400px]"></div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-[auto_40px] gap-x-3 px-3 sm:px-0">
                    <span className="text-white font-500 text-32 tracking-[-0.64px] sm:text-40 md:text-[56px] sm:tracking-[-0.8px] md:tracking-[-1.12px] leading-[100%] break-words">
                      {assetData?.name}
                    </span>
                    <Image
                      height={40}
                      width={40}
                      src={AssetImages[assetData?.shortName]}
                      alt="token-image"
                      className="rounded-3xl md:block hidden"
                    />
                    {/* <Image
                    height={16}
                    width={16}
                    src={AssetImages[network?.shortName]}
                    alt="token-image"
                    className="rounded-3xl md:block hidden  relative bottom-3 right-7"
                  /> */}
                  </div>
                  <div className="hidden md:grid grid-cols-[24px_1fr] items-center py-4 px-6 gap-2 bg-white/15 rounded-3xl">
                    <Image
                      height={24}
                      width={24}
                      src={AssetImages[network?.shortName]}
                      alt="token-image"
                      className="rounded-3xl"
                    />
                    <span className="text-white font-500 text-16 tracking-[-0.64px] sm:tracking-[-0.8px] md:tracking-[-1.12px] leading-5 whitespace-nowrap">
                      {network?.name}
                    </span>
                  </div>
                </>
              )}
              {/* <div className="flex gap-x-2 w-full sm:w-fit">
          <Button
              className="flex gap-x-2 text-16 font-700 md:py-4 md:px-6 px-4 py-3 text-white w-full sm:w-fit leading-4 sm:leading-5"
              disabled
            >
              <UilPlus className="sm:h-6 sm:w-6 w-4 h-4 text-white" />
              <span>Buy</span>
            </Button>
            <Button
              variant="secondary"
              className="flex gap-x-2 text-16 font-700 text-blue-300 md:py-4 md:px-6 px-4 py-3 w-full sm:w-fit leading-4 sm:leading-5"
              onClick={handleSellClick}
              disabled
            >
              <UilMinus className="sm:h-6 sm:w-6 w-4 h-4 text-blue-300" />
              <span>Sell</span>
            </Button>
          </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderCard;
