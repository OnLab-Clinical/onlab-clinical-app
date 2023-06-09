// node
import { fileURLToPath, URL } from 'node:url';
// vite
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),

        VitePWA({
            registerType: 'prompt',
            // useCredentials: true,
            devOptions: {
                enabled: true,
                // navigateFallbackAllowlist: [/^index.html$/],
            },

            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
            manifest: {
                name: 'Vite PWA Template',
                short_name: 'Vite PWA',
                description: 'Vite + React + TypeScript + Tailwind PWA Template',
                theme_color: '#ffffff',
                background_color: '#ffffff',
                display: 'standalone',
                icons: [
                    {
                        src: 'android-chrome-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: 'android-chrome-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
            },

            workbox: {
                // globPatterns: ['**/*.{js,css,html,ico,png,svg,ttf,txt,json}'],
                // maximumFileSizeToCacheInBytes: 3 * 1000000,
                // navigateFallbackDenylist: [/^\/backoffice/],
                /* runtimeCaching: [
                    {
                        urlPattern: ({ url }) => url.pathname.startsWith('/api'),
                        handler: 'NetworkFirst',
                        method: 'GET',
                        options: {
                            cacheName: 'api-cache',
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                        },
                    },
                ], */
            },
        }),
    ],

    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});
