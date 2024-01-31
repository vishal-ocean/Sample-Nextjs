"use client";
import SlideModal, { SlideModalHandle } from "@/components/SliderModal";
import { Button } from "@/components/UI/Button";
import { PropertyDataType } from "@/constants/PropertyData";
import { UilAngleRightB } from "@/icons";
import { useRef } from "react";
import ImageSlider from "./ImageSlider";
interface RightCardSectionProps {
  propertyData: PropertyDataType;
}
const RightCardSection = ({ propertyData }: RightCardSectionProps) => {
  const slideModalRef = useRef<SlideModalHandle>(null);
  return (
    <div className="w-full sm:col-span-6 md:col-span-4 lg:col-span-3 row-auto">
      <div className="rounded-[24px] bg-white p-5 lg:p-8 gap-y-4 lg:gap-y-6 flex flex-col">
        <div className="flex flex-col gap-y-2">
          <span className="text-gray-300 text-12 font-500 leading-4">
            Interest Rate
          </span>
          <span className="text-blue-300 text-16 font-500 whitespace-break-spaces leading-5">
            {propertyData?.property_investment_information.interest_rate ||
              "0%"}{" "}
            APR
          </span>
        </div>
        <div className="flex flex-col gap-y-2">
          <span className="text-gray-300 text-12 font-500 leading-4">
            Earnings
          </span>
          <span className="text-blue-300 text-16 font-500 whitespace-break-spaces leading-5">
            {propertyData?.property_investment_information.earnings || "0%"}
          </span>
        </div>
        <div className="flex flex-col gap-y-2">
          <span className="text-gray-300 text-12 font-500 leading-4">
            Estimated Date of Returns
          </span>
          <span className="text-blue-300 text-16 font-500 whitespace-break-spaces leading-5">
            {propertyData?.property_investment_information.returns_date || ""}
          </span>
        </div>
        <div className="flex flex-col gap-y-2">
          <span className="text-gray-300 text-12 font-500 leading-4">
            Fund Raising Open Date
          </span>
          <span className="text-blue-300 text-16 font-500 whitespace-break-spaces leading-5">
            {propertyData?.property_investment_information
              .fund_raising_opening_date || ""}
          </span>
        </div>
        <div className="flex flex-col gap-y-2">
          <span className="text-gray-300 text-12 font-500 leading-4">
            Fund Raising Close Date
          </span>
          <span className="text-blue-300 text-16 font-500 whitespace-break-spaces leading-5">
            {propertyData?.property_investment_information
              .fund_raising_closing_date || ""}
          </span>
        </div>
      </div>
      <div className="rounded-[24px] bg-white p-5 lg:p-8 pt-5 flex flex-col mt-2 gap-y-3">
        <div className="flex justify-between items-center">
          <span className="text-blue-300 font-500 leading-5">
            {propertyData?.property_images?.length || 0} photos
          </span>
          <Button
            variant="secondary"
            className="h-10 w-10 !p-0 flex justify-center items-center rounded-3xl"
            onClick={() => slideModalRef.current?.open()}
          >
            <UilAngleRightB className="h-4 w-4 text-blue-300" />
          </Button>
          <SlideModal ref={slideModalRef} className="max-w-[656px]">
            <div className="h-full max-h-screen" id="notification-slide-modal">
              <ImageSlider propertyData={propertyData} />
            </div>
          </SlideModal>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-2 min-h-[138px]">
          <div className="w-full h-full max-h-[138px] max-w-[180px] sm:col-span-2">
            {/*      <Image
              src={
                propertyData?.property_images[0] || "/images/project-img.png"
              }
              alt="project-image"
              width={180}
              height={138}
              className="w-full rounded-xl h-[138px] "
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Image
              src={propertyData?.property_images[1] || "/images/img-1.png"}
              alt="project-image"
              width={0}
              height={0}
              sizes="100vw"
              className="h-full w-full rounded-xl max-h-[65px] object-cover"
            />
            <Image
              src={propertyData?.property_images[2] || "/images/img-2.png"}
              alt="project-image"
              width={0}
              height={0}
              sizes="100vw"
              className="h-full w-full rounded-xl max-h-[65px] object-cover"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightCardSection;
