import { BannerSkeleton } from "@/components/Loaders/BannerSkeleton";
import CardSkeleton from "@/components/Loaders/CardSkeleton";
import ChartTabContentSkeleton from "@/components/Loaders/ChartTabContentSkeleton";
import DashboardFooterSkeleton from "@/components/Loaders/DashboardFooterSkeleton";

const Loading = () => {
  return (
    <>
      <BannerSkeleton />
      <div className="flex gap-2 mx-auto mt-3 overflow-x-auto overflow-y-hidden px-3 sm:pl-10 lg:px-4 xl:px-0 remove-scrollbar">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <ChartTabContentSkeleton />
      <DashboardFooterSkeleton />
    </>
  );
};

export default Loading;
