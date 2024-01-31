import { SVGIconProps } from "@/utils/types";
import { FC } from "react";

const IconOceanCard: FC<SVGIconProps> = (props, strokeWidth) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={15}
      viewBox="0 0 16 15"
      fill="none"
      {...props}
    >
      <path
        d="M8.272 9.37315C8.40427 9.34338 8.51877 9.26118 8.58927 9.14538C8.65978 9.02958 8.68024 8.89011 8.64596 8.75894L8.38718 7.76868C8.31993 7.51133 8.06296 7.35168 7.80244 7.4054C7.08782 7.55278 6.37108 7.13311 6.15006 6.43795C6.06946 6.18445 5.8045 6.03844 5.54715 6.10569L4.55718 6.36439C4.42601 6.39867 4.31438 6.48474 4.24788 6.60288C4.18138 6.72102 4.1657 6.86111 4.20444 6.99103C4.72218 8.72724 6.50446 9.77102 8.272 9.37315Z"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeMiterlimit={10}
      />
      <path
        d="M8.00098 2.5L8.26465 1.78722C8.35158 1.26914 8.82163 0.923278 9.31438 1.01463L13.6965 1.82682C14.1895 1.91817 14.5183 2.41192 14.4314 2.93L13.1722 10.435C13.0853 10.9531 12.6152 11.2989 12.1224 11.2076L11.491 11.0905"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeMiterlimit={10}
      />
      <path
        d="M2.55935 3.40991L2.55928 3.40993C1.73907 3.6232 1.2243 4.45515 1.45457 5.28846C1.45458 5.28848 1.45458 5.28851 1.45459 5.28853L3.43867 12.4709C3.62987 13.1631 4.26677 13.6001 4.94176 13.6001C5.07381 13.6001 5.20822 13.5836 5.34171 13.5488L9.88509 12.368L9.88516 12.368C10.7054 12.1547 11.2201 11.3227 10.9899 10.4894C10.9899 10.4894 10.9899 10.4894 10.9899 10.4894L9.00577 3.30697C8.81458 2.61483 8.17767 2.17783 7.50269 2.17783C7.37078 2.17783 7.23652 2.19429 7.10318 2.22901C7.10315 2.22902 7.10311 2.22903 7.10308 2.22904C7.10296 2.22906 7.10285 2.22909 7.10274 2.22912L2.55935 3.40991Z"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconOceanCard;
