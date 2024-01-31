'use client';
import { Button } from '@/components/UI/Button';
import { UilAngleLeftB } from '@/icons';
import Image from 'next/image';

const Banner = () => {
  return (
    <div className="bg-white md:p-12 p-5 rounded-[24px] relative lg:mx-4 mx-5 xl:mx-0 sm:h-[220px] md:h-auto  dark:bg-white/10">
      <div className="flex justify-between">
        <div className="flex items-center">
          <Button
            variant="secondary"
            className="rounded-3xl text-blue-300  h-10 w-10 md:h-fit md:w-fit md:py-4 md:px-6 p-0 font-700 leading-5 dark:text-white dark:bg-white/15"
          >
            <UilAngleLeftB className="block md:hidden h-4 w-4" />
            <span className="hidden md:block">Go Back</span>
          </Button>
          <div className="ms-5 md:hidden sm:flex hidden">
            <Button
              variant="secondary"
              size="sm"
              className="leading-4 font-700 text-14 text-white bg-purple-500 py-3 px-4"
            >
              <Image
                width={16}
                height={16}
                alt="icon"
                src="/images/svg/icon-MATIC.svg"
              />
              <span className="ms-2">Matic</span>
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="leading-4 font-700 text-14 text-blue-300 dark:text-white bg-blue-250 py-3 px-4 ms-1"
            >
              <Image
                width={16}
                height={16}
                alt="icon"
                src="/images/svg/pancake-swap.svg"
              />
              <span className="ms-2">Pancake Swap</span>
            </Button>
          </div>
        </div>
        <div>
          <p className="text-gray-300 dark:text-white/30 text-12 flex justify-end">
            Last Harvest
          </p>
          <p className="text-blue-300 dark:text-white font-500 text-16 leading-5">
            4 minutes ago
          </p>
        </div>
      </div>
      <div className="md:mt-[80px] sm:mt-16 mt-11 flex justify-between flex-wrap items-center">
        <div className="flex flex-wrap ">
          <div className="text-blue-300 dark:text-white font-500 lg:text-56 md:text-40 text-32 flex leading-[56px]">
            <span>BTC</span>
            <span className="md:ms-3 ms-2">
              <Image
                width={24}
                height={24}
                alt="icon"
                src="/images/svg/icon-BTC.svg"
              />
            </span>
            <span className="text-gray-300 dark:text-white/30 md:mx-3 mx-2">
              /
            </span>
          </div>
          <div className="text-blue-300 dark:text-white font-500 lg:text-56 md:text-40 text-32 flex leading-[56px]">
            <span>USDT</span>
            <span className="md:ms-3 ms-2">
              <Image
                width={24}
                height={24}
                alt="icon"
                src="/images/svg/icon-USDT.svg"
              />
            </span>
            <span className="text-gray-300 dark:text-white/30 md:mx-3 mx-2">
              /
            </span>
          </div>
          <div className="text-blue-300 dark:text-white font-500 lg:text-56 md:text-40 text-32 flex leading-[56px]">
            <span>ETH</span>
            <span className="md:ms-3 ms-2">
              <Image
                width={24}
                height={24}
                alt="icon"
                src="/images/svg/icon-ETH.svg"
              />
            </span>
            <span className="text-gray-300 dark:text-white/30 md:mx-3 mx-2">
              /
            </span>
          </div>
          <div className="text-blue-300 dark:text-white font-500 lg:text-56 md:text-40 text-32 flex leading-[56px]">
            <span>XRP</span>
            <span className="md:ms-3 ms-2">
              <Image
                width={24}
                height={24}
                alt="icon"
                src="/images/svg/icon-XRP.svg"
              />
            </span>
          </div>
        </div>

        <div className="md:mt-0 sm:mt-0 mt-5  md:block sm:hidden flex">
          <Button
            variant="secondary"
            size="sm"
            className="leading-4 font-700 text-14 text-white bg-purple-500 py-3 px-4"
          >
            <Image
              width={16}
              height={16}
              alt="icon"
              src="/images/svg/icon-MATIC.svg"
            />
            <span className="ms-2">Matic</span>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="leading-4 font-700 text-14 text-blue-300  bg-blue-250 py-3 px-4 ms-1"
          >
            <Image
              width={16}
              height={16}
              alt="icon"
              src="/images/svg/pancake-swap.svg"
            />
            <span className="ms-2">Pancake Swap</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
