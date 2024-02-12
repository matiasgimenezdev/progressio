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
				openmenu: 'openmenu .35s linear',
				closemenu: 'closemenu .35s linear',
				openmenuitems: 'openmenuitems .2s linear',
				closemenuitems: 'closemenuitems .1s linear',
				opacity: 'opacity .6s ease-in',
			},
			keyframes: {
				openmenu: {
					'0%': { width: '40px' },
					'100%': { width: '250px' },
				},
				closemenu: {
					'0%': { width: '250px' },
					'100%': { width: '40px' },
				},
				openmenuitems: {
					'0%': { opacity: 0, width: '100px' },
					'100%': { opacity: 1, width: '230px' },
				},
				closemenuitems: {
					'0%': { opacity: 0.5, width: '230px' },
					'50%': { opacity: 0 },
					'100%': { width: '0px' },
				},
				opacity: {
					'0%': { opacity: 0 },
					'100%': { opacity: 1 },
				},
			},
		},
	},
	plugins: [],
};
