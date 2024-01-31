"use client";
import { UilBell } from "@/icons";
import UpdateNotification from "@/screens/Wealth/Notification/UpdateNotification";
import { cn } from "@/utils";
import { useRef } from "react";
import SlideModal, { SlideModalHandle } from "./SliderModal";
import { Button } from "./UI/Button";

interface UpdateNotificationCardsProps {
  withIcon?: Boolean;
}
const UpdateNotificationCards = ({
  withIcon,
}: UpdateNotificationCardsProps) => {
  const slideModalRef = useRef<SlideModalHandle>(null);
  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-x-2 items-center">
          {withIcon && (
            <div className="bg-secondary w-10 h-10 rounded-3xl flex justify-center items-center">
              <UilBell
                className="w-4 h-4 mx-auto text-blue-100"
                color="#061935"
                size={16}
              />
            </div>
          )}
          <span
            className={cn(
              "text-16 font-500 leading-5",
              withIcon ? "text-blue-300" : "text-blue-300/60"
            )}
          >
            Updates
          </span>
        </div>

        <Button
          variant="secondary"
          className="text-14 font-700 leading-4 h-10 py-0 px-4"
          onClick={() => slideModalRef.current?.open()}
        >
          See All
        </Button>
      </div>
      <SlideModal ref={slideModalRef} className="max-w-[656px]">
        <div className="h-full max-h-screen" id="notification-slide-modal">
          <UpdateNotification />
        </div>
      </SlideModal>
      <div className="mt-4 grid grid-cols-4 gap-2">
        {[...Array(4)].map((_, index) => (
          <div
            className="rounded-[28px] bg-white p-5 flex flex-col gap-y-5"
            key={`UpdateNotificationCards-${index}`}
          >
            <div className="flex justify-between items-center">
              <span className="rounded-full w-10 h-10 bg-yellow-100 flex justify-center items-center">
                {/*    <Image
                 src="/images/svg/dodo.svg"
                  width={16}
                  height={16}
                  alt="dodo logo"
                  className="h-4 w-4"
        /> */}
              </span>
              <span className="text-12 text-gray-300 font-500 leading-4">
                Today, 12:30
              </span>
            </div>
            <div className="flex flex-col gap-y-2">
              <span className="text-16 font-500 text-blue-300 leading-5">
                Polkadot’s Hotel Renovation
              </span>
              <span className="text-16 font-500 text-gray-300 whitespace-break-spaces leading-5">
                We successfully hit the fund raising target of €100,000
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UpdateNotificationCards;
