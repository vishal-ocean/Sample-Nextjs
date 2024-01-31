import { SVGIconProps } from "@/utils/types";
import { FC } from "react";

const IconSend: FC<SVGIconProps> = (props, strokeWidth) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 28 25"
      {...props}
    >
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M4.814 19.54c-2.648-3.002-2.358-7.625.645-10.273 1.001-.882 2.152-1.412 3.372-1.679 2.44-.534 5.137.323 6.902 2.325 1.765 2.001 2.278 4.784 1.442 7.138-.418 1.177-1.087 2.253-2.088 3.135-3.002 2.648-7.625 2.358-10.273-.645z"
      ></path>
      <path
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.106 17.984L8.084 14.95l2.022-3.033 2.022 3.033-2.022 3.033z"
      ></path>
      <path
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.79 14.95l-1.685.64-1.685-.64"
      ></path>
      <path
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M7.43 7.837c.335-.496.735-.96 1.21-1.378 3.003-2.648 7.627-2.358 10.274.645 2.648 3.003 2.358 7.626-.645 10.274a7.172 7.172 0 01-1.397.965M26.807 5.998V1.012M26.82 1l-4.986 4.998M21.834 1.013h4.974"
      ></path>
    </svg>
  );
};

export default IconSend;
