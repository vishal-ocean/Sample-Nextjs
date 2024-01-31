import { SVGIconProps } from "@/utils/types";
import { FC } from "react";

const IconSendReceive: FC<SVGIconProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M21 16C21 16.6 20.4 17.1 19.3 17.5C18.4 17.8 17.3 18 16 18C14.7 18 13.6 17.8 12.7 17.5C11.7 17.1 11 16.6 11 16C11 14.9 13.2 14 16 14C18.8 14 21 14.9 21 16Z"
        stroke="#1A48FF"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 16V19C21 19.6 20.3 20.1 19.3 20.5C18.4 20.8 17.3 21 16 21C14.7 21 13.6 20.8 12.7 20.5C11.7 20.1 11 19.6 11 19V16C11 16.6 11.7 17.1 12.7 17.5C13.6 17.8 14.8 18 16 18C17.3 18 18.4 17.8 19.3 17.5C20.4 17.1 21 16.6 21 16Z"
        stroke="#1A48FF"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 13C6.7 13 5.6 12.8 4.7 12.5C3.7 12.1 3 11.6 3 11C3 9.9 5.2 9 8 9C10.8 9 13 9.9 13 11"
        stroke="#1A48FF"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 13C6.7 13 5.6 12.8 4.7 12.5C3.6 12.1 3 11.6 3 11V14C3 14.6 3.7 15.1 4.7 15.5C5.6 15.8 6.7 16 8 16"
        stroke="#1A48FF"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 1L11 6M11 6L14.7 6M11 6L11 2.3"
        stroke="#1A48FF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 10L23 5M23 5L19.3 5M23 5L23 8.7"
        stroke="#1A48FF"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconSendReceive;
