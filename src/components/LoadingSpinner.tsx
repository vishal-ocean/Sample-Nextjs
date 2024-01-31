import { cn } from "@/utils";

const LoadingSpinner = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "border-[3px] h-6 w-6 rounded-[50%] border-b-transparent inline-block animate-spin",
        className
      )}
    ></div>
  );
};

export default LoadingSpinner;
