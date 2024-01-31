import { cn } from "@/utils";

interface cardSkeletonProps {
  heightClass?: string;
}
const StakingCardSkeleton: React.FC<cardSkeletonProps> = ({ heightClass }) => {
  return (
    <div
      className={cn(
        "rounded-[24px] bg-white dark:bg-white/10  p-5 xl:w-[324px] min-w-[324px] h-full flex flex-col justify-between ",
        heightClass
      )}
    >
      <div className="flex justify-between">
        <div className="grid grid-cols-[auto_1fr] items-center gap-2 animate-pulse">
          <div className="h-10 w-10" />
          <div className="h-3 w-[60px]" />
        </div>
        <div className="animate-pulse">
          <div className="h-10 w-10" />
        </div>
      </div>
      <div>
        <div className="animate-pulse mb-[11px]">
          <div className="h-6 w-[200px]" />
        </div>
        <div className="animate-pulse gap-y-1  flex flex-col">
          <div className="h-4 w-[84px]" />
          <div className="h-4 w-[70px]" />
        </div>
      </div>
    </div>
  );
};

export default StakingCardSkeleton;
