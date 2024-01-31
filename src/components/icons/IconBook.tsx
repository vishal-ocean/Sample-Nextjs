import { SVGIconProps } from "@/utils/types";
import { FC } from "react";

export const IconBook: FC<SVGIconProps> = (props, strokeWidth) => {
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
        d="M8.00016 12.8735H3.20683C2.45349 12.8735 1.8335 12.2535 1.8335 11.5001V4.64677C1.8335 3.89344 2.45349 3.27344 3.20683 3.27344H3.8135"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.99974 3.28028V12.8736C7.79307 12.5403 7.17973 11.6536 5.99306 11.167C5.45306 10.947 4.93973 10.8736 4.53973 10.8536C4.17307 10.8403 3.89307 10.5336 3.89307 10.1736V2.58029C3.89307 2.19362 4.20641 1.88031 4.59308 1.89364C4.97308 1.90698 5.4264 1.96695 5.91307 2.11362C6.93307 2.41362 7.63307 2.95362 7.99974 3.28028Z"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.1667 4.64661V11.5C14.1667 12.2533 13.5467 12.8733 12.7933 12.8733H8V3.27995H12.7933C13.5467 3.27995 14.1667 3.89328 14.1667 4.64661Z"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.0464 5.3138H12.1197"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.0464 8.07292H12.1197"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.0464 10.8398H12.1197"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
