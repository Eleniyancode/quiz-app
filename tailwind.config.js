module.exports = {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            keyframes: {
                fadeIn: {
                    '0%': {opacity: 0},
                    '100%': {opacity: 1},
                },
                fadeOut: {
                    '0%': {opacity: 1},
                    '100%': {opacity: 0}
                },
            },
            animation: {
                fadeIn: 'fadeIn 1s ease-in-out forwards',
                fadeout: 'fadeout 0.5s ease-in-out forwards',
            },
            colors: {
                navyPrimary: 'hsl(235, 21%, 11%)',
            },
        },
    },
    plugins: [],
};