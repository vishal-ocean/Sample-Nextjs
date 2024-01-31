"use client";
import { UilBell, UilTimes } from "@/icons";
import Image from "next/image";
import { useContext, useState } from "react";

import { SlideModalContext } from "@/components/SliderModal";
import { Button } from "@/components/UI/Button";
import SingleUpdateNotification from "@/screens/Wealth/Notification/SingleUpdateNotification";

const ProjectUpdateNotification = () => {
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
          <Button
            variant="secondary"
            className="w-auto !py-0 text-14 font-700 leading-4 bg-blue-300 px-3 "
          >
            <UilBell className="w-4 h-4 mx-auto text-white" />
          </Button>
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
      <div className="sm:mt-10 sm:mx-7 mt-6 mx-2">
        {showSingleNotification ? (
          <SingleUpdateNotification />
        ) : (
          <>
            <span className="sm:text-40 font-500 text-blue-300 text-26 leading-10 tracking-[-0.8px]">
              Project updates
            </span>
            <div className="mt-10 overflow-y-auto h-[calc(100vh-250px)] pr-4">
              {[...Array(12)].map((_, index) => (
                <div key={index}>
                  <div
                    className="grid grid-cols-[auto_1fr] gap-4 items-center"
                    // onClick={handleNotificationClick}
                  >
                    <div className="rounded-full w-10 h-10 bg-secondary flex justify-center items-center">
                      <UilBell className="w-4 h-4 text-gray-300" />
                    </div>
                    <div className="w-full flex flex-col">
                      <div className="flex justify-between sm:flex-row flex-col">
                        <span className="text-blue-300 text-16 font-500 leading-5">
                          {index % 2 === 0
                            ? "Fund Raise closed"
                            : "Your offer has been completed"}
                        </span>
                        <span className="text-12 text-gray-300 font-500 self-end sm:self-center leading-4">
                          12.06.23, 12:30 PM
                        </span>
                      </div>
                      <span className="text-gray-300 font-500 leading-4 text-12">
                        We successfully hit the fund raising target of $
                        100,000. We successfully...
                      </span>
                    </div>
                  </div>
                  {[...Array(12)].length - 1 !== index && (
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

export default ProjectUpdateNotification;
