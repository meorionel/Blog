/** @type {import('tailwindcss').Config} */

module.exports = {
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				rose: {
					main: "var(--color-rose-main)",
					moon: "var(--color-rose-moon)",
					dawn: "var(--color-rose-dawn)",
				},
			},
			typography: {
				DEFAULT: {
					css: {
						"code::before": {
							content: '""',
						},
						"code::after": {
							content: '""',
						},
						'ul > li:has(input[type="checkbox"])': {
							listStyle: "none",
						},
						'ul > li > input[type="checkbox"]:first-child': {
							margin: "0 8px 0 -30px",
						},
					},
				},
			},
		},
	},
};
