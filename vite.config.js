import { defineConfig, loadEnv } from "vite";
import basicSsl from '@vitejs/plugin-basic-ssl';
import dynamicImport from 'vite-plugin-dynamic-import'
import viteEslintPlugin from 'vite-plugin-eslint';
import legacy from '@vitejs/plugin-legacy';
import ViteRestart from 'vite-plugin-restart';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import vue from '@vitejs/plugin-vue'
import stylelint from 'vite-plugin-stylelint';
import critical from "rollup-plugin-critical";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    let plugins = [
        basicSsl(),
        dynamicImport(),
        legacy({
            targets: ['defaults', 'not IE 11']
        }),
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
        server: {
            fs: {
                strict: false
            },
            origin: 'http://localhost:3000', // set to 0.0.0.0 if using DDEV
            port: 3000,
            strictPort: true,
        }
    }
});