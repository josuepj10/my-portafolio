import { access } from "fs";
import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		container: {
			center: true,
			padding: "15px"
		},
		screens: {
			sm: "640px",
			md: "768px",
			lg: "960px",
			xl: "1200px"
		},
		fontFamily: {
			primary: "var(--font-poppins)"
		},
  		colors: {
			background: '#000',
  			primary: '#030014',
			secondary: '#7A64FA',
  			accent: {
				DEFAULT: '#00ff99',
				hover: '#00e187'
			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
