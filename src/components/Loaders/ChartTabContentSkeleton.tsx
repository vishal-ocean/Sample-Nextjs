import Image from "next/image";
import HomePageNewsSkeleton from "./HomePageNewsSkeleton";
import { FullTableSkeleton } from "./TableSkeleton";

const ChartTabContentSkeleton = () => {
  return (
    <div className="grid grid-cols-12 gap-x-2 mt-6 lg:mx-4 xl:mx-0">
      <div className="col-span-12 xl:col-span-9 lg:col-span-8 mx-3 sm:mx-10 lg:mx-0">
        <div className="bg-gray-100 dark:bg-opacity-10 pt-3 sm:pt-5 rounded-[24px] sm:rounded-[48px] ">
          <div className="animate-pulse">
            <div className="sm:w-[200px] sm:h-[40px] w-[180px] h-[36px] flex ml-5" />
          </div>
          <div className=" block sm:flex sm:justify-between ">
            <div className="sm:ml-10 ml-0 mt-6">
              <div className="animate-pulse">
                <div className="mt-6 w-[80px] h-[10px] mx-auto" />
                <div className="mt-4 sm:w-[241px] sm:h-[56px] mx-auto  w-[200px] h-[46px]" />
              </div>
              <div className="mt-8 w-[209px] h-[40px] mx-auto">
                <div className="flex justify-between animate-pulse">
                  <div className="w-[41px] h-[10px]" />
                  <div className="w-[65px] h-[10px]" />
                </div>
                <div className="flex justify-between mt-2 animate-pulse">
                  <div className="w-[63px] h-[16px]" />
                  <div className="w-[69px] h-[16px]" />
                </div>
              </div>
              <div className="sm:block hidden mt-4 sm:mt-20 pb-14 sm:pb-4  animate-pulse">
                <div className="w-[100px] h-[55px] " />
              </div>
            </div>
            <div className="flex justify-center lg:mr-16 sm:mr-20 md:mr-4 lg:pb-16 sm:pb-20 md:pb-4 pb-4">
              <div className=" sm:mt-0 mt-4 sm:h-[332px] sm:w-[332px] h-[208px] w-[208px]">
                <Image
                  src="/images/svg/chart-skeleton.svg"
                  alt=""
                  width={0}
                  height={0}
                  sizes="100vh"
                  className="h-full w-full dark:hidden block"
                />
                <Image
                  src="/images/svg/dark-chart-skeleton.svg"
                  alt=""
                  width={0}
                  height={0}
                  sizes="100vh"
                  className="h-full w-full hidden dark:block"
                />
              </div>
            </div>
            <div className="mt-4 pb-14 animate-pulse flex justify-center sm:hidden ">
              <div className="w-[100px] h-[55px] " />
            </div>
          </div>
          <div className="bg-white dark:bg-white/10  rounded-[24px] pt-8">
            <FullTableSkeleton />
          </div>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-4 xl:col-span-3 xl:mt-0 mt-5 mx-3 sm:mx-10 lg:mx-0">
        <HomePageNewsSkeleton />
      </div>
    </div>
  );
};

export default ChartTabContentSkeleton;
