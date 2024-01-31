import { SVGIconProps } from "@/utils/types";
import { FC } from "react";

const IconTransaction: FC<SVGIconProps> = (props, strokeWidth) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <path
        d="M15.3998 17H6.09173C5.2082 17 4.49192 16.2836 4.49192 15.4V15.1382C2.06601 14.576 0.555272 12.1538 1.11739 9.72764C1.50571 8.05055 2.81501 6.74109 4.49192 6.35273V2.6C4.49192 1.71637 5.2082 1 6.09173 1H12.5899C13.0157 0.999275 13.4244 1.16909 13.7243 1.47128L16.5284 4.27564C16.8381 4.58291 17.0083 5.00327 16.9996 5.43927V15.4C16.9996 16.2836 16.2833 17 15.3998 17ZM5.36454 15.2545V15.4C5.36454 15.8018 5.68996 16.1273 6.09173 16.1273H15.3998C15.8015 16.1273 16.127 15.8018 16.127 15.4V5.94546H13.6545C12.771 5.94546 12.0547 5.22909 12.0547 4.34546V1.87273H6.09173C5.68996 1.87273 5.36454 2.19818 5.36454 2.6V6.23637H5.50998C7.99988 6.23637 10.0186 8.25527 10.0186 10.7455C10.0186 13.2356 7.99988 15.2545 5.50998 15.2545H5.36454ZM5.50998 7.10909C3.50185 7.10909 1.87403 8.73709 1.87403 10.7455C1.87403 12.7538 3.50185 14.3818 5.50998 14.3818C7.51812 14.3818 9.14593 12.7538 9.14593 10.7455C9.14593 8.73709 7.51812 7.10909 5.50998 7.10909ZM12.9273 1.95418V4.34546C12.9273 4.74727 13.2527 5.07273 13.6545 5.07273H16.0455C16.0095 5.00655 15.9644 4.94582 15.9117 4.89237L13.1077 2.088C13.0542 2.03527 12.9935 1.99018 12.9273 1.95418ZM14.2363 12.9273H11.3275C11.0864 12.9273 10.8912 12.732 10.8912 12.4909C10.8912 12.2498 11.0864 12.0545 11.3275 12.0545H14.2363C14.4773 12.0545 14.6726 12.2498 14.6726 12.4909C14.6726 12.732 14.4773 12.9273 14.2363 12.9273ZM4.63735 12.0545C4.525 12.0458 4.42065 11.9938 4.34648 11.9091C4.19849 11.7433 4.19849 11.4931 4.34648 11.3273L5.09112 10.5825V9C5.09112 8.75891 5.28637 8.56364 5.52743 8.56364C5.7685 8.56364 5.96375 8.75891 5.96375 9V10.7455C5.96375 10.8611 5.91757 10.972 5.83576 11.0538L4.92823 11.9091C4.85406 11.9938 4.7497 12.0458 4.63735 12.0545ZM14.2363 10.6H11.9093C11.6682 10.6 11.4729 10.4047 11.4729 10.1636C11.4729 9.92255 11.6682 9.72727 11.9093 9.72727H14.2363C14.4773 9.72727 14.6726 9.92255 14.6726 10.1636C14.6726 10.4047 14.4773 10.6 14.2363 10.6ZM14.2363 8.27273H11.3275C11.0864 8.27273 10.8912 8.07746 10.8912 7.83636C10.8912 7.59527 11.0864 7.4 11.3275 7.4H14.2363C14.4773 7.4 14.6726 7.59527 14.6726 7.83636C14.6726 8.07746 14.4773 8.27273 14.2363 8.27273ZM10.164 5.94546H8.41874C8.17768 5.94546 7.98243 5.75018 7.98243 5.50909C7.98243 5.268 8.17768 5.07273 8.41874 5.07273H10.164C10.4051 5.07273 10.6003 5.268 10.6003 5.50909C10.6003 5.75018 10.4051 5.94546 10.164 5.94546Z"
        fill="currentcolor"
        stroke="currentcolor"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export default IconTransaction;
