import { Button } from "@/components/UI/Button";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/UI/Dropdown";
import { Input } from "@/components/UI/form/Input";
import { IconBook } from "@/components/icons/IconBook";
import IconGold from "@/components/icons/IconGold";
import { IconRoundedPlus } from "@/components/icons/IconRoundedPlus";
import { LEARNING_MODAL, VIDEO_MODAL } from "@/constants";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { UilAngleDown, UilPlay, UilSearch } from "@iconscout/react-unicons";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { useProfileStaticData } from "../useProfileStaticData";

const LearningModal = dynamic(() =>
  import("./modals/LearningModal").then((mod) => mod.LearningModal)
);
const VideoModal = dynamic(() =>
  import("./modals/VideoModal").then((mod) => mod.VideoModal)
);

export const LearningCenter = () => {
  const [videoContentTitle, setVideoContentTitle] = useState("");
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const { VIDEO_DATA } = useProfileStaticData();
  return (
    <>
      <div className="mt-10">
        <div className="flex items-center justify-between gap-1">
          <div className="relative rounded-[28px] bg-white dark:bg-white/10 flex items-center order-1 sm:order-2 w-full sm:w-[324px]">
            <div className="flex justify-center absolute text-center pl-4 pointer-events-none">
              <UilSearch className="h-4 w-4 text-blue-300 dark:text-white" />
            </div>
            <Input
              type="text"
              id="search-assets"
              className="input w-full leading-5 rounded-3xl outline-none py-2 pl-10 sm:placeholder:text-16 placeholder:text-gray-300 placeholder:font-700 placeholder:font-body placeholder:text-14 text-14 md:text-16 font-700 font-body cursor-pointer text-blue-300 bg-transparent border-none lg:h-fit h-10"
              placeholder="Search"
              required
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex justify-between items-center w-[140px] bg-secondary dark:bg-white/15 dark:text-white px-4 py-3 rounded-full text-14 leading-4 font-500 order-2">
              All
              <UilAngleDown className="h-4 w-4 text-blue-300 dark:text-white" />
            </DropdownMenuTrigger>
          </DropdownMenu>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5 gap-2">
          {VIDEO_DATA.map((value, index) => (
            <div className="relative h-[305px]" key={`video-${index}`}>
              <Image
                src={value.bgImage}
                height={500}
                width={500}
                alt=""
                className="w-full h-full absolute -z-10 rounded-[16px]"
              />
              <div className="pl-5 pb-5 pt-2 pr-2 flex flex-col justify-between h-full">
                <div>
                  <div className="flex justify-between items-center">
                    <p className="text-12 font-500 leading-4 text-white/60">
                      {value.type}
                    </p>
                    <Button className="x-4 py-3 text-14 font-700 leading-4 text-white bg-secondary/10 backdrop-blur-[6px]">
                      ~ {value.videoDuration}
                    </Button>
                  </div>
                  <p className="text-16 font-500 leading-5 text-white mt-5 w-[170px]">
                    {value.videoTitle}
                  </p>
                  <p className="text-12 font-500 leading-4 text-white/60 mt-1.5 w-[170px]">
                    {value.sunContent}
                  </p>
                </div>
                <div className="pr-3">
                  <div
                    className="flex justify-between cursor-pointer"
                    onClick={() => {
                      setVideoContentTitle(value.videoSubTitle),
                        setHandleModal(VIDEO_MODAL);
                    }}
                  >
                    <p className="text-12 font-500 leading-4 text-white/60">
                      {value.videoSubTitle}
                    </p>
                    <UilPlay className="h-4 w-4 text-white" />
                  </div>
                  <hr className="my-3 border-white/20" />
                  <div
                    className="flex justify-between cursor-pointer"
                    onClick={() => {
                      setVideoContentTitle(value.videoSubTitle),
                        setHandleModal(LEARNING_MODAL);
                    }}
                  >
                    <p className="text-12 font-500 leading-4 text-white/60">
                      Deep Dive
                    </p>
                    <IconBook
                      strokeWidth={1.2}
                      className="h-4 w-4 text-white"
                    />
                  </div>
                  <Button className="px-4 py-3 text-14 font-700 leading-4 text-white bg-secondary/10 flex gap-x-1 w-[calc(100%-32px)] justify-normal mt-5">
                    {value.type === "wealth" ? (
                      <IconGold className="h-4 w-4" />
                    ) : (
                      <IconRoundedPlus className="h-4 w-4" />
                    )}

                    {value.action}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {modalOpen === VIDEO_MODAL && (
        <VideoModal videoContentTitle={videoContentTitle} />
      )}
      {modalOpen === LEARNING_MODAL && (
        <LearningModal videoContentTitle={videoContentTitle} />
      )}
    </>
  );
};
