/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "#333333",
        input: "#333333",
        ring: "#D4AF37",
        background: "#000000",
        foreground: "#ffffff",
        primary: {
          DEFAULT: "#D4AF37",
          foreground: "#000000",
        },
        secondary: {
          DEFAULT: "#FFD700",
          foreground: "#000000",
        },
        destructive: {
          DEFAULT: "hsl(0 84.2% 60.2%)",
          foreground: "hsl(0 0% 98%)",
        },
        muted: {
          DEFAULT: "#1a1a1a",
          foreground: "#a3a3a3",
        },
        accent: {
          DEFAULT: "#B8860B",
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "#0a0a0a",
          foreground: "#ffffff",
        },
        card: {
          DEFAULT: "#0a0a0a",
          foreground: "#ffffff",
        },
      },
      fontFamily: {
        heading: ["Anton", "sans-serif"],
        body: ["Manrope", "sans-serif"],
        accent: ["Permanent Marker", "cursive"],
      },
      borderRadius: {
        lg: "0px",
        md: "0px",
        sm: "0px",
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
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: 'float 3s ease-in-out infinite',
        rotate: 'rotate 20s linear infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
