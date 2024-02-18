/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				'background-color': 'var(--background-color)',
				'primary-color': 'var(--primary-color)',
				'secondary-color': 'var(--secondary-color)',
			},
			animation: {
				openmenuitems:
					'openmenuitems .55s cubic-bezier(0.4, 0, 0.2, 1)',
				closemenuitems:
					'closemenuitems .1s cubic-bezier(0.4, 0, 0.2, 1)',
			},
			keyframes: {
				openmenuitems: {
					'0%': { opacity: 0, width: '100px' },
					'100%': { opacity: 1, width: '230px' },
				},
				closemenuitems: {
					'0%': { opacity: 0.5, width: '230px' },
					'50%': { opacity: 0 },
					'100%': { width: '0px' },
				},
			},
		},
	},
	plugins: [],
};
