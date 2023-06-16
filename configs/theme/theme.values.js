/** @type {import('tailwindcss').Config} */

import { blue, cyan, green, red, teal, yellow } from 'tailwindcss/colors';

export default {
    colors: {
        primary: blue,
        secondary: teal,
        dark: {
            50: '#eeeeee',
            100: '#cdcdcd',
            200: '#8b8b8b',
            300: '#7a7a7a',
            400: '#595959',
            500: '#494949',
            600: '#383838',
            700: '#282828',
            800: '#161616',
            900: '#000000',
        },
        light: {
            50: '#ffffff',
            100: '#f8f8f8',
            200: '#eeeeee',
            300: '#e5e5e5',
            400: '#e0e0e0',
            500: '#c0c0c0',
            600: '#909090',
            700: '#848484',
            800: '#666666',
            900: '#4c4c4c',
        },
        info: cyan,
        success: green,
        warning: yellow,
        danger: red,
    },
    screens: {
        '6xs': '320px',
        '5xs': '384px',
        '4xs': '448px',
        '3xs': '512px',
        '2xs': '576px',
        xs: '640px',
        sm: '704px',
        md: '768px',
        lg: '896px',
        xl: '1024px',
        '2xl': '1152px',
        '3xl': '1280px',
        '4xl': '1408px',
        '5xl': '1536px',
        '6xl': '1664px',
    },
    fontFamily: {
        main: ['Montserrat', 'sans-serif'],
    },
};
