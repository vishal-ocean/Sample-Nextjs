import { UilBell, UilTimes } from "@/icons";
import { useContext, useState } from "react";

import { SlideModalContext } from "@/components/SliderModal";
import { Button } from "@/components/UI/Button";
import HomeSingleNotification from "./HomeSingleNotification";

const HomeNotification = () => {
  const slideModal = useContext(SlideModalContext);
  const [showSingleNotification, setShowSingleNotification] = useState(false);

  const handleGoBackClick = () => {
    setShowSingleNotification(false);
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
              className="w-auto px-4 py-3 text-14 font-700 leading-5"
              onClick={handleGoBackClick}
            >
              Go Back
            </Button>
          )}
          <Button variant="secondary" className="!p-0 w-10 h-10">
            <UilBell
              className="w-4 h-4 mx-auto text-blue-300"
              color="#061935"
              size={16}
            />
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
      <div className="sm:mt-10 sm:ml-7 mt-6">
        {showSingleNotification ? (
          <HomeSingleNotification />
        ) : (
          <>
            <span className="sm:text-40 font-500 text-blue-300 text-26">
              All Updates
            </span>
            <div className="mt-6 sm:mt-10 overflow-y-auto h-[calc(100vh-180px)] sm:h-[calc(100vh-250px)] pr-4">
              {[...Array(10)].map((_, index) => (
                <div key={index}>
                  <div
                    className="flex cursor-pointer"
                    onClick={handleNotificationClick}
                  >
                    <div className="rounded-full w-10 sm:h-9 h-8 bg-yellow-100 flex justify-center items-center">
                      {/*  <Image
                        src="/images/svg/dodo.svg"
                        width={16}
                        height={16}
                        alt=""
                      /> */}
                    </div>
                    <div className="w-full flex flex-col ml-4">
                      <div className="flex justify-between">
                        <span className="text-blue-300 leading-5 font-500 truncate w-32 sm:w-auto">
                          Polkadot’s Hotel Renovation
                        </span>
                        <span className="text-12 text-gray-300 leading-4 font-500 self-end sm:self-center">
                          12.06.23, 12:30
                        </span>
                      </div>
                      <span className="text-gray-300 font-500 sm:text-16 text-14 sm:mt-0 mt-1 line-clamp-2 sm:line-clamp-3">
                        We successfully hit the fund raising target of $
                        100,000. We successfully hit the fund raising target of
                        €100,000. We successfully...
                      </span>
                    </div>
                  </div>
                  {[...Array(10)].length - 1 !== index && (
                    <hr className="my-6" />
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

export default HomeNotification;
