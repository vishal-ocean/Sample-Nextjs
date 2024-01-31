import { cn } from "@/utils";

interface cardSkeletonProps {
  cardType?: "small" | "large";
  cardClassName?: string;
}
const CardSkeleton = ({ cardType, cardClassName }: cardSkeletonProps) => {
  return (
    <div
      className={cn(
        "rounded-[24px] bg-white dark:bg-white/10  p-5 w-auto xl:w-[324px] lg:w-full",
        cardClassName
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
      <div
        className={cn(
          "mt-[50px] animate-pulse",
          cardType === "small" && "hidden",
          cardType === "large" && "mt-[132px]"
        )}
      >
        <div className="h-6 w-[200px]" />
      </div>
      <div className="mt-3 flex gap-y-1 flex-col animate-pulse">
        <div className="h-4 w-[84px]" />
        <div className="h-4 w-[84px]" />
      </div>
    </div>
  );
};

export default CardSkeleton;
