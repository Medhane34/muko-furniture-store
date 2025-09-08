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
    "./config/**/*.{js,ts,jsx,tsx}", // Add this to include config/fonts.ts
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        primary: {
          DEFAULT: "#FFE066",
          dark: "#FFD700",
        },
        text: {
        light: "#1F2937", // dark gray for light theme
        dark: "#F9FAFB",  // near white for dark theme
      },
      background: {
        light: "#F9FAFB",
        dark: "#080404",
      },
        // Add gradient colors for easy reference
        gradient: {
          from: "#FF3366",
          to: "#FF9933",
          secondaryFrom: "#4361EE",
          secondaryTo: "#3A0CA3",
        },
        // Add badge-specific gradients
      backgroundImage: {
        'gradient-badge-primary': 'linear-gradient(90deg, #FF3366 0%, #FF9933 100%)',
        'gradient-badge-secondary': 'linear-gradient(90deg, #4361EE 0%, #3A0CA3 100%)',
        'gradient-badge-success': 'linear-gradient(90deg, #10B981 0%, #059669 100%)',
        'gradient-badge-warning': 'linear-gradient(90deg, #F59E0B 0%, #D97706 100%)',
        'gradient-badge-error': 'linear-gradient(90deg, #EF4444 0%, #DC2626 100%)',
      },

      // box shadow for dark theme 
      boxShadow: {
        'xl-dark': '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
      },

      },
      fontSize: {
        // Your existing font sizes...
        heading: [
          "1.5rem",
          {
            lineHeight: "2rem",
            "@screen sm": { fontSize: "1.875rem" },
            "@screen md": { fontSize: "2.25rem" },
            "@screen lg": { fontSize: "2.5rem" },
            "@screen xl": { fontSize: "3rem" },
          },
        ],
        subheading: [
          "1.25rem",
          {
            lineHeight: "1.75rem",
            "@screen sm": { fontSize: "1.5rem" },
            "@screen md": { fontSize: "1.75rem" },
            "@screen lg": { fontSize: "2rem" },
            "@screen xl": { fontSize: "2.25rem" },
          },
        ],
        body: [
          "0.875rem",
          {
            lineHeight: "1.25rem",
            "@screen sm": { fontSize: "1rem" },
            "@screen md": { fontSize: "1.125rem" },
            "@screen lg": { fontSize: "1.125rem" },
            "@screen xl": { fontSize: "1.25rem" },
          },
        ],
        small: [
          "0.75rem",
          {
            lineHeight: "1rem",
            "@screen sm": { fontSize: "0.875rem" },
            "@screen md": { fontSize: "0.875rem" },
            "@screen lg": { fontSize: "1rem" },
            "@screen xl": { fontSize: "1rem" },
          },
        ],
      },
      // Add animations
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'badge-pulse': 'badgePulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'badge-bounce': 'badgeBounce 1s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        badgePulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        badgeBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-3px)' },
        },
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