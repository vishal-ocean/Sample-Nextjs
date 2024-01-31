import { SVGIconProps } from "@/utils/types";
import { FC } from "react";

export const IconBulb: FC<SVGIconProps> = (props, strokeWidth) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={18}
      viewBox="0 0 16 18"
      fill="none"
      {...props}
    >
      <path
        d="M6.80058 1.57499L6.80082 1.57494C10.3562 0.836376 13.5998 3.51867 13.5998 7.03935C13.5998 8.39841 13.1097 9.70818 12.2134 10.7262C11.753 11.2587 11.5152 11.883 11.5152 12.4932V13.324C11.5152 14.028 11.13 14.6232 10.5701 14.9397C10.2442 16.0286 9.23564 16.8702 7.99978 16.8702C6.76951 16.8702 5.76509 16.0281 5.43273 14.9442C4.86616 14.6286 4.48437 14.0231 4.48437 13.324V12.4932C4.48437 11.8832 4.2414 11.2477 3.81416 10.7702L3.81333 10.7693C2.61384 9.42309 2.15125 7.6199 2.5281 5.83832L6.80058 1.57499ZM6.80058 1.57499C4.68276 2.01584 2.97738 3.71305 2.52812 5.83823L6.80058 1.57499Z"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.99219 4.42383C9.44604 4.42383 10.6307 5.60846 10.6307 7.05462"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 13.9999H11"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 11.9999H11"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
