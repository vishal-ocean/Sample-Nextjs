import { SVGIconProps } from "@/utils/types";
import { FC } from "react";

export const IconCryptoGrowth: FC<SVGIconProps> = (props) => {
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
        d="M14 7.33337L8.8 12.6L6.06667 9.86671L2 14M14 10V7.33337H11.3333"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.46615 6.93286L1.59961 4.13306L3.46615 1.33325L5.33268 4.13306L3.46615 6.93286Z"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.02105 4.13312L3.4656 4.72419L1.91016 4.13312"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
