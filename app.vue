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
    <Transition name="fade" mode="in-out">
      <VideoPlayer v-if="isVideoPlayerOpen" />
    </Transition>
    <Header />
    <NuxtPage />
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s cubic-bezier(0.215, 0.61, 0.355, 1),
    visibility 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  visibility: hidden;
}
</style>
