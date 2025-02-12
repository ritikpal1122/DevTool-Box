/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
			primary: {
				DEFAULT: '#FF0000',
				dark: '#CC0000',
				light: '#FF3333',
			},
			dark: {
				DEFAULT: '#000000',
				light: '#121212',
				lighter: '#1E1E1E',
			},
			gray: {
				850: '#1F1F1F',
			}
			},
			fontFamily: {
			grotesk: ['Space Grotesk', 'sans-serif'],
			},
		},
	},
  	plugins: [require("tailwindcss-animate")],
};