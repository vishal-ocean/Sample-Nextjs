import { SVGIconProps } from "@/utils/types";
import { FC } from "react";

const IconTimeCoinDeposit: FC<SVGIconProps> = (props, strokeWidth) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={16}
      viewBox="0 0 18 16"
      fill="none"
      {...props}
    >
      <path
        d="M8.44351 1.94782C5.31308 2.29565 2.8783 4.93913 2.8783 8.13912C2.8783 8.62608 2.94786 9.11304 3.01743 9.53043C3.08699 9.73912 3.15656 10.0174 3.22612 10.2261C3.99134 12.4522 6.00873 14.1217 8.44351 14.3304C8.65221 14.4 8.8609 14.4 9.13917 14.4C11.8522 14.4 14.2174 12.6609 15.0522 10.2261"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.56295 10.7321L7.60876 7.80084L9.56295 4.86957L11.5171 7.80084L9.56295 10.7321Z"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.1906 7.80096L9.56208 8.41979L7.93359 7.80096"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.2609 3.13048L12.4783 5.91309"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.9565 5.91309L12.4783 5.91309L12.4783 2.43483"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconTimeCoinDeposit;
