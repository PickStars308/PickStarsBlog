import {defineConfig, loadEnv} from "vite";
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import viteCompression from 'vite-plugin-compression'
import {visualizer} from 'rollup-plugin-visualizer'
import {VitePWA} from "vite-plugin-pwa";

export default ({mode}: { mode: string }) =>
    defineConfig({

        plugins: [
            vue(),
            Components({}),
            AutoImport({
                imports: ['vue', 'vue-router'],
                dts: true,
            }),
            viteCompression({
                threshold: 1024000
            }),
            visualizer({
                gzipSize: true,
                brotliSize: true,
                emitFile: false,
                filename: "Visualizer.html",
                open: true
            }),

            VitePWA({
                registerType: "autoUpdate",
                devOptions: {
                    enabled: true
                },
                workbox: {
                    skipWaiting: true,
                    clientsClaim: true,
                    runtimeCaching: [
                        {
                            urlPattern: /\.(js|css|woff2|woff|ttf)$/,
                            handler: "CacheFirst",
                            options: {
                                cacheName: "js-css-cache",
                            },
                        },
                        {
                            urlPattern: /\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)$/,
                            handler: "CacheFirst",
                            options: {
                                cacheName: "image-cache",
                            },
                        },
                    ],
                },
                manifest: {
                    name: loadEnv(mode, process.cwd()).VITE_SITE_TITLE,
                    short_name: loadEnv(mode, process.cwd()).VITE_SITE_TITLE,
                    description: loadEnv(mode, process.cwd()).VITE_SITE_DES,
                    display: "standalone",
                    start_url: "/",
                    theme_color: "#424242",
                    background_color: "#424242",
                    icons: [
                        {src: "/assets/images/icon/48.png", sizes: "48x48", type: "image/png"},
                        {src: "/assets/images/icon/72.png", sizes: "72x72", type: "image/png"},
                        {src: "/assets/images/icon/96.png", sizes: "96x96", type: "image/png"},
                        {src: "/assets/images/icon/128.png", sizes: "128x128", type: "image/png"},
                        {src: "/assets/images/icon/144.png", sizes: "144x144", type: "image/png"},
                        {src: "/assets/images/icon/192.png", sizes: "192x192", type: "image/png"},
                        {src: "/assets/images/icon/512.png", sizes: "512x512", type: "image/png"},
                    ],
                },
            })
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        }
    })
