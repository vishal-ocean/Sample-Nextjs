import { Button } from "@/components/UI/Button";
import { UilBoltAlt, UilCheck, UilPlus } from "@/icons";
const InBusinessCard = () => {
  return (
    <div className="w-full max-w-[312px] rounded-[24px] bg-white p-8 flex flex-col col-span-4">
      <div className="text-white bg-success-200 text-14 font-700 leading-4 w-max py-3 px-4 flex gap-x-2 rounded-3xl">
        <UilBoltAlt className="h-4 w-4 text-white" />
        <span>In Business</span>
      </div>
      <div className="mt-[153px] flex flex-col gap-y-2">
        <div className="flex gap-x-2 items-center">
          <UilCheck className="w-4 h-4 text-success-200" />
          <span className="text-12 font-500 text-blue-300 leading-4">
            Invested
          </span>
        </div>
        <span className="text-24 text-blue-300 font-500 leading-7">
          €45,000
        </span>
      </div>
      <span className="mt-5 text-12 font-500 text-blue-300 max-w-[169px] leading-4">
        You can buy or sell tokens of the project on Secondary Market
      </span>
      <div className="flex gap-x-1 mt-5">
        <Button
          variant="secondary"
          className="px-4 py-3 text-14 font-700 text-blue-300 leading-4"
        >
          See Offers
        </Button>
        <Button
          variant="outline"
          className="text-blue-300 text-14 font-500 px-4 py-3 flex gap-x-2 leading-4"
        >
          <UilPlus className="h-4 w-4 text-blue-300" />
          <span>Create Offer</span>
        </Button>
      </div>
    </div>
  );
};

export default InBusinessCard;
