<script setup>
import Lenis from '@studio-freight/lenis'
const route = useRoute()

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
</script>

<template>
  <div>
    <!-- <Header />
    <NuxtPage />
    <Footer /> -->
  </div>
</template>
