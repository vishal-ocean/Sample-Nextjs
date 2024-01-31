import { PropertyDataType } from "@/constants/PropertyData";
import LeftCardSection from "./LeftCardSection";
import RightCardSection from "./RightCardSection";
interface OverviewProps {
  propertyData: PropertyDataType;
}
const Overview = ({ propertyData }: OverviewProps) => {
  return (
    <div className="grid sm:grid-cols-12 md:grid-rows-[auto_auto_auto_auto_auto_auto] gap-2 w-full">
      <div className="w-full sm:col-span-6 md:col-span-4 lg:col-span-3 row-auto h-max">
        <LeftCardSection propertyData={propertyData} />
      </div>
      <div className="w-full rounded-[24px] bg-white px-5 py-6 sm:p-8 lg:p-[48px] flex flex-col sm:col-span-12 md:col-span-8 lg:col-span-6 row-span-6 order-1 md:order-none">
        <div className="flex flex-col gap-y-6">
          <span className="text-24 font-500 leading-[120%]">Introduction</span>
          <span className="text-gray-300 font-500 whitespace-break-spaces leading-[160%]">
            {propertyData?.property_introduction1 || ""}
          </span>
          <span className="text-gray-300 font-500 whitespace-break-spaces leading-[160%]">
            {propertyData?.property_introduction2 || ""}
          </span>
      {/*     <Image
            src={
              propertyData?.property_banner_image || "/images/project-img.png"
            }
            alt="project-image"
            width={584}
            height={310}
            className="h-full w-full rounded-[16px] max-h-[310px]"
          /> */}
          <span className="text-gray-300 font-500 whitespace-break-spaces leading-[160%]">
            {propertyData?.property_introduction3 || ""}
          </span>
        </div>
        <div className="flex flex-col gap-y-6 mt-10 lg:mt-[60px]">
          <span className="text-24 font-500 leading-[120%]">
            Monetisation strategy TBA
          </span>
          <span className="text-gray-300 font-500 whitespace-break-spaces leading-[160%]">
            {propertyData?.monetization_strategy1 || ""}
          </span>
          <div className="mx-auto w-[305px] sm:w-full h-full min-h-[380px] sm:hidden block">
        {/*     <ShapeChart innerRadius={40} outerRadius={62} /> */}
          </div>
          <div className="mx-auto w-[330px] sm:w-full h-full min-h-[380px] sm:block hidden">
        {/*     <ShapeChart innerRadius={60} outerRadius={100} /> */}
          </div>
          <span className="text-gray-300 font-500 whitespace-break-spaces leading-[160%]">
            {propertyData?.monetization_strategy2 || ""}
          </span>
        </div>
      </div>
      <RightCardSection propertyData={propertyData} />
    </div>
  );
};

export default Overview;
