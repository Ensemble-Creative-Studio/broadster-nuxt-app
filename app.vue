<script setup>
import { ref } from 'vue'
import Lenis from '@studio-freight/lenis'

const isVideoPlayerOpen = useState('isVideoPlayerOpen')
const route = useRoute()

let lenisRef = shallowRef() // Use a ref to store lenis

const initLenis = () => {
  const lenis = new Lenis()

  const raf = (time) => {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  lenisRef.value = lenis // Assign lenis to the ref
}

provide('lenisCtx', lenisRef) // Provide the ref

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
