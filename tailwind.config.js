/** @type {import('tailwindcss').Config} */
export default {
    mode: 'jit',
    content: [
        './templates/**/*.twig',
        './src/**/*.{js,jsx,ts,tsx,vue}',
        './src/**/*.{css,scss}',
    ],
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
