export const BannerSkeleton = () => {
  return (
    <div className="bg-white dark:bg-white/10 sm:p-12 p-5 rounded-[24px] mx-3 sm:mx-10 lg:mx-4 xl:mx-0">
      <div className="flex justify-between animate-pulse">
        <div className="sm:h-[52px] h-10 sm:w-[100px] w-10" />
        <div className="sm:h-[52px] h-10 sm:w-[100px] w-10" />
      </div>
      <div className="sm:mt-[85px] mt-[92px] animate-pulse flex justify-between">
        <div className="h-8 sm:h-[52px] w-full sm:max-w-[430px] max-w-[94px]" />
        <div className="h-8 sm:h-[52px] sm:w-[100px] w-[94px]" />
      </div>
    </div>
  );
};
