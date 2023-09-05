// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/sanity', '@vueuse/nuxt'],
  sanity: {
    projectId: 'some-id',
  },
  css: ['@/assets/scss/index.scss', '@/assets/fonts/TheFuture/style.css'],
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
