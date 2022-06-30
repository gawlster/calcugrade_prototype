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
            colors: {
                dark: '#4c3a5b',
                mid: '#7c31be',
                light: '#9237e2',
            },
        },
    },
    plugins: [],
}
