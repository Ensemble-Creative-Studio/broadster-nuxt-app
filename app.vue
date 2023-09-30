<script setup>
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap/dist/gsap'

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

  gsap.ticker.add((time)=>{
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
