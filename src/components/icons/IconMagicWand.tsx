import { SVGIconProps } from "@/utils/types";
import { FC } from "react";

export const IconMagicWand: FC<SVGIconProps> = (props, strokeWidth) => {
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
        d="M4.61445 20.9213L3.07445 19.3813C2.64445 18.9513 2.64445 18.2613 3.07445 17.8413L13.8745 7.04125C14.3045 6.61125 14.9945 6.61125 15.4145 7.04125L16.9545 8.58126C17.3845 9.01126 17.3845 9.70127 16.9545 10.1213L6.15446 20.9213C5.73446 21.3513 5.04445 21.3513 4.61445 20.9213Z"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.7051 9.49609L14.5051 12.2961"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.5039 5.49655L19.2739 4.72656"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5742 3.79608L15.8542 2.74609"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.207 8.42844L21.257 8.14844"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
