"use client";
import SlideModal, { SlideModalHandle } from "@/components/SliderModal";
import { Button } from "@/components/UI/Button";
import IconShield1 from "@/components/icons/IconShield1";
import IconShield2 from "@/components/icons/IconShield2";
import { PRIMARY_MARKET } from "@/constants";
import { UilAngleRightB, UilChart } from "@/icons";
import EarningNotification from "@/screens/Wealth/Notification/EarningNotification";
import { useMarketPlaceTabAction } from "@/store/marketPlaceTabStore";
import Link from "next/link";
import { useRef } from "react";
const CardsSection = () => {
  const slideModalRef = useRef<SlideModalHandle>(null);
  const { setMarketPlaceTab } = useMarketPlaceTabAction;
  return (
    <div className="lg:col-span-4 xl:col-span-3 col-span-12 flex md:grid grid-cols-12 gap-x-2 lg:order-2 order-1 overflow-x-auto lg:overflow-x-hidden px-3 sm:pl-10 sm:pr-3 md:px-10 lg:px-0 lg:mr-4 xl:mr-0 remove-scrollbar">
      <div className="min-w-[224px] lg:h-max md:w-full pr-3 pt-3 pl-6 lg:pr-6 lg:pt-6 pb-6  md:col-span-4 lg:col-span-full  bg-white dark:bg-white/10 rounded-[24px] grid">
        <div className="flex justify-between items-center">
          <UilChart className="text-success-200 w-4 h-4" />
          <Button
            variant="secondary"
            className="!p-0 h-10 w-10 text-blue-300 dark:bg-white/15 dark:text-white flex justify-center items-center lg:hidden"
          >
            <UilAngleRightB className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-gray-300 dark:text-white/30 text-12 font-500 lg:mt-3 mt-0 leading-4">
          Total Earnings
        </p>
        <span className="text-success-200 text-24 font-500 mt-[18px] leading-7 self-end">
          €0
        </span>
        <Link href="/transactions">
          <Button
            variant="secondary"
            className="text-14 font-700 px-4 py-3 mt-[22px] dark:bg-white/15 dark:text-white w-fit lg:block hidden leading-4"
            // onClick={() => slideModalRef.current?.open()}
          >
            See All
          </Button>
        </Link>
        <SlideModal ref={slideModalRef} className="max-w-[656px]">
          <div className="h-full max-h-screen" id="notification-slide-modal">
            <EarningNotification />
          </div>
        </SlideModal>
      </div>
      <div className="lg:p-3 p-0 lg:bg-white lg:dark:bg-white/10 flex col-span-8 lg:col-span-full md:grid gap-x-2 grid-cols-12 bg-none rounded-[24px] h-fit lg:mt-2 mt-0 w-full">
        <div className="min-w-[224px] md:w-full flex flex-col col-span-6 justify-between lg:col-span-full pr-3 pt-3 pl-6 pb-6 lg:pr-6 lg:pt-6 lg:pb-5 bg-blue-300 rounded-[24px]">
          <div className="flex justify-between items-center">
            <IconShield1 className="w-4 h-4 text-white" />
            <Button
              variant="secondary"
              className="!p-0 h-10 w-10 text-white dark:bg-white/15 flex justify-center items-center lg:hidden bg-white/10"
            >
              <UilAngleRightB className="h-4 w-4" />
            </Button>
          </div>
          <span className="text-16 mt-4 lg:mt-3 text-white font-500 leading-5">
            Primary Market
          </span>
          <span className="text-14 text-gray-300 dark:text-white/30 mt-2 whitespace-break-spaces font-500 leading-4">
            {/* Access a wide range of opportunities from crypto-related
            opportunities to sports funds and more! */}
            Access a wide range of opportunities from real-estate to tokenized
            funds
          </span>
          <Link href="/wealth/market-place">
            <Button
              className="bg-white/10 text-14 w-fit text-white dark:bg-white/15 px-4 py-3 font-700 rounded-3xl mt-4 lg:block hidden leading-4"
              onClick={() => setMarketPlaceTab(PRIMARY_MARKET)}
            >
              Explore
            </Button>
          </Link>
        </div>
        <div className="min-w-[224px] dark:bg-white/5 md:w-full flex flex-col col-span-6 justify-between lg:col-span-full pr-3 pt-3 pl-6 pb-6 lg:pr-6 lg:pt-6 lg:pb-5 bg-secondary rounded-[24px] lg:mt-2 mt-0">
          <div className="flex justify-between items-center ">
            <IconShield2 className="h-4 w-4 text-gray-300 dark:text-white/30" />
            <Button
              variant="secondary"
              className="py-0 h-10 px-4 text-blue-300 flex justify-center items-center lg:hidden cursor-default bg-white/10 dark:bg-white/15 dark:text-white/30 text-14 font-700 leading-4"
            >
              {/* <UilAngleRightB className="h-4 w-4" /> */}
              Coming Soon
            </Button>
          </div>
          <span className="text-16 mt-3 text-blue-300 font-500 leading-5 dark:text-white/30">
            Secondary Market
          </span>
          <span className="text-14 text-gray-300 mt-2 whitespace-break-spaces font-500 leading-4 dark:text-white/30">
            {/* Explore opportunities that have completed their initial phases and
            are active in the secondary market. */}
            Explore our staking options today and let your crypto work for you
          </span>
          {/* <Link href="/market-place"> */}
          <Button
            className="bg-gray-100 text-14 w-fit dark:bg-white/15 dark:text-white/30 cursor-default text-blue-300 px-4 py-3 font-700 rounded-3xl mt-4 lg:block hidden leading-4"
            // onClick={() => setMarketPlaceTab(SECONDARY_MARKET)}
          >
            Coming Soon
          </Button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

export default CardsSection;
