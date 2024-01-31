import { cn } from "@/utils";

interface CustomVideoCompProps {
  className?: string;
  src: string;
}
const CustomVideoComp = ({ className, src }: CustomVideoCompProps) => {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className={cn(
        "absolute top-0 left-0 w-full h-full object-cover z-[-1] rounded-[24px]",
        className
      )}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

export default CustomVideoComp;
