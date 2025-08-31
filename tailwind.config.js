const { heroui } = require("@heroui/theme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './wrappers/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        // Brand color: light yellow for primary
        primary: {
          DEFAULT: "#FFE066", // light yellow
          dark: "#FFD700",    // gold/yellow for dark mode
        },
        // You can add more custom colors here
      },
      fontSize: {
        // Responsive font sizes for headings, subheadings, body, small
        heading: [
          "1.5rem", // base: 24px
          {
            lineHeight: "2rem",
            "@screen sm": { fontSize: "1.875rem" }, // 30px
            "@screen md": { fontSize: "2.25rem" },  // 36px
            "@screen lg": { fontSize: "2.5rem" },   // 40px
            "@screen xl": { fontSize: "3rem" },     // 48px
          },
        ],
        subheading: [
          "1.25rem", // base: 20px
          {
            lineHeight: "1.75rem",
            "@screen sm": { fontSize: "1.5rem" },   // 24px
            "@screen md": { fontSize: "1.75rem" },  // 28px
            "@screen lg": { fontSize: "2rem" },     // 32px
            "@screen xl": { fontSize: "2.25rem" },  // 36px
          },
        ],
        body: [
          "0.875rem", // base: 14px
          {
            lineHeight: "1.25rem",
            "@screen sm": { fontSize: "1rem" },     // 16px
            "@screen md": { fontSize: "1.125rem" }, // 18px
            "@screen lg": { fontSize: "1.125rem" }, // 18px
            "@screen xl": { fontSize: "1.25rem" },  // 20px
          },
        ],
        small: [
          "0.75rem", // base: 12px
          {
            lineHeight: "1rem",
            "@screen sm": { fontSize: "0.875rem" }, // 14px
            "@screen md": { fontSize: "0.875rem" }, // 14px
            "@screen lg": { fontSize: "1rem" },     // 16px
            "@screen xl": { fontSize: "1rem" },     // 16px
          },
        ],
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
