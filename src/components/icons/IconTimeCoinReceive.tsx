import { SVGIconProps } from "@/utils/types";
import { FC } from "react";

const IconTimeCoinReceive: FC<SVGIconProps> = (props, strokeWidth) => {
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
        d="M16 8.00098L9.99976 14.001"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.1797 14.001L9.99948 14.001L9.99948 8.82077"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.3091 8.92741L18 5.46371L20.3091 2L22.6183 5.46371L20.3091 8.92741Z"
        fill="white"
        fillOpacity={0.18}
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.2314 5.46387L20.3071 6.19509L18.3828 5.46387"
        fill="white"
        fillOpacity={0.18}
      />
      <path
        d="M22.2314 5.46387L20.3071 6.19509L18.3828 5.46387"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconTimeCoinReceive;
