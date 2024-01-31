import { SVGIconProps } from "@/utils/types";
import { FC } from "react";

const IconCoinExchange: FC<SVGIconProps> = (props, strokeWidth) => {
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
        d="M5.5 4.5C5.5 5.6 4.6 6.5 3.5 6.5C2.4 6.5 1.5 5.6 1.5 4.5C1.5 3.4 2.4 2.5 3.5 2.5C4.6 2.5 5.5 3.4 5.5 4.5Z"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 7.5C10.5 8.6 9.6 9.5 8.5 9.5C7.4 9.5 6.5 8.6 6.5 7.5C6.5 6.4 7.4 5.5 8.5 5.5C9.6 5.5 10.5 6.4 10.5 7.5Z"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 2.3C7.2 2.3 7.9 2.5 8.5 2.85C8.85 3.05 9.2 3.3 9.45 3.6M8.95 1.5L9.5 3.6"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 9.6999C4.8 9.6999 4.1 9.4999 3.5 9.1499C3.15 8.9499 2.8 8.6999 2.55 8.3999M3.05 10.4999L2.5 8.3999"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconCoinExchange;
