import basicSsl from '@vitejs/plugin-basic-ssl';
import dynamicImport from 'vite-plugin-dynamic-import'
import legacy from '@vitejs/plugin-legacy';
import ViteRestart from 'vite-plugin-restart';
import vue from '@vitejs/plugin-vue'

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
            }
        },
    },
    plugins: [
        basicSsl(),
        dynamicImport(),
        legacy({
            targets: ['defaults', 'not IE 11']
        }),
        ViteRestart({
            reload: [
                './templates/**/*',
            ],
        }),
        vue(),
    ],
    server: {
        fs: {
            strict: false
        },
        origin: 'https://localhost:3000',
        port: 3000,
        strictPort: true,
    }
});