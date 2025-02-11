import { defineConfig, loadEnv } from "vite";
import dynamicImport from 'vite-plugin-dynamic-import'
import legacy from '@vitejs/plugin-legacy';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import vue from '@vitejs/plugin-vue'
import path from 'path';
import mkcert from 'vite-plugin-mkcert';
import tailwindcss from '@tailwindcss/vite';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    let plugins = [
        tailwindcss(),
        dynamicImport(),
        legacy({
            targets: ['defaults', 'not IE 11']
        }),
        checker({
            eslint: {
                lintCommand: 'eslint "./src/scripts/**/*.{vue,js,jsx,mjs}"',
                useFlatConfig: true
            },
            stylelint : {
                lintCommand: 'stylelint "./src/styles/**/*.{css,scss}"',
            },
        }),
        mkcert(),
        viteStaticCopy({
            targets: [
                {
                    src: 'src/static',
                    dest: ''
                }
            ]
        }),
        vue(),
    ];

    return {
        base: command === 'serve' ? '' : '/dist/',
        build: {
            emptyOutDir: true,
            manifest: true,
            outDir: './web/dist/',
            rollupOptions: {
                input: {
                    app: './src/scripts/main.js',
                },
                output: {
                    /*
                    Optionally, manually separate out a vendor chunk containing
                    modules imported by lots of your components

                    manualChunks: (id) => {
                        if (id.includes("node_modules")) {
                            if (id.includes('alpine')
                                || id.includes('lazysizes')
                                || id.includes('pubsub-js')
                                || id.includes('vue')
                            ) {
                                return "vendor";
                            }
                        }
                    },
                    */
                }

            },
        },
        plugins: plugins,
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '@css': path.resolve(__dirname, 'src/styles'),
                '@js': path.resolve(__dirname, 'src/scripts'),
                '@assets': path.resolve(__dirname, 'src/assets'),
            },
        },
        server: {
            allowedHosts: true,
            cors: { origin: /https?:\/\/([A-Za-z0-9\-\.]+)?(localhost|\.local|\.test|\.site)(?::\d+)?$/ },
            origin: 'https://localhost:3000',
            port: 3000,
            strictPort: true,
            watch: {
                ignored: [
                    "**/storage/**",
                    "**/web/**",
                    "**/vendor/**",
                    `${__dirname}/.idea/**`,
                    `${__dirname}/.stylelintcache/**`,
                    `${__dirname}/.eslintcache/**`
                ],
            },
        }
    }
});