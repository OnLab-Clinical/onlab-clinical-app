/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

// Theme
const supportedAppThemeList = ['light', 'dark'];

export default plugin(function ({ addVariant, matchVariant, addBase }) {
    // Load app theme as class
    supportedAppThemeList.forEach(appTheme =>
        addVariant(`theme-${appTheme}`, `:is(.theme-${appTheme} &)`)
    );
    matchVariant(`theme`, value => `:is(.theme-${value} &)`);

    // Load app theme as [data-theme='...']
    supportedAppThemeList.forEach(appTheme =>
        addVariant(`data-theme-${appTheme}`, `:is([data-theme='${appTheme}'] &)`)
    );
    matchVariant('data-theme', value => `:is([data-theme='${value}'] &)`);

    // scrollbar
    addBase({
        '*': {
            scrollbarColor: 'theme(colors.primary.600/90%) theme(colors.primary.600/30%)',
            scrollbarGutter: 'stable',
        },
        body: {
            overflow: 'overlay',
        },
        '::-webkit-scrollbar': {
            background: 'transparent',
            height: '0.25rem',
            width: '0.25rem',
        },
        '::-webkit-scrollbar-track': {
            background: 'theme(colors.primary.600/30%)',
        },
        '::-webkit-scrollbar-thumb': {
            background: 'theme(colors.primary.600/90%)',
            borderRadius: '0.25rem',
        },
        '::-webkit-scrollbar-thumb:hover': {
            background: 'theme(colors.primary.600/100%)',
        },
    });
});
