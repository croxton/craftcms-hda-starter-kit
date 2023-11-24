/** @type {import('tailwindcss').Config} */
export default {
    mode: 'jit',
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
