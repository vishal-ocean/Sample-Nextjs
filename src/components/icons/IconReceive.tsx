import { SVGIconProps } from "@/utils/types";
import { FC } from "react";

const IconReceive: FC<SVGIconProps> = (props, strokeWidth) => {
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
        d="M10.5 8C10.5 8.3 10.2 8.55 9.65 8.75C9.2 8.9 8.65 9 8 9C7.35 9 6.8 8.9 6.35 8.75C5.85 8.55 5.5 8.3 5.5 8C5.5 7.45 6.6 7 8 7C9.4 7 10.5 7.45 10.5 8Z"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 8V9.5C10.5 9.8 10.15 10.05 9.65 10.25C9.2 10.4 8.65 10.5 8 10.5C7.35 10.5 6.8 10.4 6.35 10.25C5.85 10.05 5.5 9.8 5.5 9.5V8C5.5 8.3 5.85 8.55 6.35 8.75C6.8 8.9 7.4 9 8 9C8.65 9 9.2 8.9 9.65 8.75C10.2 8.55 10.5 8.3 10.5 8Z"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 6.5C3.35 6.5 2.8 6.4 2.35 6.25C1.85 6.05 1.5 5.8 1.5 5.5C1.5 4.95 2.6 4.5 4 4.5C5.4 4.5 6.5 4.95 6.5 5.5"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 6.5C3.35 6.5 2.8 6.4 2.35 6.25C1.8 6.05 1.5 5.8 1.5 5.5V7C1.5 7.3 1.85 7.55 2.35 7.75C2.8 7.9 3.35 8 4 8"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 1.5L8 4"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.84961 4L7.99961 4L7.99961 2.15"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconReceive;
