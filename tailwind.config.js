/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
		'./src/app/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			screens: {
				mini: '420px',
				// => @media (min-width: 400px) { ... }

				xs: '500px',
				// => @media (min-width: 500px) { ... }

				// THESE BOTTOM ARE DEFAULT, PUT THEM HERE JUST FOR REFERENCE

				//'sm': '640px',
				// => @media (min-width: 640px) { ... }

				//'md': '768px',
				// => @media (min-width: 768px) { ... }

				//'lg': '1024px',
				// => @media (min-width: 1024px) { ... }

				//'xl': '1280px',
				// => @media (min-width: 1280px) { ... }

				//'2xl': '1536px',
				// => @media (min-width: 1536px) { ... }
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
	},
	plugins: [],
};
