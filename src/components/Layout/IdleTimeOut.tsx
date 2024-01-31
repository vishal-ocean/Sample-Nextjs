"use client";
import { IDLE_WARNING_MODAL } from "@/constants";
import { UilExclamationTriangle } from "@/icons";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { cn, logout } from "@/utils";
import { useEffect, useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import CustomModal from "../CustomModal";
import { Button, buttonVariants } from "../UI/Button";

const IdleTimeOut = () => {
  const { modalOpen } = useHandleModalStore();
  const timeout =
    modalOpen === IDLE_WARNING_MODAL ? 5 * 60 * 1000 : 18 * 60 * 1000;
  const { setHandleModal } = useHandleModalAction;
  const [remaining, setRemaining] = useState(timeout);
  const [logoutTimer, setLogoutTimer] = useState(0);

  useEffect(() => {
    if (modalOpen === IDLE_WARNING_MODAL) {
      setLogoutTimer(5 * 60);
    }
  }, [modalOpen]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (logoutTimer > 0) {
        setLogoutTimer(logoutTimer - 1);
      }
    }, 1000);

    if (modalOpen && logoutTimer === 0) {
      logout();
    }

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logoutTimer]);

  const { getRemainingTime } = useIdleTimer({
    timeout,
  });

  useEffect(() => {
    setRemaining(getRemainingTime());
    setInterval(() => {
      setRemaining(getRemainingTime());
    }, 1000);
  }, [getRemainingTime]);

  useEffect(() => {
    if (!modalOpen && Math.ceil(remaining / (60 * 1000)) === 5) {
      setLogoutTimer(5 * 60);
      setHandleModal(IDLE_WARNING_MODAL);
    }
    if (remaining === 0) {
      logout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining]);

  const handleOpenChange = (e: boolean) => {
    setHandleModal(e ? IDLE_WARNING_MODAL : "");
  };

  return (
    <>
      <CustomModal
        open={modalOpen === IDLE_WARNING_MODAL}
        onOpenChange={handleOpenChange}
        className="sm:max-w-[520px]"
      >
        <div className="flex sm:flex-row flex-col sm:gap-y-0 gap-y-5 sm:justify-between">
          <div className="flex gap-x-2 items-center">
            <span className="bg-blue-300 dark:bg-primary rounded-3xl h-10 w-10 flex justify-center items-center">
              <UilExclamationTriangle className="h-4 w-4 text-white" />
            </span>
            <p className="text-12 text-blue-300 dark:text-white font-500 leading-4">
              Warning
            </p>
          </div>
        </div>
        <div className="mt-5 flex justify-center items-center flex-col">
          <span className="text-24 font-500 text-blue-300 dark:text-white leading-7 text-center w-[258px]">
            You will be logged out in {Math.floor(logoutTimer / 60)}m{" "}
            {logoutTimer % 60}sec
          </span>
          <span className="mt-5 text-16 text-gray-300 dark:text-white/30 font-500 leading-5 text-center w-[258px]">
            Your session is about to expire. Do you want to stay signed in?
          </span>
          <div className="mt-10 flex gap-x-2">
            <a
              href="/api/auth/logout"
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "py-4 px-4 sm:px-6  text-16 font-700 text-blue-300 leading-5"
              )}
            >
              Sign me out
            </a>
            <Button
              className="py-4 px-4 sm:px-6 text-16 font-700 leading-5"
              onClick={() => setHandleModal("")}
            >
              Keep me signed in
            </Button>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default IdleTimeOut;
