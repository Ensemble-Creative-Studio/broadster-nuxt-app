// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: false },
  app: {
    head: {
      charset: 'utf-16',
      viewport: 'initial-scale=1',
      title: 'Broadster',
      meta: [
        { name: 'description', content: 'Broadster' },
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
        // {
        //   hid: 'mask-icon',
        //   rel: 'mask-icon',
        //   href: '/favicon/safari-pinned-tab.svg',
        //   color: '#000000',
        // },
        {
          hid: 'apple-touch-icon',
          rel: 'apple-touch-icon',
          href: '/favicon/apple-touch-icon.png',
        },
        {
          hid: 'manifest',
          rel: 'manifest',
          href: '/favicon/manifest.json',
          crossorigin: 'use-credentials',
        },
      ],
    },
  },
  modules: ['@nuxtjs/sanity', '@vueuse/nuxt', 'nuxt-lazy-load'],
  lazyLoad: {
    // These are the default values
    images: true,
    videos: true,
    audios: true,
    iframes: true,
    native: false,
    directiveOnly: false,

    // To remove class set value to false
    loadingClass: '-is-loading',
    loadedClass: '-is-loaded',
    appendClass: '-has-lazy-load',
  },
  sanity: {
    projectId: '47htvf4t',
    dataset: 'production',
    apiVersion: '2023-09-11',
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
