import { BannerSkeleton } from "@/components/Loaders/BannerSkeleton";
import CardSkeleton from "@/components/Loaders/CardSkeleton";

const Loading = () => {
  return (
    <>
      <BannerSkeleton />
      <div className="flex justify-center mx-auto w-full h-full max-w-[872px] max-h-[415px] mt-10">
        <div className="flex flex-col gap-y-10 w-full">
          {[...Array(3)].map((_, index) => (
            <div className="flex flex-col gap-y-2 animate-pulse" key={index}>
              <div className="h-5 w-full max-w-[620px]" />
              <div className="h-5 w-full max-w-[480px]" />
              <div className="h-5 w-full max-w-[720px]" />
              <div className="h-5 w-full max-w-[820px]" />
            </div>
          ))}
        </div>
      </div>
      <div className="my-5 animate-pulse mx-3 flex justify-between sm:mx-10 lg:mx-4 xl:mx-0">
        <div className="h-10 w-[200px]" />
        <div className="h-10 w-[200px]" />
      </div>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2 mx-3 sm:mx-10 lg:mx-4 xl:mx-0">
        {[...Array(4)].map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    </>
  );
};

export default Loading;
