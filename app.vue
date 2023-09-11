<script setup>
import Lenis from '@studio-freight/lenis'
const route = useRoute()
const isVideoPlayerOpen = useState('isVideoPlayerOpen')

let lenis
let raf

const initLenis = () => {
  lenis = new Lenis()

  raf = (time) => {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
}

onMounted(() => {
  initLenis()
})

watch(
  () => route.fullPath,
  () => {
    lenis.scrollTo(0, {
      immediate: true,
    })
  }
)

onBeforeUnmount(() => {
  lenis.destroy()
  cancelAnimationFrame(raf)
})
</script>

<template>
  <div class="l-app">
    <!-- <h2 class="o-title">Website under construction</h2> -->
    <VideoPlayer v-if="isVideoPlayerOpen" />
    <Header />
    <NuxtPage />
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
// .l-app {
//   padding: 2rem;
// }
</style>
