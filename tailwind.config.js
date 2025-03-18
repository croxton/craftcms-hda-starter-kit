/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './templates/**/*.twig',
        './src/scripts/**/*.{html,vue}',
        './src/styles/**/*.{css,scss}',
    ],
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
}