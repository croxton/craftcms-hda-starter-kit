/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './templates/**/*.twig',
        './src/scripts/**/*.{html,vue}',
        './src/styles/**/*.{css,scss}',
    ],
    theme: {
        screens: {
            'xs': '480px',
            'sm': '640px',
            'md': '768px',
            'ml': '896px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1472px',
            '3xl': '1600px',
            'print': {'raw': 'print'}
        },
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
