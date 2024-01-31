import { SVGIconProps } from "@/utils/types";
import { FC } from "react";

const IconCoinGrowth: FC<SVGIconProps> = (props, strokeWidth) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={12}
      height={12}
      viewBox="0 0 12 12"
      fill="none"
      {...props}
    >
      <path
        d="M10.5 5.5L6.6 9.45L4.55 7.4L1.5 10.5M10.5 7.5V5.5H8.5"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 2.5C6.5 2.8 6.2 3.05 5.65 3.25C5.2 3.4 4.65 3.5 4 3.5C3.35 3.5 2.8 3.4 2.35 3.25C1.85 3.05 1.5 2.8 1.5 2.5C1.5 1.95 2.6 1.5 4 1.5C5.4 1.5 6.5 1.95 6.5 2.5Z"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 2.5V4C6.5 4.3 6.15 4.55 5.65 4.75C5.2 4.9 4.65 5 4 5C3.35 5 2.8 4.9 2.35 4.75C1.85 4.55 1.5 4.3 1.5 4V2.5C1.5 2.8 1.85 3.05 2.35 3.25C2.8 3.4 3.35 3.5 4 3.5C4.65 3.5 5.2 3.4 5.65 3.25C6.2 3.05 6.5 2.8 6.5 2.5Z"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconCoinGrowth;
