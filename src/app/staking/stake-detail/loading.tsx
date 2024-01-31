import { BannerSkeleton } from "@/components/Loaders/BannerSkeleton";
import CardSkeleton from "@/components/Loaders/CardSkeleton";
import ChartSectionSkeleton from "@/components/Loaders/ChartSectionSkeleton";

const Loading = () => {
  return (
    <>
      <BannerSkeleton />
      <div className="grid grid-cols-12 gap-5 mt-5 mx-3 sm:mx-10 lg:mx-4 xl:mx-0">
        <div className="lg:col-span-9 col-span-12">
          <ChartSectionSkeleton />
          <div className="grid sm:grid-cols-3 grid-cols-1 gap-2 mt-2">
            <CardSkeleton cardType="small" />
            <CardSkeleton cardType="small" />
            <CardSkeleton cardType="small" />
          </div>
        </div>
        <div className="lg:col-span-3 col-span-12 gap-2 flex flex-col">
          <CardSkeleton cardType="large" />
          <CardSkeleton cardType="large" />
          <CardSkeleton cardType="large" />
        </div>
      </div>
    </>
  );
};

export default Loading;
