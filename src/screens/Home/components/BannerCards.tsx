import { UilAngleRightB, UilPlus } from "@/icons";
const BannerCards = () => {
  return (
    <div className="grid sm:grid-cols-2 grid-cols-1 gap gap-2 lg:gap-4 sm:mb-0 mb-2">
      <div className="rounded-[28px] bg-blue-300 flex flex-col justify-between p-6 h-[240px]">
        <div className="flex justify-between">
          <div className="h-10 w-10 rounded-3xl flex justify-center items-center bg-secondary/10">
            <UilPlus className="w-4 h-4 text-white" />
          </div>
          <div className="h-10 w-10 rounded-3xl flex justify-center items-center bg-secondary/10">
            <UilAngleRightB className="w-4 h-4 text-white" />
          </div>
        </div>
        <span className="text-32 text-white font-500">Crypto Services</span>
      </div>
      <div className="rounded-[28px] bg-blue-300 flex flex-col justify-between p-6 h-[240px]">
        <div className="flex justify-between">
          <div className="h-10 w-10 rounded-3xl flex justify-center items-center bg-secondary/10">
            <UilPlus className="w-4 h-4 text-white" />
          </div>
          <div className="h-10 w-10 rounded-3xl flex justify-center items-center bg-secondary/10">
            <UilAngleRightB className="w-4 h-4 text-white" />
          </div>
        </div>
        <span className="text-32 text-white font-500">Crypto Services</span>
      </div>
    </div>
  );
};

export default BannerCards;
