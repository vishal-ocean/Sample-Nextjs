import { SVGIconProps } from "@/utils/types";
import { FC } from "react";

export const IconBolt: FC<SVGIconProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={12}
      height={14}
      viewBox="0 0 12 14"
      fill="none"
      {...props}
    >
      <path
        d="M5.33326 13.6665C5.15645 13.6665 4.98688 13.5962 4.86186 13.4712C4.73684 13.3462 4.6666 13.1766 4.6666 12.9998V8.9998H1.33326C1.21029 8.99982 1.08971 8.96582 0.98486 8.90158C0.880007 8.83733 0.794968 8.74533 0.739147 8.63576C0.683327 8.52619 0.6589 8.40331 0.668568 8.28072C0.678236 8.15813 0.721623 8.0406 0.79393 7.94114L6.12726 0.607802C6.21002 0.493899 6.32672 0.409121 6.46063 0.365622C6.59454 0.322124 6.73878 0.322137 6.87268 0.36566C7.00658 0.409182 7.12326 0.493981 7.206 0.607899C7.28874 0.721817 7.33329 0.859007 7.33326 0.999802V4.9998H10.6666C10.7896 4.99978 10.9101 5.03378 11.015 5.09803C11.1199 5.16228 11.2049 5.25427 11.2607 5.36385C11.3165 5.47342 11.341 5.59629 11.3313 5.71888C11.3216 5.84148 11.2782 5.959 11.2059 6.05847L5.8726 13.3918C5.81074 13.4769 5.72963 13.5461 5.6359 13.5939C5.54216 13.6416 5.43846 13.6665 5.33326 13.6665Z"
        fill="currentcolor"
      />
    </svg>
  );
};
