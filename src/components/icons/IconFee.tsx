import { SVGIconProps } from "@/utils/types";
import { FC } from "react";

export const IconFee: FC<SVGIconProps> = (props, strokeWidth) => {
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
        d="M11.3337 4.6665V12.6665C11.3337 13.3998 10.7337 13.9998 10.0003 13.9998H6.00033C5.26699 13.9998 4.66699 13.3998 4.66699 12.6665V4.6665H11.3337Z"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 7.33333H12.6667C13.4 7.33333 14 6.73333 14 6V3.33333C14 2.6 13.4 2 12.6667 2H3.33333C2.6 2 2 2.6 2 3.33333V6C2 6.73333 2.6 7.33333 3.33333 7.33333H4"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.66634 8.00016C8.66634 8.40016 8.39967 8.66683 7.99967 8.66683C7.59967 8.66683 7.33301 8.40016 7.33301 8.00016C7.33301 7.60016 7.59967 7.3335 7.99967 7.3335C8.39967 7.3335 8.66634 7.66683 8.66634 8.00016Z"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.33301 11.3335H8.66634"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 4.6665H12"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
