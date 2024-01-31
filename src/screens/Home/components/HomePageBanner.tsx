"use client";
import { Button } from "@/components/UI/Button";
import { DEPOSIT_MODAL } from "@/constants";
import { useHandleModalAction } from "@/store/handleModal";
import Image from "next/image";

const HomePageBanner = () => {
  const { setHandleModal } = useHandleModalAction;
  return (
    <>
      <div className="font-body mx-3 sm:mx-10 lg:mx-4 xl:mx-0 relative ">
        <Image
          src="/images/home-banner.png"
          width={1500}
          height={1000}
          alt=""
          className="h-full w-full rounded-[48px] absolute md:block hidden"
        />
        <Image
          src="/images/small-home-banner.png"
          width={1500}
          height={1000}
          alt=""
          className="h-full w-full rounded-[48px] absolute hidden min-[520px]:block md:hidden"
        />
        <Image
          src="/images/mobile-home-banner.png"
          height={1000}
          width={1500}
          alt=""
          className="h-full w-full rounded-[24px] absolute min-[520px]:hidden"
        />

        <div className="lg:p-[80px] md:p-[60px] p-8 rounded-[48px] relative">
          <h1 className="md:text-[56px] text-40 mt-[116px] min-[520px]:mt-0 leading-10 md:leading-[56px] font-500 text-white max-w-[250px] min-[520px]:max-w-[300px] md:max-w-[511px]">
            Welcome to Ocean Money
          </h1>
          <div className="pt-3 min-[520px]:pt-[128px] md:pt-[120px] lg:pt-[80px] flex md:flex-row  flex-col-reverse  justify-start items-start md:items-center gap-y-6 md:gap-x-5">
            <div>
              <Button
                className="w-fit px-6 py-3.5 font-700 hover:bg-blue-300 bg-white/20 text-white"
                onClick={() => setHandleModal(DEPOSIT_MODAL)}
              >
                Deposit
              </Button>
            </div>
            <p className="text-16 font-500 text-white/70 leading-5 ">
              Are you ready to get started <br />& make your own wave?
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePageBanner;
