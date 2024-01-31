"use client";

import { Button } from "@/components/UI/Button";
import { Progress } from "@/components/UI/ProgressBar";
import {
  ADD_CARD_MODAL,
  CHANGE_PASSWORD,
  CHECK_EMAIL,
  DISCLAIMER_MODAL,
  REMOVE_CARD,
  VERIFICATION_MODAL,
} from "@/constants";
import { Tier } from "@/constants/headerStaticData";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { cn } from "@/utils";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const ProfileTabs = dynamic(() => import("./ProfileTabs"));

const AddCardModal = dynamic(() =>
  import("./TabContent/modals/AddCardModal").then((mod) => mod.AddCardModal)
);
const ChangePasswordModal = dynamic(() =>
  import("./TabContent/modals/ChangePasswordModal").then(
    (mod) => mod.ChangePasswordModal
  )
);
const CheckEmailModal = dynamic(() =>
  import("./TabContent/modals/CheckEmailModal").then(
    (mod) => mod.CheckEmailModal
  )
);
const DisclaimerModal = dynamic(() =>
  import("./TabContent/modals/DisclaimerModal").then(
    (mod) => mod.DisclaimerModal
  )
);
const RemoveCardModal = dynamic(() =>
  import("./TabContent/modals/RemoveCardModal").then(
    (mod) => mod.RemoveCardModal
  )
);
const VerificationModal = dynamic(() =>
  import("./TabContent/modals/VerificationModal").then(
    (mod) => mod.VerificationModal
  )
);

