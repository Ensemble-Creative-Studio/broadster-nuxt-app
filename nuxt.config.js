// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/sanity', '@vueuse/nuxt', 'nuxt-lazy-load'],
  sanity: {
    projectId: '47htvf4t',
    dataset: 'production',
    apiVersion: '2023-09-11',
  },
  css: ['@/assets/scss/index.scss'],
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
