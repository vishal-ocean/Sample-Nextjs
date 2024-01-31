import ImageSliderModal from "@/components/ImageSliderModal";
import { SlideModalContext } from "@/components/SliderModal";
import { Button } from "@/components/UI/Button";
import { VIEW_IMAGE_SLIDER_MODAL } from "@/constants";
import { PropertyDataType } from "@/constants/PropertyData";
import { UilTimes } from "@/icons";
import { useHandleModalAction, useHandleModalStore } from "@/store/handleModal";
import { useContext, useState } from "react";
import Masonry from "react-responsive-masonry";

interface ImageSliderProps {
  propertyData: PropertyDataType;
}
const ImageSlider = ({ propertyData }: ImageSliderProps) => {
  const slideModal = useContext(SlideModalContext);
  const { modalOpen } = useHandleModalStore();
  const { setHandleModal } = useHandleModalAction;
  const [imageIndex, setImageIndex] = useState<number>(0);
  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-x-2 items-center">
          <span className="rounded-full w-10 h-10 bg-yellow-100 flex justify-center items-center">
            {/*    <Image
              src="/images/svg/dodo.svg"
              width={16}
              height={16}
              alt="dodo logo"
              className="h-4 w-4"
  /> */}
          </span>
          <div className="flex flex-col">
            <span className="text-blue-300 text-12 font-500 leading-4">
              {propertyData?.property_name || ""}
            </span>
            <span className="text-gray-300 text-12 font-500 leading-4">
              by {propertyData.owner_details.name || ""}
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
      <div className="mt-8 sm:mt-10 sm:px-7 flex flex-col gap-y-6 sm:gap-y-10">
        <span className="text-[40px] font-500 tracking-[-0.8px] text-blue-300 leading-10">
          {propertyData.property_images?.length || 0} photos
        </span>
        <div className="overflow-y-auto h-[calc(100vh-250px)]">
          <Masonry columnsCount={2} gutter="8px">
            {propertyData?.property_images?.map(
              (image: string, index: number) => ({
                /*      <Image
                  key={`images-${index}`}
                  src={image}
                  height={276}
                  width={276}
                  alt="masonry"
                  className="w-full block rounded-[16px] cursor-pointer"
                  onClick={() => {
                    setHandleModal(VIEW_IMAGE_SLIDER_MODAL);
                    setImageIndex(index);
                  }}
                /> */
              })
            )}
          </Masonry>
        </div>
      </div>
      {modalOpen === VIEW_IMAGE_SLIDER_MODAL && (
        <ImageSliderModal
          images={propertyData?.property_images}
          initialSlide={imageIndex}
          modalType={VIEW_IMAGE_SLIDER_MODAL}
        />
      )}
    </>
  );
};

export default ImageSlider;
