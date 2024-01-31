"use client";

import { UilAngleDown } from "@iconscout/react-unicons";
import Image from "next/image";
import { ActionButton } from "./ActionButton";
import { CreateCardSlider } from "./CreateCardSlider";
import { PhysicalDebitCard } from "./PhysicalDebitCard";
import { VirtualCard } from "./VirtualCard";
export const NoCards = () => {
  return (
    <>
      <div className="flex flex-col gap-5 md:px-10 xl:px-0  lg:px-6 ">
        <div className=" sm:px-6 px-3  md:px-0 ">
          <div className="sm:bg-black rounded-[24px] w-full sm:min-h-[450px] relative sm: dark:border-solid sm:dark:border-[1px] dark:border-white/15">
            <Image
              width={0}
              height={0}
              sizes="100vw"
              className="m-auto h-auto w-full sm:block hidden rounded-[24px] "
              src="/images/flower-abstract-shape.png"
              alt="image"
            />
            <Image
              width={0}
              height={0}
              sizes="100vw"
              className="m-auto h-auto w-full sm:hidden block   dark:border-solid dark:border-white/15 dark:border-[1px]  rounded-[24px]"
              src="/images/flower-abstract-shape-mobile-view.png"
              alt="image"
            />
            <div className=" absolute bottom-10 m-auto sm:w-full w-[calc(100vw-24px)] ">
              <p className="font-500  text-32 leading-8 sm:text-40 sm:leading-10 text-white text-center ">
                Get your Ocean <br />
                Money debit card
              </p>
              <p className="text-16 leading-5 font-500 text-white/30 text-center mt-5">
                One card to spend or withdraw money <br />
                with the real exchange rate
              </p>
              <div className=" rounded-3xl px-6 py-4 bg-white/15 w-max m-auto mt-10 flex ">
                <span className="text-16 leading-5 font-700 text-white">
                  Choose Card
                </span>
                <UilAngleDown className="text-white h-6 w-6 ml-2" />
              </div>
            </div>
          </div>
        </div>
        <ActionButton />
        <div className="p-5 gap-3 md:flex hidden dark:bg-white/10 rounded-[24px] bg-white">
          <PhysicalDebitCard />
          <VirtualCard />
        </div>
        <div className="md:hidden block  sm:pl-6 pl-3">
          <CreateCardSlider />
        </div>
      </div>
    </>
  );
};
