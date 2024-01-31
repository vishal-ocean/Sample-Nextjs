import { SVGIconProps } from "@/utils/types";
import { FC } from "react";

const IconGold: FC<SVGIconProps> = (props, strokeWidth) => {
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
        d="M8 12.6666H2L4 8.66663H6L8 12.6666Z"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 7.33337H5L7 3.33337H9L11 7.33337Z"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 12.6666H8L10 8.66663H12L14 12.6666Z"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconGold;
