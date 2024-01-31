'use client';
import { UilBell, UilTimes } from '@/icons';
import Image from 'next/image';
import { useContext, useState } from 'react';

import { SlideModalContext } from '@/components/SliderModal';
import { Button } from '@/components/UI/Button';
import SingleUpdateNotification from './SingleUpdateNotification';

const UpdateNotification = () => {
  const slideModal = useContext(SlideModalContext);
  const [showSingleNotification, setShowSingleNotification] = useState(false);

  const handleGoBackClick = () => {
    if (showSingleNotification) {
      setShowSingleNotification(false);
    } else {
      slideModal?.close();
    }
  };

  const handleNotificationClick = () => {
    setShowSingleNotification(true);
  };
  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-x-2">
          {showSingleNotification && (
            <Button
              variant="secondary"
              className="w-auto !py-0 text-14 font-700 leading px-4"
              onClick={() => setShowSingleNotification(false)}
            >
              Go Back
            </Button>
          )}
          <Button
            variant="secondary"
            className="w-auto !py-0 text-14 font-700 leading-4 bg-blue-300 px-3 "
          >
            <UilBell className="w-4 h-4 mx-auto text-white" />
          </Button>
        </div>
        <Button
          variant="secondary"
          className="!p-0 w-10 h-10"
          onClick={() => slideModal?.close()}
        >
          <UilTimes className="w-4 h-4 mx-auto text-blue-300" />
        </Button>
      </div>
      <div className="sm:mt-10 mt-5 sm:mx-7 ">
        {showSingleNotification ? (
          <SingleUpdateNotification />
        ) : (
          <>
            <span className="sm:text-40 font-500 text-blue-300 text-26 leading-10">
              All Updates
            </span>
            <div className="sm:mt-10 mt-6 overflow-y-auto h-[calc(100vh-250px)] pr-2 sm:pr-4">
              <div className="rounded-[24px] bg-gray-100 flex flex-col gap-y-4 px-5 py-[60px] justify-center items-center mb-5">
                <div className="flex justify-center items-center">
                  <div className="w-10 h-10 bg-secondary rounded-full border-2 border-gray-100 dark:bg-gray-600 dark:border-gray-800" />
                  <div className="w-10 h-10 bg-secondary rounded-full -ml-4 border-2 border-gray-100 dark:bg-gray-600 dark:border-gray-800" />
                  <div className="w-10 h-10 bg-secondary rounded-full -ml-4 border-2 border-gray-100 flex justify-center items-center dark:bg-gray-600 dark:border-gray-800">
                    <UilBell className="w-4 h-4 mx-auto text-gray-300  dark:text-gray-800" />
                  </div>
                </div>
                <span className="text-16 text-gray-300 font-500 leading-5">
                  You have no updates yet
                </span>
              </div>
              {[...Array(10)].map((_, index) => (
                <div key={index}>
                  <div
                    className="grid grid-cols-[auto_1fr] cursor-pointer gap-3 sm:gap-4 items-center"
                    onClick={handleNotificationClick}
                  >
                    <div className="rounded-full w-10 h-10 bg-orange-100 flex justify-center items-center">
                      <Image
                        src="/images/svg/icon-BTC.svg"
                        width={16}
                        height={16}
                        alt=""
                      />
                    </div>
                    <div className=" flex justify-between ">
                      <div className="flex justify-between flex-col">
                        <span className="text-blue-300 text-16 font-500 leading-5 truncate w-36 sm:10/12">
                          {index % 2 === 0
                            ? 'Fund Raise closed'
                            : 'Your offer has been completed'}
                        </span>
                        <span className="text-gray-300 font-500 text-12 leading-4 truncate w-36 sm:10/12">
                          {index % 2 === 0
                            ? 'P79 • Polkadot’s Hotel Renovation'
                            : 'We successfully hit the fund raising target of €100,000. We successfully...'}
                        </span>
                      </div>
                      <span className="text-12 text-gray-300 font-500 leading-4 whitespace-nowrap self-start ">
                        12.06.23, 12:30 PM
                      </span>
                    </div>
                  </div>
                  {[...Array(10)].length - 1 !== index && (
                    <hr className="my-5" />
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UpdateNotification;
