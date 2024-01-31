import { SVGIconProps } from "@/utils/types";
import { FC } from "react";

const IconBorrow: FC<SVGIconProps> = (props, strokeWidth) => {
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
        d="M7.8 14.0003L2 11.8003V7.93366L5.73333 6.66699L6 7.13366L4.73333 8.40033C4.53333 8.60033 4.46667 8.80033 4.46667 9.06699C4.46667 9.33366 4.6 9.53366 4.8 9.66699L7.33333 11.4003C7.53333 11.5337 7.8 11.6003 8 11.5337L12.9333 10.1337C13.2 10.067 13.5333 10.1337 13.7333 10.3337C14.1333 10.8003 14 11.5337 13.4667 11.7337L7.8 14.0003Z"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 6.66699V13.3337"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.3327 2C10.7327 2 10.1327 2.2 9.66602 2.6C9.06602 3.06667 8.66602 3.8 8.66602 4.66667C8.66602 5.53333 9.06602 6.26667 9.66602 6.73333C10.1327 7.13333 10.7327 7.33333 11.3327 7.33333C12.7993 7.33333 13.9993 6.13333 13.9993 4.66667C13.9993 3.2 12.7993 2 11.3327 2Z"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconBorrow;
