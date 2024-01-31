import type { Config } from "tailwindcss";
const rem = (px: number) => {
  return px * 0.0625 + "rem";
};
const config: Config = {
  darkMode: "class",
  content: [
    // app content
    "src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      body: ["'Helvetica Now Display'"],
    },
    extend: {
      colors: {
        primary: "#1A48FF",
        secondary: "#E3E6E9",
        blue: {
          100: "#5FD8FF",
          150: "#25CBFF",
          200: "#49DFDF",
          250: "#53DEE9",
          300: "#061935",
          400: "#05062C",
          500: "#32a4e4",
          600: "#0700ff",
          700: "#06193599",
          800: "#293FFF",
          900: "#001767",
          950: "#627EEA",
          990: "#000D52",
          1000: "#002152",
          1050: "#1F5EFF",
        },
        purple: {
          100: "#C222DC",
          200: "#8723B7",
          300: "#C257C5",
          400: "#FF46CB",
          500: "#8347E6",
          600: "#9B47CF",
          700: "#FF00B8",
        },
        success: {
          50: "#E5F9E7",
          100: "#42CA20",
          200: "#00C113",
          300: "#3BAF1E",
          400: "#18d67b",
          500: "#41C595",
          600: "#079360",
          700: "#04CFC4",
          800: "#038CAA",
        },
        orange: {
          50: "#FBF0D0",
          100: "#F7931A",
          200: "#EB870E",
          300: "#FF7D1F",
          400: "#F09000",
          500: "#FF5A00",
          600: "#FF6F1D",
          700: "#FF7E35",
        },
        yellow: {
          100: "#FFF707",
        },
        gray: {
          100: "#F8F9F9",
          200: "#F1F3F4",
          250: "#D3D3D3",
          300: "#8A94A1",
          350: "#E4E3E2",
          400: "#ffffff0f",
          450: "#222323",
          500: "#E3E4E4",
          600: "#161717",
          700: "#C0C4D2",
          800: "#313131",
        },
        danger: {
          100: "#F31919",
          200: "#EF3052",
        },
        pink: {},
      },
      opacity: {
        "15": "0.15",
      },
      borderRadius: {
        "2xl": "48px",
        "3xl": "200px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    fontWeight: {
      100: "100",
      200: "200",
      300: "300",
      400: "400",
      500: "500",
      600: "600",
      700: "700",
      800: "800",
      900: "900",
    },
    fontSize: {
      10: rem(10),
      12: rem(12),
      14: rem(14),
      16: rem(16),
      18: rem(18),
      20: rem(20),
      22: rem(22),
      24: rem(24),
      26: rem(26),
      28: rem(28),
      32: rem(32),
      36: rem(36),
      40: rem(40),
      42: rem(42),
      48: rem(48),
      52: rem(52),
      56: rem(56),
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
