import { SVGIconProps } from "@/utils/types";
import { FC } from "react";

export const IconX: FC<SVGIconProps> = (props) => {
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
        d="M9.14163 7.08118L13.6089 2H12.5503L8.67137 6.41192L5.57328 2H2L6.68492 8.6716L2 14H3.05866L7.15491 9.34086L10.4267 14H14L9.14137 7.08118H9.14163ZM7.69165 8.73038L7.21697 8.06604L3.44011 2.77981H5.06615L8.11412 7.04596L8.5888 7.71031L12.5508 13.2557H10.9248L7.69165 8.73063V8.73038Z"
        fill="currentcolor"
      />
    </svg>
  );
};
