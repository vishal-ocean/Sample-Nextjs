import { cn } from "@/utils";
import Image from "next/image";

interface ImageStackProps {
  Images: string[];
  displayLimit: number;
  height?: number;
  width?: number;
  stackContainerClass?: string;
  imageContainerClass?: string;
  imageClass?: string;
}

const ImageStack = ({
  Images,
  displayLimit,
  height = 52,
  width = 52,
  stackContainerClass,
  imageContainerClass,
  imageClass,
}: ImageStackProps) => {
  return (
    <div className={cn("flex -space-x-5 overflow-hidden", stackContainerClass)}>
      {Images?.slice(0, displayLimit)?.map((item, index) => (
        <span
          className={cn(
            "rounded-[200px] !border-2 border-white bg-secondary",
            imageContainerClass
          )}
          style={{ height: height + 4, width: width + 4 }}
          key={`ImageStack-${index}`}
        >
          <Image
            width={width}
            height={height}
            alt="IMAGES"
            src={item}
            className={cn("rounded-3xl h-full w-full", imageClass)}
          />
        </span>
      ))}
      {displayLimit < Images?.length && (
        <span
          className={cn(
            "rounded-[200px] !border-2 border-white bg-secondary flex justify-center",
            imageContainerClass
          )}
          style={{ height: height + 4, width: width + 4 }}
        >
          <div className="m-auto flex">
            {Images?.length - displayLimit > 0 && (
              <span className="text-14 font-700 text-blue-300">
                {`+ ${Images?.length - displayLimit}`}
              </span>
            )}
          </div>
        </span>
      )}
    </div>
  );
};

export default ImageStack;
