"use client";

import { useCardAction } from "@/store/cardDetails";
import { useHandleModalAction } from "@/store/handleModal";
import { cn } from "@/utils";
import { useRef, useState } from "react";
import Slider from "react-slick";
import { PhysicalDebitCard } from "./PhysicalDebitCard";
import { VirtualCard } from "./VirtualCard";

export const CreateCardSlider = () => {
  const [cardIndex, setCardIndex] = useState(0);
  const slickSliderRef = useRef<any>(null);
  const { setHandleModal } = useHandleModalAction;
  const { setCardActionDetails } = useCardAction;

  const sliderSettings = {
    infinite: false,

    afterChange: (current: number) => {
      setCardIndex(current);
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1.05,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const handleCardClick = (index: any) => {
    setCardIndex(index);
    if (slickSliderRef.current) {
      slickSliderRef.current.slickGoTo(index);
    }
  };

  return (
    <>
      <div className="flex gap-1 mb-3">
        <div
          className={cn(
            "px-4 py-2 rounded-3xl bg-secondary dark:bg-white/15 w-max cursor-pointer",
            cardIndex === 0 && "bg-blue-300 dark:bg-white"
          )}
          onClick={() => {
            handleCardClick(0);
          }} // Click handler for virtual card
        >
          <span
            className={cn(
              "text-14 font-700 leading-4 text-blue-300 dark:text-white",
              cardIndex === 0 && "text-white dark:text-blue-300"
            )}
          >
            Physical
          </span>
        </div>
        <div
          className={cn(
            "px-4 py-2 rounded-3xl bg-secondary dark:bg-white/15 w-max cursor-pointer",
            cardIndex !== 0 && "bg-blue-300 dark:bg-white"
          )}
          onClick={() => {
            handleCardClick(1);
          }}
        >
          <span
            className={cn(
              "text-14 font-700 leading-4 text-blue-300 dark:text-white",
              cardIndex !== 0 && "text-white dark:text-blue-300"
            )}
          >
            Virtual
          </span>
        </div>
      </div>
      <Slider
        {...sliderSettings}
        ref={slickSliderRef}
        className="lg:hidden no-card-slider"
      >
        <PhysicalDebitCard />
        <VirtualCard />
      </Slider>
    </>
  );
};
