import { SVGIconProps } from "@/utils/types";
import { FC } from "react";

const IconShield1: FC<SVGIconProps> = (props, strokeWidth) => {
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
        d="M6.33333 9.82222L6.11111 10L3.93333 8.13333C3.35556 7.64444 3 6.88889 3 6.08889V2C3 2.75556 3.71111 3.33333 4.55556 3.33333C5.4 3.33333 6.11111 2.75556 6.11111 2C6.11111 2.75556 6.82222 3.33333 7.66667 3.33333C8.51111 3.33333 9.22222 2.75556 9.22222 2V5.11111"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.28526 6H9.00098V10H8.09797V7.30337H7.00098V6.76966L7.108 6.76404C7.45583 6.74532 7.72115 6.67978 7.90399 6.56742C8.09128 6.45131 8.21837 6.26217 8.28526 6Z"
        fill="currentcolor"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export default IconShield1;