type ProfileProps = {
  modalOpen: string;
  setHandleModal: (payload: string) => void;
};
export const Profile = ({ modalOpen, setHandleModal }: ProfileProps) => {
  // const [tabValue, setTabValue] = useState<string>("verification");
  const [progress, setProgress] = useState(0);
  const { profileTab } = useHandleModalStore();
  const { setProfileTab } = useHandleModalAction;

  // useEffect(() => {
  //   setProgress(0);
  // }, [Tier]);

  useEffect(() => {
    Tier.map(
      (value, index) =>
        value.currentTier &&
        setTimeout(
          () => setProgress((value.currentWave * 100) / value.wave),
          500
        )
    );
  }, [Tier]);
  return (
    <>
      {Tier.map(
        (value, index) =>
          value.currentTier && (
            <div
              className="relative mx-0 sm:mx-10 lg:mx-4 xl:mx-0 rounded-b-xl sm:rounded-[24px] sm:overflow-hidden dark:outline-1 -z-10 sm:z-0 bg-black dark:outline-white/15"
              key={index}
            >
              <hr className="border-t border-white/15 sm:border-none mx-6" />
              <div
                className={cn(
                  "w-[1441px] h-[1441px] rounded-full blur-[200px] absolute -z-10 right-44 tier-progress",
                  progress > 50 && "right-[8%]",
                  index == 0 ? value.bgSecondary : value.bgColor
                )}
                style={{
                  transform: `translateY(-${80 + (progress * 20) / 100 - 10}%)`,
                }}
              />
              <div
                className={cn(
                  "w-full h-[1441px] absolute tier-progress bg-black bottom-0 -z-20 sm:hidden"
                )}
              />
              <div
                className={cn(
                  "w-[611px] h-[611px] rounded-full blur-[200px] absolute right-1/3 top-full -z-20 tier-progress",
                  progress > 50 && "!w-10/12 right-[10%]",
                  index !== Tier.length - 1 && Tier[index + 1].bgColor
                )}
                style={{
                  transform: `translateY(-${progress}%)`,
                }}
              />

              <div className="p-6 sm:p-12 relative z-10 bg-transparent">
                <div className="flex justify-between">
                  <p className="text-white/25 text-16 font-500 leading-5">
                    <span className="sm:hidden">Your Tier</span>
                  </p>
                  <div className="h-10 w-10 hidden sm:flex justify-center text-white items-center bg-white/10 relative ml-10 sm:ml-[100px] overflow-hidden rounded-full">
                    <div
                      className={cn(
                        "h-10 w-10  blur-md rounded-full -z-10 absolute top-2/3",
                        value.bgColor
                      )}
                    />
                    {value.tierIcon}
                  </div>

                  <Button
                    className="text-14 font-700 leading-4 rounded-full py-3 px-4 bg-secondary/15 text-white w-max hidden sm:flex"
                    onClick={() => setProfileTab("tiers")}
                  >
                    Upgrade Tier
                  </Button>

                  <p className="text-16 font-500 leading-5 text-white sm:hidden capitalize">
                    {value.tierName}
                    {/* {value.currentWave.toLocaleString()} WAVE */}
                  </p>
                </div>
                <div className="h-10 w-10 mx-auto mt-[77px] sm:hidden flex justify-center text-white items-center bg-white/10 relative overflow-hidden rounded-full">
                  <div
                    className={cn(
                      "h-10 w-10  blur-md rounded-full -z-10 absolute top-2/3",
                      value.bgColor
                    )}
                  />
                  {value.tierIcon}
                </div>
                {/* <p className="text-white capitalize text-40 font-500 leading-10 tracking-[-0.8px] text-center mt-6 sm:mt-8 sm:hidden">
                  {value.tierName}
                </p> */}
                <div className="flex flex-col items-center mt-6 sm:mt-5">
                  <div className="hidden sm:flex gap-2">
                    <p className="text-16 font-500 leading-5 text-white/30">
                      Your Tier
                    </p>
                    <p className="text-16 font-500 leading-5 text-white capitalize ">
                      {value.tierName}
                    </p>
                  </div>
                  <div className="flex gap-2 sm:mt-3">
                    <p className="text-40 font-500 leading-10 text-white capitalize tracking-[-0.8px]">
                      {value.currentWave.toLocaleString()}
                    </p>
                    <p className="text-40 font-500 leading-10 text-white/30 tracking-[-0.8px]">
                      WAVE
                    </p>
                  </div>
                </div>
                <div className="flex items-center sm:justify-between sm:items-end mt-[60px] sm:mt-9 flex-col sm:flex-row">
                  <p className="text-16 font-500 leading-5 text-white hidden sm:block">
                    {/* {value.currentWave.toLocaleString()} WAVE */}
                  </p>
                  <div className="w-[300px] sm:w-[360px] h-20 sm:absolute flex bottom-0 gap-5 items-end sm:left-[35%] ml-8 sm:ml-3 overflow-hidden">
                    {[...Array(60)].map((_, progressIndex) => (
                      <div
                        key={`ruler-${progressIndex}`}
                        className={cn(
                          "w-0.5 bg-white h-10 border border-white rounded-full [&:nth-child(10n+0)]:h-20 tier-ruler-progress",
                          progressIndex == 1 && "hidden",
                          (progressIndex == 0 || progressIndex == 2) &&
                            "hidden sm:block"
                          // 10 * (index + 1) == progressIndex && "h-20" window.innerWidth < 640 ? 220 :
                        )}
                        style={{
                          transform: `translateX(-${
                            (220 * (index + 1) * progress) / 100
                          }px)`,
                        }}
                      ></div>
                    ))}
                  </div>
                  <div className="mt-6 sm:mt-0 w-full sm:w-auto">
                    <div className="flex justify-between">
                      <p className="text-16 font-500 leading-5 text-white/30">
                        {`${(value.wave - value.currentWave).toLocaleString()}`}{" "}
                        WAVE left to
                      </p>
                      <span className="text-16 font-500 leading-5 text-white flex gap-2 items-center capitalize">
                        {index !== Tier.length - 1 && Tier[index + 1].tierName}
                        {index !== Tier.length - 1 && Tier[index + 1].tierIcon}
                      </span>
                    </div>
                    <Progress
                      fieldProgressClass="bg-white tier-progress"
                      className="bg-white/10 w-full sm:w-[282px] mt-3"
                      value={progress}
                    />
                  </div>
                </div>
              </div>
            </div>
          )
      )}
      <div className="pt-6 bg-gray-200 dark:bg-black sm:dark:bg-transparent sm:bg-transparent relative sm:static z-0 sm:z-10">
        <ProfileTabs tabValue={profileTab} setTabValue={setProfileTab} />
      </div>
      {modalOpen === CHANGE_PASSWORD && (
        <ChangePasswordModal
          modalOpen={modalOpen}
          setHandleModal={setHandleModal}
        />
      )}
      {modalOpen === CHECK_EMAIL && (
        <CheckEmailModal
          modalOpen={modalOpen}
          setHandleModal={setHandleModal}
        />
      )}
      {modalOpen === REMOVE_CARD && (
        <RemoveCardModal
          modalOpen={modalOpen}
          setHandleModal={setHandleModal}
        />
      )}
      {modalOpen === ADD_CARD_MODAL && (
        <AddCardModal modalOpen={modalOpen} setHandleModal={setHandleModal} />
      )}
      {modalOpen === VERIFICATION_MODAL && (
        <VerificationModal
          modalOpen={modalOpen}
          setHandleModal={setHandleModal}
        />
      )}
      {modalOpen === DISCLAIMER_MODAL && (
        <DisclaimerModal
          modalOpen={modalOpen}
          setHandleModal={setHandleModal}
        />
      )}
    </>
  );
};
