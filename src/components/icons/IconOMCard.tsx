import { SVGIconProps } from "@/utils/types";
import { FC } from "react";

const IconOMCard: FC<SVGIconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    viewBox="0 0 25 24"
    fill="none"
    {...props}
  >
    <path
      d="M18.55 5.5H5.95C4.42 5.5 3.25 6.67 3.25 8.2V16.3C3.25 17.83 4.42 19 5.95 19H18.55C20.08 19 21.25 17.83 21.25 16.3V8.2C21.25 6.67 19.99 5.5 18.55 5.5ZM13.15 16.3C11.62 16.3 10.45 15.13 10.45 13.6C10.45 12.07 11.62 10.9 13.15 10.9C13.42 10.9 13.6 10.9 13.87 10.99C12.7 11.26 11.89 12.34 11.89 13.6C11.89 14.86 12.79 15.94 13.87 16.21C13.6 16.3 13.33 16.3 13.15 16.3ZM15.85 16.3C14.32 16.3 13.15 15.13 13.15 13.6C13.15 12.07 14.32 10.9 15.85 10.9C17.38 10.9 18.55 12.07 18.55 13.6C18.55 15.13 17.29 16.3 15.85 16.3Z"
      stroke="#1A48FF"
      strokeWidth={1.3}
    />
  </svg>
);
export default IconOMCard;