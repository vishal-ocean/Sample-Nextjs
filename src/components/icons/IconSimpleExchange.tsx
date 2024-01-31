import { SVGIconProps } from "@/utils/types";
import { FC } from "react";

const IconSimpleExchange: FC<SVGIconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M5 8H16M16 8L13 5M16 8L13 11"
      stroke="#1A48FF"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 16H8M8 16L11 19M8 16L11 13"
      stroke="#1A48FF"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default IconSimpleExchange;
