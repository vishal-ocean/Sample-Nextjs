export const CardSectionSkeleton = () => {
  return (
    <div className="bg-white dark:bg-white/10  sm:p-6 p-5  rounded-[24px] mx-3 sm:mx-10 lg:mx-4 xl:mx-0">
      <div className="flex  animate-pulse pt-[10px] sm:px-4">
        <div className=" w-[73px] h-[21px]" />
      </div>

      <div className="animate-pulse !rounded-[24px]">
        <div className="sm:mt-0 mt-5 m-auto sm:h-60 h-40 sm:w-[402px] w-full !rounded-[24px]"></div>
      </div>
      <div className="animate-pulse ">
        <div className="h-7 w-[106px] sm:mt-5 mt-6 mx-auto  " />
      </div>
      <div className="flex gap-2 sm:justify-center overflow-hidden mt-9 pb-[10px]">
        <div className="flex flex-col gap-3 justify-center items-center animate-pulse pl-[10px] pr-5  sm:pl-5 py-[22px]">
          <div className="h-10 w-10" />
          <div className="h-3 w-[60px]" />
        </div>
        <div className="flex flex-col gap-3 justify-center items-center animate-pulse px-5 py-[22px] ">
          <div className="h-10 w-10" />
          <div className="h-3 w-[60px]" />
        </div>{' '}
        <div className="flex flex-col gap-3 justify-center items-center animate-pulse px-5 py-[22px]">
          <div className="h-10 w-10" />
          <div className="h-3 w-[60px]" />
        </div>{' '}
        <div className="flex flex-col gap-3 justify-center items-center animate-pulse px-5 py-[22px]">
          <div className="h-10 w-10" />
          <div className="h-3 w-[60px]" />
        </div>{' '}
        <div className="flex flex-col gap-3 justify-center items-center animate-pulse px-5 py-[22px]">
          <div className="h-10 w-10" />
          <div className="h-3 w-[60px]" />
        </div>{' '}
        <div className="flex flex-col gap-3 justify-center items-center animate-pulse px-5 py-[22px]">
          <div className="h-10 w-10" />
          <div className="h-3 w-[60px]" />
        </div>
      </div>
    </div>
  );
};
