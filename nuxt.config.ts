// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  devServer: {
    port: 3009,
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxtjs/sitemap',
  ],

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3009',
  },

  sitemap: {
    sources: ['/api/__sitemap__/urls'],
  },

  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3006',
      whatsappPhone: process.env.NUXT_PUBLIC_WHATSAPP_PHONE || '34666666666',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3009',
    },
  },

  app: {
    head: {
      title: 'Agua Dulce - Joyería Artesanal',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Joyería artesanal única. Pendientes, anillos y colgantes hechos con amor.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Agua Dulce' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  image: {
    quality: 80,
    format: ['webp', 'jpg'],
  },
})
