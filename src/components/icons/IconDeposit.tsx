import { SVGIconProps } from "@/utils/types";
import { FC } from "react";

export const IconDeposit: FC<SVGIconProps> = (props, strokeWidth) => {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 25"
      {...props}
    >
      <path
        d="M5.404 19.542c-2.648-3.003-2.357-7.626.645-10.274C7.05 8.386 8.201 7.856 9.421 7.59c2.44-.534 5.136.323 6.902 2.325 1.765 2.002 2.278 4.784 1.442 7.138-.418 1.177-1.087 2.253-2.088 3.135-3.002 2.648-7.625 2.357-10.273-.645Z"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.696 17.984 8.674 14.95l2.022-3.033 2.022 3.033-2.022 3.033Z"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m12.38 14.95-1.685.64-1.685-.64"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.02 7.84c.335-.497.735-.96 1.21-1.38 3.004-2.647 7.627-2.357 10.274.646 2.648 3.003 2.358 7.626-.645 10.274a7.172 7.172 0 0 1-1.397.965M22.44 1.001v4.986M22.424 5.998 27.41 1M27.41 5.985h-4.974"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
