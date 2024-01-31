'use client';
import { UilChart, UilGraphBar, UilTimes } from '@/icons';
import Image from 'next/image';
import { useContext } from 'react';

import { SlideModalContext } from '@/components/SliderModal';
import { Button } from '@/components/UI/Button';

const EarningNotification = () => {
  const slideModal = useContext(SlideModalContext);

  return (
    <>
      <div className="flex justify-between">
        <div className="h-10 w-10 rounded-3xl bg-success-200 flex justify-center items-center">
          <UilChart className="w-4 h-4 text-white" />
        </div>
        <Button
          variant="secondary"
          className="!p-0 w-10 h-10"
          onClick={() => slideModal?.close()}
        >
          <UilTimes className="w-4 h-4 mx-auto text-blue-300" />
        </Button>
      </div>
      <div className="sm:mt-8 sm:mx-8 mt-5 mx-0">
        <span className="sm:text-40 font-500 text-blue-300 text-24 leading-7 sm:leading-10">
          All Earnings
        </span>
        <div className="mt-6 sm:mt-8 overflow-y-auto h-[calc(100vh-250px)] pr-2 sm:pr-4">
          <div className="rounded-[24px] bg-gray-100 flex flex-col gap-y-4 px-5 py-[60px] justify-center items-center mb-5">
            <div className="flex justify-center items-center">
              <div className="w-10 h-10 bg-secondary rounded-full border-2 border-gray-100 dark:bg-gray-600 dark:border-gray-800" />
              <div className="w-10 h-10 bg-secondary rounded-full -ml-4 border-2 border-gray-100 dark:bg-gray-600 dark:border-gray-800" />
              <div className="w-10 h-10 bg-secondary rounded-full -ml-4 border-2 border-gray-100 flex justify-center items-center dark:bg-gray-600 dark:border-gray-800">
                <UilGraphBar className="w-4 h-4 mx-auto text-gray-300  dark:text-gray-800" />
              </div>
            </div>
            <span className="text-16 text-gray-300 font-500 leading-5">
              You have no earnings yet
            </span>
          </div>
          {[...Array(10)].map((_, index) => (
            <div key={index}>
              <div className="flex w-full justify-between items-center">
                <div className="flex gap-x-3 sm:gap-x-4 items-center">
                  <div className="rounded-full w-10 h-10 bg-orange-100 flex justify-center items-center">
                    <Image
                      src="/images/svg/icon-BTC.svg"
                      width={16}
                      height={16}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-blue-300 font-500 leading-5 w-max">
                      {index % 2 === 0 ? 'Rental Income' : 'Annual Returns'}
                    </span>
                    <span className="text-12 text-gray-300 font-500 w-2/3 sm:w-auto truncate">
                      P79 • Polkadot’s Hotel Renovation
                    </span>
                  </div>
                </div>
                <div className="flex flex-col font-500">
                  <p className="text-success-200 text-right leading-5 whitespace-nowrap">
                    + €25,000
                  </p>
                  <span className="text-12 text-gray-300 self-end sm:self-center whitespace-nowrap">
                    12.06.23, 12:30
                  </span>
                </div>
              </div>
              {[...Array(10)].length - 1 !== index && (
                <hr className="my-5 sm:my-6" />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EarningNotification;
