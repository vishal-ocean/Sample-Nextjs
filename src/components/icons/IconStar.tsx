import { SVGIconProps } from "@/utils/types";
import { FC } from "react";

export const IconStar: FC<SVGIconProps> = (props, strokeWidth) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <path
        d="M14 8C8.73333 8.4 8.4 8.73333 8 14C7.6 8.73333 7.26667 8.4 2 8C7.26667 7.6 7.6 7.26667 8 2C8.4 7.26667 8.73333 7.6 14 8Z"
        stroke="currentcolor"
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
