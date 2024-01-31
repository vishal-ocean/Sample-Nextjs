import { Tier } from "@/constants/headerStaticData";
import { UilAngleRightB, UilBolt, UilCheck } from "@/icons";
import { cn } from "@/utils";
import Image from "next/image";
import { useRef, useState } from "react";
import Slider from "react-slick";

export const TierSlider = () => {
  const [tireIndex, setTireIndex] = useState(0);
  const slickSliderRef = useRef<any>(null);
  const sliderSettings = {
    dots: true,
    infinite: false,
    appendDots: (dots: string) => <ul>{dots}</ul>,
    customPaging: () => (
      <div className="ft-slick__dots--custom">
        <div className="loading" />
      </div>
    ),
    // beforeChange: (current: number, next: number) => {
    //   setTireIndex(current);
    // },
    afterChange: (current: number) => {
      setTireIndex(current);
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 670,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="relative mt-6 block lg:hidden">
      {Tier.map(
        (value, index) =>
          index == tireIndex && (
            <div
              className="bg-white dark:bg-white/15 px-4 py-[9px] text-14 font-700 leading-4 text-blue-300 dark:text-white w-max rounded-[24px] mb-3 capitalize"
              key={index}
            >
              {value.tierName}
            </div>
          )
      )}
      <Slider
        {...sliderSettings}
        ref={slickSliderRef}
        className="block lg:hidden tier-slider"
      >
        {Tier.map((value, index) => (
          <div key={index} className="px-1">
            <div className="bg-white dark:bg-white/10 p-5 rounded-lg">
              <div
                className={cn(
                  "rounded-lg relative",
                  !value.currentTier && "bg-gray-100 dark:bg-white/5"
                )}
              >
                {value.currentTier && (
                  <Image
                    src={value.background}
                    height={500}
                    width={500}
                    alt=""
                    className="w-full h-full absolute rounded-lg"
                  />
                )}
                <div className="p-5 rounded-lg relative z-10">
                  <div className="flex justify-between items-center">
                    <span
                      className={cn(
                        "h-7 w-7 p-1.5 flex justify-center items-center rounded-full",
                        value.currentTier
                          ? `text-white bg-white/10`
                          : value.tierName === "starter"
                          ? `${value.bgSecondary} text-blue-300 bg-opacity-10 dark:bg-white/15 dark:text-white`
                          : `${value.textColor} ${value.bgColor} bg-opacity-20`
                      )}
                    >
                      {value.tierIcon}
                    </span>
                    {value.currentTier ? (
                      <UilCheck className="h-4 w-4 text-white" />
                    ) : (
                      <UilAngleRightB className="h-4 w-4 text-blue-300 cursor-pointer dark:text-white" />
                    )}
                  </div>

                  <p
                    className={cn(
                      "mt-6 capitalize text-16 font-700 leading-5",
                      value.currentTier
                        ? "text-white"
                        : "text-blue-300 dark:text-white"
                    )}
                  >
                    {value.tierName}
                  </p>
                  <p
                    className={cn(
                      " text-12 font-500 leading-4",
                      value.currentTier ? "text-white" : "text-gray-300"
                    )}
                  >
                    {value.wave.toLocaleString()} WAVE
                  </p>
                </div>
              </div>
              <div className="w-full p-2 flex items-center gap-x-2 bg-gray-100 dark:bg-white/5 rounded-xl mt-5">
                <span className="h-10 w-10 flex justify-center items-center bg-white dark:bg-white/10 rounded-full">
                  <UilBolt className="h-4 w-4 text-blue-300 dark:text-white" />
                </span>
                <p className="text-16 font-700 leading-5 text-blue-300 dark:text-white">
                  Platform Benefits
                </p>
              </div>
              <div>
                <div className="flex justify-between mt-5">
                  <p className="text-16 font-500 leading-5 text-gray-300 dark:text-white/30 w-2/5">
                    Exchange Fee
                  </p>
                  <p className="text-16 font-500 leading-5 text-blue-300 dark:text-white">
                    {value?.benefits?.[0]}
                    &nbsp;
                    <span className="text-gray-300 dark:text-white/30">%</span>
                  </p>
                </div>
                <hr className="my-5 border-secondary dark:border-white/15" />
                <div className="flex justify-between ">
                  <p className="text-16 font-500 leading-5 text-gray-300 dark:text-white/30 w-2/5">
                    Free monthly crypto withdrawals
                  </p>
                  <p className="text-16 font-500 leading-5 text-blue-300 dark:text-white">
                    {value?.benefits?.[1]}
                  </p>
                </div>
                <hr className="my-5 border-secondary dark:border-white/15" />
                <div className="flex justify-between ">
                  <p className="text-16 font-500 leading-5 text-gray-300 dark:text-white/30 w-2/5">
                    Auto Investor Fee
                  </p>
                  <p className="text-16 font-500 leading-5 text-blue-300 dark:text-white">
                    {value?.benefits?.[2]}
                    &nbsp;
                    <span className="text-gray-300 dark:text-white/30">%</span>
                  </p>
                </div>
                <hr className="my-5 border-secondary dark:border-white/15" />
                <div className="flex justify-between ">
                  <p className="text-16 font-500 leading-5 text-gray-300 dark:text-white/30 w-2/5">
                    Gas fees on platform transactions are refunded up to
                  </p>
                  <p className="text-16 font-500 leading-5 text-blue-300 dark:text-white">
                    {value?.benefits?.[3]}
                    &nbsp;
                    <span className="text-gray-300 dark:text-white/30">%</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
