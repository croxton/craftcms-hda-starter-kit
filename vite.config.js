import { defineConfig, loadEnv } from "vite";
import dynamicImport from 'vite-plugin-dynamic-import'
import eslintPlugin from "@nabla/vite-plugin-eslint";
import legacy from '@vitejs/plugin-legacy';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import vue from '@vitejs/plugin-vue'
import stylelint from 'vite-plugin-stylelint';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

// Match ports in .ddev/config.yaml -> web_extra_exposed_ports
const HTTP_PORT = 3000;
const HTTPS_PORT = 3001;

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {

    const env = loadEnv(mode, process.cwd(), '');
    const origin = env.PRIMARY_SITE_URL ?? 'https://localhost';

    let plugins = [
        tailwindcss(),
        dynamicImport(),
        legacy({
            targets: ['defaults', 'not IE 11']
        }),
        //stylelint({
        //    fix: true,
        //}),
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
                '@assets': path.resolve(__dirname, 'src/assets'),
            },
        },
        server: {
            allowedHosts: true,
            cors: { origin: origin },
            host: '0.0.0.0',
            origin: origin + ':' + HTTPS_PORT,
            port: HTTP_PORT,
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
        },
        //css: {
        //    preprocessorOptions: {
        //        scss: {
        //            api: 'modern-compiler' // or "modern"
        //        }
        //    }
        //}
    }
});