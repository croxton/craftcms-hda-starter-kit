import { defineConfig, loadEnv } from "vite";
import dynamicImport from 'vite-plugin-dynamic-import'
import viteEslintPlugin from 'vite-plugin-eslint';
import legacy from '@vitejs/plugin-legacy';
import ViteRestart from 'vite-plugin-restart';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import vue from '@vitejs/plugin-vue'
import stylelint from 'vite-plugin-stylelint';
import critical from "rollup-plugin-critical";
import path from 'path';
import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    let plugins = [
        dynamicImport(),
        legacy({
            targets: ['defaults', 'not IE 11']
        }),
        mkcert(),
        stylelint({
            fix: true,
        }),
        viteEslintPlugin({
            cache: false,
            fix: true,
        }),
        ViteRestart({
            reload: [
                './templates/**/*',
            ],
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

    if (env.CRITICAL_CSS === 'true') {
        plugins = plugins.concat([
            critical({
                criticalUrl: env.PRIMARY_SITE_URL.charAt(env.PRIMARY_SITE_URL.length - 1) === "/" ? env.PRIMARY_SITE_URL.slice(0, env.PRIMARY_SITE_URL.length - 1) : env.PRIMARY_SITE_URL,
                criticalBase: './web/criticalcss/',
                criticalPages: [
                    {uri: '/', template: 'index'}
                ],
                criticalConfig: {
                    extract: true,
                },
            }),
        ]);
    }

    return {
        base: command === 'serve' ? '' : '/dist/',
        build: {
            emptyOutDir: true,
            manifest: 'manifest.json',
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
            fs: {
                strict: false
            },
            origin: 'https://localhost:3000',
            port: 3000,
            strictPort: true,
            watch: {
                ignored: [
                    "**/storage/**",
                    "**/web/**",
                    `${__dirname}/.idea/**`,
                    `${__dirname}/.stylelintcache/**`
                ],
            },
        }
    }
});