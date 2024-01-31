import { SVGIconProps } from "@/utils/types";
import { FC } from "react";

const IconTimeCoinWithdraw: FC<SVGIconProps> = (props, strokeWidth) => {
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
        d="M8.44351 1.94803C5.31308 2.29586 2.8783 4.93934 2.8783 8.13934C2.8783 8.62629 2.94786 9.11325 3.01743 9.53064C3.08699 9.73934 3.15656 10.0176 3.22612 10.2263C3.99134 12.4524 6.00873 14.1219 8.44351 14.3306C8.65221 14.4002 8.8609 14.4002 9.13917 14.4002C11.8522 14.4002 14.2174 12.6611 15.0522 10.2263"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.56295 10.7323L7.60876 7.80106L9.56295 4.86978L11.5171 7.80106L9.56295 10.7323Z"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.1906 7.80118L9.56208 8.42L7.93359 7.80118"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.174 5.21761L15.9566 2.435"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.4783 2.435L15.9565 2.435L15.9565 5.91326"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconTimeCoinWithdraw;
