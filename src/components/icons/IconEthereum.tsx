import { SVGIconProps } from "@/utils/types";
import { FC } from "react";

const IconEthereum: FC<SVGIconProps> = (props, strokeWidth) => {
  return (
    <svg
      width={22}
      height={22}
      fill="none"
      viewBox="0 0 22 22"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M11 14.197 4.606 11 11 2.779 17.394 11 11 14.197Z"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentcolor"
      />
      <path
        d="M17.394 11 11 19.221 4.606 11"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentcolor"
      />
    </svg>
  );
};

export default IconEthereum;
