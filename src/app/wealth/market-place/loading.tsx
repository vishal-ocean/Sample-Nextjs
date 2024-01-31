import { BannerSkeleton } from "@/components/Loaders/BannerSkeleton";
import CardSkeleton from "@/components/Loaders/CardSkeleton";

const Loading = () => {
  return (
    <>
      <BannerSkeleton />
      <div className="my-6 mx-3 sm:mx-10 lg:mx-4 xl:mx-0 animate-pulse flex justify-between">
        <div className="h-10 w-[200px]" />
        <div className="h-10 w-[200px]" />
      </div>
      <div className="mx-3 sm:mx-10 lg:mx-4 xl:mx-0 grid grid-cols-12 gap-2">
        <div className="md:col-span-3 col-span-12">
          <CardSkeleton />
        </div>
        {[...Array(3)].map((_, index) => (
          <div className="md:col-span-3 col-span-12" key={index}>
            <div className="rounded-[24px] bg-white dark:bg-white/10 ">
              <div className="relative">
                <div className="animate-pulse h-[280px] w-full bg-white dark:bg-white/10 rounded-t-[24px]">
                  <div className="h-full w-full !rounded-t-[24px] !rounded-b-none" />
                </div>
                <div className="animate-pulse absolute top-5 right-5">
                  <div className="h-10 w-10" />
                </div>
              </div>
              <div className="p-5">
                <div className="animate-pulse">
                  <div className="h-6 w-[200px]" />
                </div>
                <div className="mt-3 flex flex-col gap-1 animate-pulse">
                  <div className="h-4 w-[84px]" />
                  <div className="h-4 w-[84px]" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Loading;
