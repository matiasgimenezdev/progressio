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
				openmenu: 'openmenu .3s ease-in',
				closemenu: 'closemenu .3s ease-in',
				openmenuitems: 'openmenuitems .3s ease-in',
				closemenuitems: 'closemenuitems .3s ease-in',
			},
			keyframes: {
				openmenu: {
					'0%': { width: '0px' },
					'100%': { width: '250px' },
				},
				closemenu: {
					'0%': { width: '250px' },
					'100%': { width: '0px' },
				},
				openmenuitems: {
					'0%': { opacity: 0, width: '100px' },
					'100%': { opacity: 1, width: '230px' },
				},
				closemenuitems: {
					'0%': { opacity: 1, width: '230px' },
					'100%': { opacity: 0, width: '100px' },
				},
			},
		},
	},
	plugins: [],
};
