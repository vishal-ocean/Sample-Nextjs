'use client';
import { IconBolt } from '@/components/icons/IconBolt';
import { IconSlice } from '@/components/icons/IconSlice';
import { IconYieldFarming } from '@/components/icons/IconYieldFarming';
import { UilMoonEclipse, UilPadlock, UilSun } from '@/icons';
import dynamic from 'next/dynamic';
import Image from 'next/image';
const ChartSection = dynamic(() =>
  import('./ChartSection').then((mod) => mod.ChartSection)
);
const VaultsListing = dynamic(() =>
  import('./VaultsListing').then((mod) => mod.VaultsListing)
);

const YieldFarming = () => {
  return (
    <div className="">
      <div className="relative lg:h-[284px] sm:h-[207px] h-[194px] rounded-[24px] mx-3 sm:mx-10 lg:mx-4 xl:mx-0">
        <Image
          src={'/images/yield-farming-banner.png'}
          width={1500}
          height={1500}
          alt=""
          className="h-full w-full absolute -z-10 rounded-[24px] hidden lg:block"
        />
        <Image
          src={'/images/medium-yield-farming-banner.png'}
          width={1000}
          height={1000}
          alt=""
          className="h-full w-full absolute -z-10 rounded-[24px] hidden sm:block lg:hidden"
        />
        <Image
          src={'/images/small-yield-farming-banner.png'}
          width={500}
          height={500}
          alt=""
          className="h-full w-full absolute -z-10 rounded-[24px] block sm:hidden"
        />
        <div className="p-6 sm:p-10 flex items-end h-full rounded-[24px]">
          <p className="text-40 lg:text-56 leading-10 lg:leading-[56px] font-700 sm:font-500 tracking-[-0.8px] lg:tracking-[-1.12px] text-white rounded-[24px]">
            Yield Farming
          </p>
        </div>
      </div>
      <div className="grid grid-cols-12 sm:grid-cols-[repeat(11,1fr)_336px] gap-5 mt-5 lg:mx-4 xl:mx-0">
        <div className="col-span-full lg:col-span-11 mx-3 sm:mx-10 lg:mx-0 order-2 lg:order-1">
          <ChartSection />
        </div>
        <div className="flex flex-col gap-y-2 col-span-full lg:col-span-1 order-1 lg:order-2">
          <div className="bg-white rounded-[20px] p-5 sm:grid sm:grid-cols-2 lg:grid-cols-1 justify-between items-end gap-x-16 mx-3 sm:mx-10 lg:mx-0 dark:bg-white/10">
            <div className="">
              <span className="flex gap-2">
                <IconSlice className="h-4 w-4 text-blue-300 dark:text-white" />
                <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                  Your Total Balance
                </p>
              </span>
              <p className="text-40 font-500 leading-10 text-blue-300 tracking-[-0.8px] mt-5 sm:mt-10 lg:mt-5 dark:text-white">
                €12,498,278.92
              </p>
            </div>
            <div className="mt-[68px] sm:mt-0 lg:mt-[68px]">
              <div className="flex justify-between items-center">
                <span className="flex gap-2">
                  <UilSun className="h-4 w-4 text-blue-300 dark:text-white" />
                  <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                    Daily Yield
                  </p>
                </span>
                <p className="text-16 font-500 leading-5 text-blue-300 dark:text-white">
                  €274.57
                </p>
              </div>
              <hr className="border-secondary my-3 dark:border-white/15" />
              <div className="flex justify-between items-center">
                <span className="flex gap-2">
                  <UilMoonEclipse className="h-4 w-4 text-blue-300 dark:text-white" />
                  <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                    Monthly Yield
                  </p>
                </span>
                <p className="text-16 font-500 leading-5 text-blue-300 dark:text-white">
                  €8,924.99
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row lg:flex-col gap-2 overflow-auto remove-scrollbar px-3 sm:px-10 lg:px-0">
            <div className="bg-white rounded-[20px] p-5 min-w-[240px] w-1/3 lg:w-full  dark:bg-white/10">
              <span className="flex gap-2">
                <IconBolt className="h-4 w-4 text-blue-300 dark:text-white" />
                <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                  Average APY
                </p>
              </span>
              <p className="text-24 font-500 leading-7 text-blue-300 mt-8 dark:text-white">
                7.5%
              </p>
            </div>
            <div className="bg-white rounded-[20px] p-5 min-w-[240px] w-1/3 lg:w-full  dark:bg-white/10">
              <span className="flex gap-2">
                <UilPadlock className="h-4 w-4 text-blue-300 dark:text-white" />
                <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                  TVL
                </p>
              </span>
              <p className="text-24 font-500 leading-7 text-blue-300 mt-8 dark:text-white">
                €198.12M
              </p>
            </div>
            <div className="bg-white rounded-[20px] p-5 min-w-[240px] w-1/3 lg:w-full dark:bg-white/10">
              <span className="flex gap-2">
                <IconYieldFarming className="h-4 w-4 text-blue-300 dark:text-white" />
                <p className="text-12 font-500 leading-4 text-gray-300 dark:text-white/30">
                  Vaults
                </p>
              </span>
              <p className="text-24 font-500 leading-7 text-blue-300 mt-8 dark:text-white">
                56
              </p>
            </div>
          </div>
        </div>
      </div>
      <VaultsListing />
    </div>
  );
};

export default YieldFarming;
