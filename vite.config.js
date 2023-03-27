import basicSsl from '@vitejs/plugin-basic-ssl';
import dynamicImport from 'vite-plugin-dynamic-import'
import viteEslintPlugin from 'vite-plugin-eslint';
import legacy from '@vitejs/plugin-legacy';
import ViteRestart from 'vite-plugin-restart';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import vue from '@vitejs/plugin-vue'
import stylelint from 'vite-plugin-stylelint';

// https://vitejs.dev/config/
export default ({ command }) => ({
    base: command === 'serve' ? '' : '/dist/',
    build: {
        emptyOutDir: true,
        manifest: true,
        outDir: './web/dist/',
        rollupOptions: {
            input: {
                app: './src/scripts/main.js',
            },
            output : {
                /*
                Optionally, manually separate out a vendor chunk containing
                modules imported by lots of your components
                */
                manualChunks: (id) => {
                    if (id.includes("node_modules")) {
                        if (    id.includes('alpine')
                            ||  id.includes('lazysizes')
                            ||  id.includes('pubsub-js')
                            ||  id.includes('vue')
                        ){
                            return "vendor";
                        }
                    }
                },
            }

        },
    },
    plugins: [
        basicSsl(),
        dynamicImport(),
        legacy({
            targets: ['defaults', 'not IE 11']
        }),
        viteEslintPlugin({
            cache: false,
            fix: true,
        }),
        stylelint({
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
    ],
    server: {
        fs: {
            strict: false
        },
        origin: 'https://localhost:3000', // 0.0.0.0 if using DDEV
        port: 3000,
        strictPort: true,
    }
});