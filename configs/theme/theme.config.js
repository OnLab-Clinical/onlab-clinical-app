/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

// Theme
const supportedAppThemeList = ['light', 'dark'];

export default plugin(function ({ addVariant, addBase }) {
    // Load app theme as class
    supportedAppThemeList.forEach(appTheme =>
        addVariant(`theme-${appTheme}`, `:is(.theme-${appTheme} &)`)
    );

    // scrollbar
    addBase({
        '*': {
            scrollbarColor: 'theme(colors.primary.600/100%) transparent',
            scrollbarGutter: 'stable',
        },
        '::-webkit-scrollbar': {
            background: 'transparent',
            height: '0.325rem',
            width: '0.325rem',
        },
        '::-webkit-scrollbar-track': {
            background: 'transparent',
        },
        /* '::-webkit-scrollbar-track:hover': {
            background: 'theme(colors.primary.600/30%)',
        }, */
        '::-webkit-scrollbar-thumb': {
            background: 'theme(colors.primary.600/90%)',
            borderRadius: '0.325rem',
        },
        '::-webkit-scrollbar-thumb:hover': {
            background: 'theme(colors.primary.600/100%)',
        },
    });
});
