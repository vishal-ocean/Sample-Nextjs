import { SVGIconProps } from "@/utils/types";
import { FC } from "react";

export const IconCardLimit: FC<SVGIconProps> = (props, strokeWidth) => {
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
        d="M11.3333 10.6665H12.6667C13.4 10.6665 14 10.0665 14 9.33317V3.99984C14 3.2665 13.4 2.6665 12.6667 2.6665H3.33333C2.6 2.6665 2 3.2665 2 3.99984V9.33317C2 10.0665 2.6 10.6665 3.33333 10.6665H4.66667"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 5.3335H14"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 8H11.3333"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.06667 12.4002L8 13.3335"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.00026 10.6668L8.00026 13.3335L8.93359 12.4002"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
