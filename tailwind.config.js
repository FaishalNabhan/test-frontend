/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {},
	},
	plugins: [require('prettier-plugin-tailwindcss')],
}

// module.exports = {
//   plugins: [
//     require('taos/plugin')
//   ],
// }

// module.exports = {
//   safelist: [
//     '!duration-[0ms]',
//     '!delay-[0ms]',
//     'html.js :where([class*="taos:"]:not(.taos-init))'
//   ]
// }

// module.exports = {
//   content: {
//     transform: (content) => content.replace(/taos:/g, ''),
//   },
// }
