import { UilPlus } from "@/icons";
const NoTransactionData = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-y-6 px-5 py-12">
      <div className="flex justify-center items-center">
        <div className="w-10 h-10 bg-secondary rounded-full border-2 border-gray-100 dark:bg-[#3C3C3C] dark:border-[#1A1A1A]" />
        <div className="w-10 h-10 bg-secondary rounded-full -ml-4 border-2 border-gray-100 dark:bg-[#3C3C3C] dark:border-[#1A1A1A]" />
        <div className="w-10 h-10 bg-secondary rounded-full -ml-4 border-2 border-gray-100 flex justify-center items-center dark:bg-[#3C3C3C] dark:border-[#1A1A1A]">
          <UilPlus className="w-4 h-4 mx-auto text-blue-300  dark:text-white/30" />
        </div>
      </div>
      <span className="text-16 text-gray-300 font-500 leading-5 dark:text-white/30">
        You have no transactions yet
      </span>
    </div>
  );
};

export default NoTransactionData;
