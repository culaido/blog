import { navbarData, seoData } from './data'

export default defineNuxtConfig({
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width,initial-scale=1',
            title: navbarData.homeTitle,
            titleTemplate: `%s - ${navbarData.homeTitle}`,
        },
        pageTransition: { name: 'page', mode: 'out-in' },
        layoutTransition: { name: 'layout', mode: 'out-in' }
    },
    
    site: {
        url: 'https://abc.com',
        identity: {
            type: 'Person',
        },
    },
  
    colorMode: {
        classSuffix: '',
        preference: 'dark',
        fallback: 'light',
    },
    
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    modules: [
        '@nuxt/icon',
        '@nuxt/content',
        '@vueuse/nuxt',
        '@nuxtjs/color-mode',
        '@nuxtjs/tailwindcss',
        '@stefanobartoletti/nuxt-social-share',
        'nuxt-og-image',
        '@nuxt/image',
        '@nuxtjs/robots'
    ],
    content: {
        highlight: {
            theme: 'dracula',
        },
    },
})
