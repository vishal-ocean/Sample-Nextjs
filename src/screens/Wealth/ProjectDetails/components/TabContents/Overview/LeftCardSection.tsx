import { Button } from "@/components/UI/Button";
import { PropertyDataType } from "@/constants/PropertyData";
import { UilTwitter, UilYoutube } from "@/icons";
interface LeftCardSectionProps {
  propertyData: PropertyDataType;
}
const LeftCardSection = ({ propertyData }: LeftCardSectionProps) => {
  return (
    <div className="w-full">
      <div className="rounded-[24px] bg-white p-5 lg:p-8 flex flex-col gap-y-4 lg:gap-y-6">
        <div className="flex justify-between">
          <div className="flex flex-col gap-y-2">
            <span className="text-gray-300 text-12 font-500 leading-4">
              Owner
            </span>
            <span className="text-blue-300 text-16 font-500 whitespace-break-spaces leading-5">
              {propertyData?.owner_details.name || ""}
            </span>
          </div>
          <span className="rounded-full w-10 h-10 bg-yellow-100 flex justify-center items-center">
            {/*    <Image
              src="/images/svg/dodo.svg"
              width={16}
              height={16}
              alt="dodo logo"
              className="h-4 w-4"
  /> */}
          </span>
        </div>
        <div className="flex flex-col gap-y-2">
          <span className="text-gray-300 text-12 font-500 leading-4">
            Website
          </span>
          <span className="text-blue-300 text-16 font-500 whitespace-break-spaces leading-5">
            {propertyData?.owner_details.website || ""}
          </span>
        </div>
        <div className="flex flex-col gap-y-2">
          <span className="text-gray-300 text-12 font-500 leading-4">
            Email
          </span>
          <span className="text-blue-300 text-16 font-500 whitespace-break-spaces leading-5">
            {propertyData?.owner_details.email || ""}
          </span>
        </div>
        <div className="flex flex-col gap-y-2">
          <span className="text-gray-300 text-12 font-500 leading-4">
            Phone
          </span>
          <span className="text-blue-300 text-16 font-500 whitespace-break-spaces leading-5">
            {propertyData?.owner_details.phone || ""}
          </span>
        </div>
        <div className="flex gap-x-2">
          <Button
            variant="secondary"
            className="h-8 w-8 !p-0 flex justify-center items-center rounded-3xl"
          >
            <UilYoutube className="h-4 w-4 text-blue-300" />
          </Button>
          <Button
            variant="secondary"
            className="h-8 w-8 !p-0 flex justify-center items-center rounded-3xl"
          >
            <UilTwitter className="h-4 w-4 text-blue-300" />
          </Button>
          <Button
            variant="secondary"
            className="h-8 w-8 !p-0 flex justify-center items-center rounded-3xl"
          >
            <UilYoutube className="h-4 w-4 text-blue-300" />
          </Button>
          <Button
            variant="secondary"
            className="h-8 w-8 !p-0 flex justify-center items-center rounded-3xl"
          >
            <UilTwitter className="h-4 w-4 text-blue-300" />
          </Button>
        </div>
      </div>
      <div className="rounded-[24px] bg-white p-5 lg:p-8 flex flex-col mt-2 gap-y-4 lg:gap-y-6">
        <div className="flex flex-col gap-y-2">
          <span className="text-gray-300 text-12 font-500 leading-4">
            Fund Raising Purpose
          </span>
          <span className="text-blue-300 text-16 font-500 whitespace-break-spaces leading-5">
            {propertyData?.property_information.fund_raising_purpose || ""}
          </span>
        </div>
        <div className="flex flex-col gap-y-2">
          <span className="text-gray-300 text-12 font-500 leading-4">
            Real Estate Type
          </span>
          <span className="text-blue-300 text-16 font-500 whitespace-break-spaces leading-5">
            {propertyData?.property_information.real_estate_type || ""}
          </span>
        </div>
        <div className="flex flex-col gap-y-2">
          <span className="text-gray-300 text-12 font-500 leading-4">
            Business Type
          </span>
          <span className="text-blue-300 text-16 font-500 whitespace-break-spaces leading-5">
            {propertyData?.property_information.business_type || ""}
          </span>
        </div>
        <div className="flex flex-col gap-y-2">
          <span className="text-gray-300 text-12 font-500 leading-4">
            Location
          </span>
          <span className="text-blue-300 text-16 font-500 whitespace-break-spaces leading-5">
            {propertyData?.property_information.address || ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LeftCardSection;
