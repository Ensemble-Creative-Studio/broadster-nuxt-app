<script setup>
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const route = useRoute()
const isVideoPlayerOpen = useState('isVideoPlayerOpen')

let lenisRef = shallowRef(null)

const initLenis = () => {
  const lenis = new Lenis()

  const raf = (time) => {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)
  lenisRef.value = lenis
}

provide('lenisCtx', lenisRef)

onBeforeMount(() => {
  initLenis()
})

watch(
  () => route.fullPath,
  (value) => {
    if (lenisRef.value) {
      lenisRef.value.scrollTo(0, {
        immediate: true,
      })
    }
  }
)

useSeoMeta({
  description:
    'Broadster imagine et produit des contenus audiovisuels pour raconter des histoires originales.',
  ogDescription:
    'Broadster imagine et produit des contenus audiovisuels pour raconter des histoires originales.',
  // ogImage: 'https://example.com/image.png',
  // twitterCard: 'summary_large_image',
})

useHead({
  link: [
    { rel: 'icon', sizes: '150x150', href: '/favicon/favicon-150x150.png' },
    { rel: 'icon', sizes: '144x144', href: '/favicon/favicon-144x144.png' },
    { rel: 'icon', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
    { rel: 'icon', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#000000' },
    { hid: 'icon', rel: 'icon', href: '/favicon/favicon.svg' },
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
})
</script>

<template>
  <div class="l-app">
    <Transition name="fade" mode="in-out">
      <VideoPlayer v-if="isVideoPlayerOpen" />
    </Transition>
    <Header />
    <NuxtPage />
  </div>
</template>

<style lang="scss">
.l-app {
  overflow-x: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s cubic-bezier(0.215, 0.61, 0.355, 1),
    visibility 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  visibility: hidden;
}
</style>
