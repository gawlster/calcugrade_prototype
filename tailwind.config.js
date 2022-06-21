/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        screens: {
            tablet: '640px',
            laptop: '1024px',
            desktop: '1280px',
        },
        fontFamily: {
            sans: ['Anek Latin', 'sans-serif'],
        },
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--gradient-color-stops))',
            },
        },
    },
    plugins: [],
}
