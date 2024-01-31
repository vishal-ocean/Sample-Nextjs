import { Button } from "@/components/UI/Button";

const InitialRaiseCard = () => {
  return (
    <div className="w-full sm:max-w-[248px] lg:max-w-[312px] rounded-[24px] bg-white p-3 lg:p-8 flex flex-col">
      <Button className="text-white bg-blue-300 text-14 font-700 leading-4 w-max py-3 px-4">
        Initial Raise
      </Button>

      <div className="flex justify-between mt-6 sm:mt-8">
        <p className="text-gray-300 font-500 text-12 leading-4 ">Target</p>
        <p className="text-gray-300 font-500 text-12 leading-4 ">Raised</p>
      </div>
      <div className="flex justify-between">
        <p className=" text-12 text-blue-300 font-500 leading-4">€10,000,000</p>
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
      <div className="flex flex-col gap-y-1 lg:gap-y-2 mt-8 sm:mt-[71px] lg:mt-[74px]">
        <span className="text-gray-300 text-12 font-500 leading-4">
          Min Investment
        </span>
        <span className="text-blue-300 text-24 font-500 leading-7">
          €25,000
        </span>
      </div>
      <Button
        className="font-700 text-14 leading-4 mt-6 py-3 mx-2 lg:mx-0 mb-2 lg:mb-0"
        // onClick={() => setHandleModal(INVEST_MODAL)}
      >
        Invest
      </Button>
    </div>
  );
};

export default InitialRaiseCard;
