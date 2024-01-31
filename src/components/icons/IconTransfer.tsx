import { SVGIconProps } from "@/utils/types";
import { FC } from "react";

const IconTransfer: FC<SVGIconProps> = (props, strokeWidth) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M11.1992 2.8002C6.69922 3.3002 3.19922 7.1002 3.19922 11.7002C3.19922 12.4002 3.29922 13.1002 3.39922 13.7002C3.49922 14.0002 3.59922 14.4002 3.69922 14.7002C4.79922 17.9002 7.69922 20.3002 11.1992 20.6002C11.4992 20.7002 11.7992 20.7002 12.1992 20.7002C16.0992 20.7002 19.4992 18.2002 20.6992 14.7002"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 14.001L16.0002 8.00098"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.8203 8.00098L16.0005 8.00098L16.0005 13.1812"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconTransfer;
