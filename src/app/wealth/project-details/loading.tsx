import CardSkeleton from "@/components/Loaders/CardSkeleton";

const Loading = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-3 mt-5 mx-3 sm:mx-10 lg:mx-4 xl:mx-0">
        <div className="lg:col-span-9 col-span-12">
          <div className="bg-white dark:bg-white/10 sm:p-12 p-5 rounded-[24px]">
            <div className="flex justify-between animate-pulse">
              <div className="sm:h-[52px] h-10 sm:w-[100px] w-10" />
              <div className="sm:h-[52px] h-10 sm:w-[100px] w-10" />
            </div>
            <div className="sm:mt-[85px] mt-[92px] animate-pulse flex justify-between">
              <div className="h-8 sm:h-[52px] w-full sm:max-w-[430px] max-w-[94px]" />
              <div className="h-8 sm:h-[52px] sm:w-[100px] w-[94px]" />
            </div>
          </div>
        </div>
        <div className="lg:col-span-3 col-span-12">
          <CardSkeleton cardClassName="h-full w-full" cardType="large" />
        </div>
      </div>
      <div className="my-6 mx-3 sm:mx-10 lg:mx-4 xl:mx-0 animate-pulse flex justify-between">
        <div className="h-10 w-[200px]" />
        <div className="h-10 w-[200px]" />
      </div>
      <div className="mx-3 sm:mx-10 lg:mx-4 xl:mx-0 grid grid-cols-12 gap-2">
        <div className="md:col-span-3 col-span-12">
          <CardSkeleton />
        </div>
        <div className="md:col-span-6 col-span-12">
          <CardSkeleton cardClassName="h-[400px] !w-full" cardType="large" />
        </div>
        <div className="md:col-span-3 col-span-12">
          <CardSkeleton />
        </div>
      </div>
    </>
  );
};

export default Loading;
