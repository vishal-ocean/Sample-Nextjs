import { Button } from "@/components/UI/Button";
import {
  UilArrowGrowth,
  UilChartDown,
  UilDollarAlt,
  UilFire,
  UilGraphBar,
} from "@/icons";
import Image from "next/image";
const DataCards = () => {
  return (
    <div className="my-6 flex md:grid md:grid-cols-3 grid-cols-12 gap-3 overflow-x-auto lg:overflow-x-hidden px-3 sm:pl-10 md:px-10 lg:px-4 xl:px-0">
      <div className="p-9 bg-white rounded-[24px] flex flex-col min-h-[196px] min-w-[220px] md:col-span-1 col-span-4">
        <div className="flex justify-between">
          <div className="flex md:flex-row flex-col md:gap-x-3 gap-y-3">
            <UilDollarAlt className="w-4 h-4 text-blue-300" />
            <span className="text-14 text-gray-300 font-500 leading-4">
              Market Cap
            </span>
          </div>
          <div className="flex gap-x-2 items-center">
            <UilChartDown className="w-4 h-4 text-danger-100" />
            <span className="text-14 font-700 text-danger-100 leading-4">
              0.48%
            </span>
          </div>
        </div>
        <span className="mt-[52px] text-24 font-700 text-blue-300 leading-7">
          €1,180.87B
        </span>
      </div>
      <div className="p-9 bg-white rounded-[24px] flex flex-col min-h-[196px] min-w-[220px] md:col-span-1 col-span-4">
        <div className="flex justify-between">
          <div className="flex md:flex-row flex-col md:gap-x-3 gap-y-3">
            <UilGraphBar className="w-4 h-4 text-blue-300" />
            <span className="text-14 text-gray-300 font-500 leading-4">
              Volume, 24H
            </span>
          </div>
          <div className="flex gap-x-2 items-center">
            <UilArrowGrowth className="w-4 h-4 text-success-200" />
            <span className="text-14 font-700 text-success-200 leading-4">
              1.25%
            </span>
          </div>
        </div>
        <span className="mt-[52px] text-24 font-700 text-blue-300 leading-7">
          €1,180.87B
        </span>
      </div>
      <div className="p-9 bg-blue-300 rounded-[24px] flex flex-col relative min-h-[196px] min-w-[220px] md:col-span-1 col-span-4">
        <div className="flex justify-between">
          <div className="flex md:flex-row flex-col md:gap-x-3 gap-y-3">
            <UilFire className="w-4 h-4 text-white" />
            <span className="text-14 text-white font-500 leading-4">
              Trending
            </span>
          </div>
          <Button className="rounded-3xl bg-white/10 px-4 py-2 text-14 text-white font-700 leading-4">
            See All
          </Button>
        </div>
        <Image
          src="/images/svg/half-circles-bg.svg"
          alt="img"
          width={0}
          height={0}
          sizes="100vw"
          className="h-full w-full max-h-[50%] max-w-[60%] absolute left-0 bottom-0 rounded-bl-[24px]"
        />
      </div>
    </div>
  );
};

export default DataCards;
