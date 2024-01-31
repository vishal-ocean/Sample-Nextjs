"use client";
import SlideModal, { SlideModalHandle } from "@/components/SliderModal";
import { Button } from "@/components/UI/Button";
import { UilChart } from "@/icons";
import ProjectEarningNotification from "@/screens/Wealth/ProjectDetails/components/Modals/ProjectEarningNotification";
import { useRef } from "react";

const CardsSection = () => {
  const slideModalRef = useRef<SlideModalHandle>(null);

  return (
    <div className="lg:col-span-3 col-span-12  grid grid-cols-12 gap-2 lg:order-2 order-1 overflow-x-auto lg:overflow-x-hidden">
      <div className="min-w-[220px] md:w-full lg:p-6 col-span-12 lg:col-span-full p-6 sm:p-8 bg-white rounded-[24px] flex flex-col h-fit">
        <div className="flex justify-between items-center">
          <UilChart className="text-success-200 w-4 h-4" />
        </div>
        <p className="text-gray-300 text-12 font-500 mt-3 leading-5">
          Total Earnings
        </p>
        <span className="mt-9 sm:mt-10 text-16 text-gray-300 font-500 leading-5">
          Your first earning is <br />
          scheduled on 08.12.2023
        </span>
      </div>
      <div className="min-w-[220px] md:w-full lg:p-6 col-span-12 lg:col-span-full p-6 sm:p-8 bg-white rounded-[24px] flex flex-col h-fit">
        <div className="flex justify-between items-center">
          <UilChart className="text-success-200 w-4 h-4" />
          {/* <Button
            variant="secondary"
            className="!p-0 h-10 w-10 text-blue-300 flex justify-center items-center lg:hidden"
          >
            <UilAngleRightB className="h-4 w-4" />
          </Button> */}
        </div>
        <p className="text-gray-300 text-12 font-500 mt-3 leading-5">
          Total Earnings
        </p>
        <span className="text-blue-300 text-24 font-500 mt-2 leading-7">
          €15,550.00
        </span>
        <div className="mt-3 lg::mt-6 flex flex-col gap-y-3">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-14 text-success-200 font-500 leading-4">
                + €50
              </span>
              <span className="text-12 text-gray-300 font-500 leading-4">
                Rental Income
              </span>
            </div>
            <div className="flex flex-col justify-end items-end">
              <span className="text-14 text-gray-300 font-500 leading-4">
                Aug 25 2023
              </span>
              <span className="text-12 text-gray-300 font-500 leading-4">
                1:30 PM
              </span>
            </div>
          </div>
        </div>
        <div className="mt-3 lg::mt-6 flex flex-col gap-y-3">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-14 text-success-200 font-500 leading-4">
                + €200
              </span>
              <span className="text-12 text-gray-300 font-500 leading-4">
                Rental Income
              </span>
            </div>
            <div className="flex flex-col justify-end items-end">
              <span className="text-14 text-gray-300 font-500 leading-4">
                Aug 25 2023
              </span>
              <span className="text-12 text-gray-300 font-500 leading-4">
                1:30 PM
              </span>
            </div>
          </div>
        </div>
        <div className="mt-3 lg::mt-6 flex flex-col gap-y-3">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-14 text-success-200 font-500 leading-4">
                + €15,550
              </span>
              <span className="text-12 text-gray-300 font-500 leading-4">
                Annual Returns
              </span>
            </div>
            <div className="flex flex-col justify-end items-end">
              <span className="text-14 text-gray-300 font-500 leading-4">
                Aug 25 2023
              </span>
              <span className="text-12 text-gray-300 font-500 leading-4">
                1:30 PM
              </span>
            </div>
          </div>
        </div>
        <Button
          variant="secondary"
          className="text-14 font-700 px-4 py-3 mt-6 w-11/12 sm:w-max text-center leading-4"
          onClick={() => slideModalRef.current?.open()}
        >
          See All
        </Button>
        <SlideModal ref={slideModalRef} className="max-w-[656px]">
          <div className="h-full max-h-screen" id="notification-slide-modal">
            <ProjectEarningNotification />
          </div>
        </SlideModal>
      </div>
    </div>
  );
};

export default CardsSection;
