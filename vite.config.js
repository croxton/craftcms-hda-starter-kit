import { defineConfig, loadEnv } from "vite";
import dynamicImport from 'vite-plugin-dynamic-import'
import eslintPlugin from "@nabla/vite-plugin-eslint";
import legacy from '@vitejs/plugin-legacy';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import vue from '@vitejs/plugin-vue'
import stylelint from 'vite-plugin-stylelint';
import path from 'path';

// Match ports in .ddev/config.yaml -> web_extra_exposed_ports
const HTTP_PORT = 3000;
const HTTPS_PORT = 3001;

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const originPort = env.PRIMARY_SITE_URL.startsWith('https')
        ? HTTPS_PORT
        : HTTP_PORT
    let plugins = [
        dynamicImport(),
        legacy({
            targets: ['defaults', 'not IE 11']
        }),
        stylelint({
            fix: true,
        }),
        eslintPlugin({
            cache: false,
            fix: true,
        }),
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
                    */
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
                }

            },
        },
        plugins: plugins,
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '@css': path.resolve(__dirname, 'src/styles'),
                '@js': path.resolve(__dirname, 'src/scripts'),
            },
        },
        server: {
            host: '0.0.0.0',
            strictPort: true,
            port: HTTP_PORT,
            origin: env.PRIMARY_SITE_URL + ':' + originPort,
            watch: {
                ignored: [
                    "**/storage/**",
                    "**/web/**",
                    "**/vendor/**",
                    `${__dirname}/.idea/**`,
                    `${__dirname}/.stylelintcache/**`
                ],
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler' // or "modern"
                }
            }
        }
    }
});