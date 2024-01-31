import { SVGIconProps } from "@/utils/types";
import { FC } from "react";

export const IconCloseBook: FC<SVGIconProps> = (props) => {
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
        d="M11.9974 1.33398H5.33073C3.86406 1.33398 2.66406 2.53398 2.66406 4.00065V12.0007C2.66406 13.4673 3.86406 14.6673 5.33073 14.6673H11.9974C12.7307 14.6673 13.3307 14.0673 13.3307 13.334V2.66732C13.3307 1.93398 12.7307 1.33398 11.9974 1.33398ZM6.66406 4.00065H9.33073C9.73073 4.00065 9.9974 4.26732 9.9974 4.66732C9.9974 5.06732 9.73073 5.33398 9.33073 5.33398H6.66406C6.26406 5.33398 5.9974 5.06732 5.9974 4.66732C5.9974 4.26732 6.26406 4.00065 6.66406 4.00065ZM11.9974 13.334H5.33073C4.5974 13.334 3.9974 12.734 3.9974 12.0007C3.9974 11.2673 4.5974 10.6673 5.33073 10.6673H11.9974V13.334Z"
        fill="currentcolor"
      />
    </svg>
  );
};
