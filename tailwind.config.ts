import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'theme-dark-green': '#acb886',
        'theme-green': '#ccd5ae',
        'theme-light-green': '#e9edc9',
        'theme-white': '#fefae0',
        'theme-light-brown': '#faedcd',
        'theme-brown': '#e8c8a7',
        'theme-dark-brown': '#d4a373',
        'graphite': '#41424C',
        'theme-red': '#dd3333',
        'theme-light-red': '#fc8888',
      },
      backgroundImage: {
        'grid': "url('/img/grid-bg.png')",
      },
      lineHeight: {
        'poem':	'3rem',
        'poem-1/2':	'1.5rem',
      }
    },
  },
  plugins: [],
};
export default config;
