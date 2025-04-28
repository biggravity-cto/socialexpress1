
import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
        display: ["Plus Jakarta Sans", ...fontFamily.sans],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        resort: {
          '50': '#f7f9fa',
          '100': '#e9eef2',
          '200': '#d4dfe7',
          '300': '#b3c7d5',
          '400': '#8ba7bc',
          '500': '#6d8ba3',
          '600': '#587189',
          '700': '#4a5d70',
          '800': '#3f4e5d',
          '900': '#384250',
        },
        ocean: {
          '50': '#f0f9fb',
          '100': '#d9f1f6',
          '200': '#b8e4ed',
          '300': '#8ad1e1',
          '400': '#54b7d0',
          '500': '#3499b7',
          '600': '#2d7c9b',
          '700': '#2a657f',
          '800': '#2a5468',
          '900': '#274857',
        },
        sand: {
          '50': '#f9f7f4',
          '100': '#f2ede5',
          '200': '#e5dccf',
          '300': '#d5c4ae',
          '400': '#c4a689',
          '500': '#b58f6c',
          '600': '#a6795c',
          '700': '#8b624c',
          '800': '#735244',
          '900': '#60463c',
        },
        
        // Brand colors updated for Big Gravity with space theme
        brand: {
          primary: "#95D4E3",    // Primary brand color
          secondary: "#3EDBB2",  // Secondary brand color
          green: "#3BFFCB",      // Brand green
        },
        
        // Space theme colors
        space: {
          dark: "#0A0E1C",       // Deep space background
          darker: "#05070E",     // Darker areas
          blue: "#1C2444",       // Cosmic blue accents
          purple: "#2D1B4E",     // Cosmic purple accents
          accent: "#8C52FF",     // Space accent
        }
      },
      boxShadow: {
        'glow': '0 0 15px rgba(59, 255, 203, 0.5)',
        'glow-blue': '0 0 15px rgba(149, 212, 227, 0.5)',
        'glow-white': '0 0 15px rgba(255, 255, 255, 0.3)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        ping: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '75%, 100%': { transform: 'scale(2)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "ping": "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse": "pulse 3s ease-in-out infinite",
        "shimmer": "shimmer 8s ease-in-out infinite",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-space': 'linear-gradient(to right, #3BFFCB, #95D4E3)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
