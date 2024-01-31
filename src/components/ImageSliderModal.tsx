"use client";
import { UilAngleLeftB, UilAngleRightB, UilTimes } from "@/icons";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import Image from "next/image";
import { useRef, useState } from "react";
import Slider from "react-slick";
import { Button } from "./UI/Button";
import { Dialog, DialogContentWithoutClose, DialogTrigger } from "./UI/Dialog";

interface ImageSliderModalProps {
  modalType: string;
  images: string[];
  initialSlide: number;
}

const ImageSliderModal = ({
  modalType,
  images,
  initialSlide,
}: ImageSliderModalProps) => {
  const slickSliderRef = useRef<any>();
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const [currentSlide, setCurrentSlide] = useState(initialSlide);

  const sliderSettings = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: initialSlide,
    arrows: false,
    fade: true,
    afterChange: (current: number) => setCurrentSlide(current),
  };

  return (
    <Dialog
      open={modalOpen === modalType}
      onOpenChange={(e: boolean) => setHandleModal(e ? modalType : "")}
    >
      <DialogTrigger />
      <DialogContentWithoutClose className="sm:max-w-[1100px] max-w-[360px] max-[640px]:max-h-[360px] py-0 px-2 bg-transparent border-none shadow-none">
        <Button
          variant="secondary"
          className="!p-0 w-10 h-10 flex justify-self-center"
          onClick={() => setHandleModal("")}
        >
          <UilTimes className="w-4 h-4 mx-auto text-blue-300" />
        </Button>
        <Slider
          {...sliderSettings}
          ref={slickSliderRef}
          className="2xl:max-h-[620px] 2xl:max-w-[1100px] lg:max-h-[542px] lg:max-w-[920px] sm:max-w-[640px] sm:max-h-[380px] max-w-[356px] max-h-[220px]"
        >
          {images.map((img, i) => (
            <Image
              key={i}
              width={0}
              height={0}
              sizes="100vw"
              src={img}
              alt="slider-image"
              className="w-full h-full 2xl:max-h-[620px] lg:max-h-[542px] sm:max-h-[380px] max-h-[220px] rounded-[16px] object-contain"
            />
          ))}
        </Slider>
        <div className="flex justify-between items-center">
          <Button
            variant="secondary"
            className="!p-0 w-10 h-10 flex justify-self-center"
            onClick={() => slickSliderRef.current.slickPrev()}
          >
            <UilAngleLeftB className="w-4 h-4 mx-auto text-blue-300" />
          </Button>
          <span className="font-500 text-white leading-5 bg-blue-300/10 py-2 px-3 rounded-3xl">
            {`${currentSlide + 1}/${images.length}`}
          </span>
          <Button
            variant="secondary"
            className="!p-0 w-10 h-10 flex justify-self-center"
            onClick={() => {
              slickSliderRef.current.slickNext();
            }}
          >
            <UilAngleRightB className="w-4 h-4 mx-auto text-blue-300" />
          </Button>
        </div>
      </DialogContentWithoutClose>
    </Dialog>
  );
};

export default ImageSliderModal;
