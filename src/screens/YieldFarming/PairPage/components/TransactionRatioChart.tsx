'use client';
import { UilInfoCircle } from '@/icons';
import Image from 'next/image';

const TransactionRatioChart = () => {
  return (
    <div className="md:col-span-4 col-span-6 bg-white md:h-[416px] sm:h-[360px]  rounded-[24px] p-5 w-full dark:bg-white/10">
      <div className="flex justify-end">
        <UilInfoCircle className="h-4 w-4" />
      </div>
      <div className="mt-9 sm:mt-6 md:mt-9 flex flex-col justify-between h-[calc(100%-56px)]">
        <div className="mx-auto mb-8 sm:mb-0 justify-center">
          <Image
            width={160}
            height={160}
            src="/images/svg/transaction-ratio.svg"
            alt="image"
          />
        </div>
        <div className="border-t-2 pt-6 dark:border-white/15">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Image
                  width={24}
                  height={24}
                  src="/images/svg/icon-BTC.svg"
                  alt="image"
                ></Image>
                <div className="absolute -top-1 -right-1 h-3 w-3 border-2 border-white  dark:border-black rounded-full bg-primary"></div>
              </div>
              <div className="text-16 font-500 leading-5 text-blue-300 dark:text-white">
                67.54%
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-16 font-500 leading-5 text-blue-300 dark:text-white">
                67.54%
              </div>
              <div className="relative">
                <Image
                  width={24}
                  height={24}
                  src="/images/svg/icon-USDT.svg"
                  alt="image"
                ></Image>
                <div className="absolute -top-1 -right-1 h-3 w-3 border-2 border-white  dark:border-black rounded-full bg-black"></div>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-[22px]">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Image
                  width={24}
                  height={24}
                  src="/images/svg/icon-ETH.svg"
                  alt="image"
                ></Image>
                <div className="absolute -top-1 -right-1 h-3 w-3 border-2 border-white  dark:border-black rounded-full bg-gray-300"></div>
              </div>
              <div className="text-16 font-500 leading-5 text-blue-300 dark:text-white">
                67.54%
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-16 font-500 leading-5 text-blue-300 dark:text-white">
                67.54%
              </div>
              <div className="relative">
                <Image
                  width={24}
                  height={24}
                  src="/images/svg/icon-XRP.svg"
                  alt="image"
                ></Image>
                <div className="absolute -top-1 -right-1 h-3 w-3 border-2 border-white  dark:border-black rounded-full bg-secondary"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionRatioChart;
