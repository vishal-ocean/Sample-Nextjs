import { AssetImages } from "@/constants/AssetsImages";
import { cn } from "@/utils";
import Image from "next/image";

export const RowImageStack = ({ ImageData }: { ImageData: string[] }) => {
  return (
    <div className=" grid grid-flow-col justify-items-center">
      {ImageData.map((value, index) => (
        <div
          key={index}
          className={cn("h-4 w-4 ring-4 ring-white rounded-full z-10 relative")}
        >
          <Image src={AssetImages[value]} height={16} width={16} alt="" />
        </div>
      ))}
    </div>
  );
};
