import { themeConfig, themeValues } from './configs/theme';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: { ...themeValues },
    },
    plugins: [themeConfig],
};
