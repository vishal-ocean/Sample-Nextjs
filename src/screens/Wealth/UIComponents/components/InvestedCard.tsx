import { Button } from "@/components/UI/Button";
import { UilCheck } from "@/icons";
const InvestedCard = () => {
  return (
    <div className="w-full max-w-[312px] rounded-[24px] bg-white p-8 flex flex-col col-span-4">
      <Button className="text-white bg-blue-300 text-14 font-700 leading-4 w-max py-3 px-4">
        Initial Raise
      </Button>
      <div className="flex justify-between mt-8">
        <p className="text-gray-300 font-500 text-12 leading-4 ">Target</p>
        <p className="text-gray-300 font-500 text-12 leading-4 ">Raised</p>
      </div>
      <div className="flex justify-between">
        <p className=" text-12 text-blue-300 font-500 leading-4">TBA</p>
        <p className=" text-12 text-blue-300 font-500 leading-4">€7,250,000</p>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 my-3">
        <div className="bg-primary h-2 rounded-full w-[45%]" />
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="text-gray-300 text-12 font-500 leading-4">
            Investors
          </span>
          <span className="text-blue-300 text-12 font-500 leading-4">187</span>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-gray-300 text-12 font-500 leading-4">
            Days Left
          </span>
          <span className="text-blue-300 text-12 font-500 leading-4">7</span>
        </div>
      </div>
      <div className="mt-[131px] flex justify-between items-end">
        <div className="flex flex-col gap-y-2">
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
        <Button
          variant="secondary"
          className="font-700 text-14 py-3 px-4 rounded-3xl h-fit leading-4"
        >
          Invest
        </Button>
      </div>
    </div>
  );
};

export default InvestedCard;
