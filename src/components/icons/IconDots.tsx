import { SVGIconProps } from "@/utils/types";
import { FC } from "react";

export const IconDots: FC<SVGIconProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="972px"
      height="972px"
      viewBox="0 0 972 972"
      {...props}
    >
      <g>
        <path d="M90,576h0.5c49.7,0,90-40.3,90-90s-40.3-90-90-90H90c-49.7,0-90,40.3-90,90S40.3,576,90,576z" />
        <path d="M617.5,576h1.1c49.7,0,90-40.3,90-90s-40.3-90-90-90h-1.1c-49.7,0-90,40.3-90,90S567.8,576,617.5,576z" />
        <path d="M354.5,576c49.7,0,90-40.3,90-90s-40.3-90-90-90h-1.1c-49.7,0-90,40.3-90,90s40.3,90,90,90H354.5z" />
        <path d="M881.5,576h0.5c49.7,0,90-40.3,90-90s-40.3-90-90-90h-0.5c-49.7,0-90,40.3-90,90S831.8,576,881.5,576z" />
      </g>
    </svg>
  );
};
