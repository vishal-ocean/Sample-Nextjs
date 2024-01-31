import { SVGProps } from "react";

interface SVGIconProps extends SVGProps<SVGSVGElement> {
  color1?: string;
  color2?: string;
  color3?: string;
}
export const SmallCardShape = ({
  color1,
  color2,
  color3,
  ...props
}: SVGIconProps) => {
  return (
    <svg
      width={324}
      height={200}
      viewBox="0 0 324 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="mask0_3098_14347"
        style={{
          maskType: "alpha",
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={324}
        height={200}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M324 64.2555C324 55.7948 312.461 50 304 50V50C287.431 50 274 36.5685 274 20V20C274 11.5394 268.205 0 259.745 0H20C8.95431 0 0 8.95431 0 20V180C0 191.046 8.95431 200 20 200H304C315.046 200 324 191.046 324 180V64.2555Z"
          fill="black"
        />
      </mask>
      <g mask="url(#mask0_3098_14347)">
        <g filter="url(#filter0_b_3098_14347)">
          <rect width={324} height={200} rx={20} fill={color1} />
        </g>
        <g filter="url(#filter1_f_3098_14347)">
          <path
            d="M474.718 363.403C474.718 549.205 324.094 699.827 138.291 699.827C-47.5131 699.827 -198.137 549.205 -198.137 363.403C-198.137 177.602 -2.72407 -21.8141 138.291 26.98C382.498 258.344 474.718 177.602 474.718 363.403Z"
            fill={color2}
          />
        </g>
        <g filter="url(#filter2_f_3098_14347)">
          <ellipse
            cx={138.291}
            cy={441.847}
            rx={336.427}
            ry={336.423}
            fill={color3}
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_b_3098_14347"
          x={-33.5725}
          y={-33.5725}
          width={391.145}
          height={267.145}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation={16.7862} />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_3098_14347"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_3098_14347"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_f_3098_14347"
          x={-291.523}
          y={-73.871}
          width={859.629}
          height={867.084}
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
            stdDeviation={46.6933}
            result="effect1_foregroundBlur_3098_14347"
          />
        </filter>
        <filter
          id="filter2_f_3098_14347"
          x={-291.523}
          y={12.0372}
          width={859.629}
          height={859.62}
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
            stdDeviation={46.6933}
            result="effect1_foregroundBlur_3098_14347"
          />
        </filter>
      </defs>
    </svg>
  );
};
