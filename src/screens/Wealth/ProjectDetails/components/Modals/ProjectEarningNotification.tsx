"use client";
import { UilArrowGrowth, UilChart, UilTimes } from "@/icons";
import Image from "next/image";
import { useContext } from "react";

import { SlideModalContext } from "@/components/SliderModal";
import { Button } from "@/components/UI/Button";

const ProjectEarningNotification = () => {
  const slideModal = useContext(SlideModalContext);

  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-x-2">
          <div className="h-10 w-10 rounded-3xl bg-success-200 flex justify-center items-center">
            <UilChart className="w-4 h-4 text-white" />
          </div>
          <div className="flex gap-x-2 items-center">
            <div className="rounded-full w-10 h-10 bg-orange-100 flex justify-center items-center">
              <Image
                src="/images/svg/icon-BTC.svg"
                width={16}
                height={16}
                alt=""
              />
            </div>
            <span>
              <p className="text-blue-300 text-12 leading-4 font-500">P79</p>
              <p className="text-gray-300 text-12 leading-4 font-500">
                Polkadot’s Hotel Renovation
              </p>
            </span>
          </div>
        </div>
        <Button
          variant="secondary"
          className="!p-0 w-10 h-10"
          onClick={() => slideModal?.close()}
        >
          <UilTimes className="w-4 h-4 mx-auto text-blue-300" />
        </Button>
      </div>
      <div className="sm:mt-11 sm:mx-7 mt-6 mx-2">
        <span className="sm:text-40 font-500 leading-10 tracking-[-0.8px] text-blue-300 text-26">
          Project Earnings
        </span>
        <div className="mt-10 overflow-y-auto h-[calc(100vh-250px)] pr-4">
          {[...Array(12)].map((_, index) => (
            <div key={index}>
              <div className="flex w-full justify-between items-center">
                <div className="flex gap-x-3 items-center">
                  <div className="rounded-full w-10 h-10 bg-secondary flex justify-center items-center">
                    <UilArrowGrowth className="w-4 h-4 text-gray-300" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-16 text-success-200 font-500 leading-5">
                      + €25,000
                    </span>
                    <span className="text-gray-300 font-500 leading-4 text-12">
                      {index % 2 === 0 ? "Rental Income" : "Annual Returns"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col font-500">
                  <p className="text-blue-300 text-16 font-500 leading-5">
                    12.08.203
                  </p>
                  <span className="text-gray-300 font-500 leading-4 text-12 self-end">
                    12:30 PM
                  </span>
                </div>
              </div>
              {[...Array(12)].length - 1 !== index && <hr className="my-5" />}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectEarningNotification;
