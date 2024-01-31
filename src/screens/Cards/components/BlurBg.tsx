import { SVGProps } from "react";
const BlurBg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={360}
    height={411}
    viewBox="0 0 360 411"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_f_2871_14501)">
      <circle cx={180.5} cy={705.5} r={305.5} fill="currentcolor" />
    </g>
    <defs>
      <filter
        id="filter0_f_2871_14501"
        x={-525}
        y={0}
        width={1411}
        height={1411}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation={200}
          result="effect1_foregroundBlur_2871_14501"
        />
      </filter>
    </defs>
  </svg>
);
export default BlurBg;
