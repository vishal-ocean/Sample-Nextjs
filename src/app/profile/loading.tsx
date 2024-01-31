import { BannerSkeleton } from "@/components/Loaders/BannerSkeleton";
import CardSkeleton from "@/components/Loaders/CardSkeleton";

const Loading = () => {
  return (
    <>
      <BannerSkeleton />
      <div className="my-5 animate-pulse mx-3 sm:mx-10 lg:mx-4 xl:mx-0">
        <div className="h-10 w-[200px]" />
      </div>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-x-2 sm:gap-y-10 gap-y-4 mx-3 sm:mx-10 lg:mx-4 xl:mx-0">
        {[...Array(12)].map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    </>
  );
};

export default Loading;
