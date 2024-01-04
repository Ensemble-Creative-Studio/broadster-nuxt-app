// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/sanity', '@vueuse/nuxt', 'nuxt-lazy-load', '@nuxtjs/i18n'],
  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English'
      },
      {
        code: 'fr',
        name: 'Français'
      }
    ],
    defaultLocale: 'fr',
    strategy: 'prefix',
  },
  lazyLoad: {
    images: true,
    videos: true,
    audios: true,
    iframes: true,
    native: false,
    directiveOnly: false,
    loadingClass: '-is-loading',
    loadedClass: '-is-loaded',
    appendClass: '-has-lazy-load',
  },
  sanity: {
    projectId: '47htvf4t',
    dataset: 'production',
    apiVersion: '2023-09-11',
  },
  nitro: {
    prerender: {
      routes: ['/404.html'],
    },
  },
  app: {
    head: {
      charset: 'utf-16',
      viewport: 'initial-scale=1',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Broadster imagine et produit des contenus audiovisuels pour raconter des histoires originales.',
        },
        { hid: 'og:site_name', property: 'og:site_name', content: 'Broadster' },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:title', property: 'og:title', content: 'Broadster' },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'Broadster imagine et produit des contenus audiovisuels pour raconter des histoires originales.',
        },
        { name: 'color-scheme', content: 'black' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicons/favicon.ico' },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/favicons/apple-touch-icon.png',
        },
        { rel: 'icon', sizes: '150x150', href: '/favicon/favicon-150x150.png' },
        { rel: 'icon', sizes: '144x144', href: '/favicon/favicon-144x144.png' },
        { rel: 'icon', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
        { rel: 'icon', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
        { hid: 'icon', rel: 'icon', href: '/favicon/favicon.svg' },
        {
          hid: 'mask-icon',
          rel: 'mask-icon',
          href: '/favicon/safari-pinned-tab.svg',
          color: '#000000',
        },
        {
          hid: 'apple-touch-icon',
          rel: 'apple-touch-icon',
          href: '/favicon/apple-touch-icon.png',
        },
      ],
    },
  },
  css: ['@/assets/scss/index.scss', '@/assets/fonts/the-future/style.css'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import '@/assets/scss/tools/mq';\n
            @import '@/assets/scss/tools/variables';\n
            @import '@/assets/scss/tools/mixins';\n
          `,
        },
      },
    },
  },
  components: {
    dirs: [{ path: '~/components', pathPrefix: false }],
  },
})
