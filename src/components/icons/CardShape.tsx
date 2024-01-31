import { SVGProps } from "react";

// interface CardShape {
//   props: SVGProps<SVGSVGElement>;
//   color1: string;
//   color2: string;
//   color3: string;
// }
interface SVGIconProps extends SVGProps<SVGSVGElement> {
  color1?: string;
  color2?: string;
  color3?: string;
}

export const CardShape = ({
  color1,
  color2,
  color3,
  ...props
}: SVGIconProps) => {
  return (
    <svg
      width={402}
      height={240}
      viewBox="0 0 402 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="mask0_2829_37412"
        style={{
          maskType: "alpha",
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={402}
        height={240}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M402 65.6889C402 57.0295 389.659 51 381 51C364.431 51 351 37.5685 351 21C351 12.3406 344.97 0 336.311 0H18C8.05888 0 0 8.05887 0 18V222C0 231.941 8.05888 240 18 240H384C393.941 240 402 231.941 402 222V65.6889Z"
          fill="black"
        />
      </mask>
      <g mask="url(#mask0_2829_37412)">
        <g filter="url(#filter0_b_2829_37412)">
          <rect width={402} height={240} rx={18} fill={color1} />
        </g>
        <g filter="url(#filter1_f_2829_37412)">
          <path
            d="M568.425 434.907C568.425 657.389 388.068 837.746 165.587 837.746C-56.8949 837.746 -237.252 657.389 -237.252 434.907C-237.252 212.426 -3.26445 -26.3581 165.587 32.0688C458.001 309.108 568.425 212.426 568.425 434.907Z"
            fill={color2}
          />
        </g>
        <g filter="url(#filter2_f_2829_37412)">
          <circle cx={165.587} cy={528.839} r={402.839} fill={color3} />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_b_2829_37412"
          x={-40.2}
          y={-40.2}
          width={482.4}
          height={320.4}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation={20} />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_2829_37412"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_2829_37412"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_f_2829_37412"
          x={-349.074}
          y={-88.6911}
          width={1029.32}
          height={1038.26}
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
            stdDeviation={55.911}
            result="effect1_foregroundBlur_2829_37412"
          />
        </filter>
        <filter
          id="filter2_f_2829_37412"
          x={-349.074}
          y={14.178}
          width={1029.32}
          height={1029.32}
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
            stdDeviation={55.911}
            result="effect1_foregroundBlur_2829_37412"
          />
        </filter>
      </defs>
    </svg>
  );
};
