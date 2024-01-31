import { cn } from "@/utils";
import Image from "next/image";
import Link from "next/link";

type AlertProps = {
  type: "positive" | "neutral" | "warning";
  className?: string;
  title: string;
  subTitle: string;
  isLearnMore?: boolean;
};

const AlertConfig: Record<string, { img: string; bgColor: string }> = {
  positive: {
    img: "/images/svg/icon-positive-alert.svg",
    bgColor: "bg-success-50",
  },
  neutral: {
    img: "/images/svg/icon-neutral-alert.svg",
    bgColor: "bg-gray-100",
  },
  warning: {
    img: "/images/svg/icon-warning-alert.svg",
    bgColor: "bg-orange-50",
  },
};
const Alert = ({
  type,
  className,
  title,
  subTitle,
  isLearnMore = true,
}: AlertProps) => {
  return (
    <div
      className={cn(
        "w-full max-w-[480px] rounded-[12px] p-3 grid grid-cols-12 gap-x-3",
        className,
        AlertConfig?.[type]?.bgColor
      )}
    >
      <Image
        src={AlertConfig?.[type]?.img}
        height={16}
        width={16}
        alt="alert-icon"
        className="col-span-1"
      />
      <div className="flex flex-col gap-y-1  col-span-11">
        <div className="flex justify-between">
          <span className="text-12 text-blue-300 font-500 leading-4">
            {title || ""}
          </span>
          {isLearnMore && (
            <div className="flex gap-x-1">
              <Image
                src="/images/svg/icon-neutral-alert.svg"
                height={12}
                width={12}
                alt="learn-more-icon"
                className="opacity-50"
              />
              <Link
                href=""
                className="text-12 font-500 leading-4 text-gray-300 underline"
              >
                Learn More
              </Link>
            </div>
          )}
        </div>
        <span className="text-12 text-gray-300 font-500 leading-4">
          {subTitle || ""}
        </span>
      </div>
    </div>
  );
};

export default Alert;

// use like below
{
  /*    <Alert
          type="positive"
          title="Maximize savings with BSC or Polygon"
          subTitle="We handle the gas fees for you!"
        />
        <Alert
          type="warning"
          title="Warning alert title"
          subTitle="Warning alert subtitle"
        />
        <Alert
          type="neutral"
          title="Neutral alert title"
          subTitle="Neutral alert subtitle"
        /> */
}
