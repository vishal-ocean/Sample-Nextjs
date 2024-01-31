import { SVGIconProps } from "@/utils/types";
import { FC } from "react";

export const IconWhistle: FC<SVGIconProps> = (props, strokeWidth) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={17}
      height={16}
      viewBox="0 0 17 16"
      fill="none"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <path
        d="M14.2784 7.9983H11.2984C11.485 8.50497 11.565 9.04497 11.5317 9.6183C11.425 11.465 10.0384 13.065 8.21837 13.405C5.56503 13.905 3.25169 11.8383 3.31169 9.26497C3.37169 7.00497 5.33837 5.2583 7.59837 5.2583H14.2717C14.6517 5.2583 14.9584 5.56497 14.9584 5.94497V7.3183C14.965 7.69163 14.6584 7.9983 14.2784 7.9983Z"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <path
        d="M6.5721 9.37221C6.5721 8.90298 6.9562 8.51888 7.42544 8.51888C7.89467 8.51888 8.27877 8.90298 8.27877 9.37221C8.27877 9.84145 7.89467 10.2255 7.42544 10.2255C6.9562 10.2255 6.5721 9.84145 6.5721 9.37221Z"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
      />
      <path
        d="M3.31875 9.37158H2.63208"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <path
        d="M9.4856 3.2062V2.51953"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <path
        d="M7.67222 3.1063L7.18555 2.61963"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <path
        d="M11.2988 3.1063L11.7788 2.61963"
        stroke="currentcolor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};
