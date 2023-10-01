<script setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps({
  history: {
    type: Object,
  },
})

const $$base = shallowRef()
const $$item = shallowRef()

let timeout
let tl

onMounted(() => {
  timeout = setTimeout(() => {
    gsap.to('.c-infos-numbers__card', {
      stagger: 0.3,
      opacity: 1,
      duration: 1,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: $$base.value,
        // markers: true,
        start: 'top 75%',
      },
    })
  }, 500)
})

onBeforeUnmount(() => {
  clearTimeout(timeout)

  ScrollTrigger.getAll().forEach((trigger) => {
    trigger.kill()
  })
})
</script>

<template>
  <div class="c-infos-numbers">
    <div class="c-infos-numbers__container u-wrapper">
      <h2 class="o-title">Broadster depuis sa création</h2>
      <div class="c-infos-numbers__grid" ref="$$base">
        <InfosNumbersCard
          class="c-infos-numbers__card"
          ref="$$item"
          v-for="(item, i) in history"
          :data="item"
          :key="i"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.c-infos-numbers {
  &__grid {
    margin-top: 1.2rem;
    @include grid(12, 1.2rem, 1.2rem);
    align-items: stretch;
  }
  &__card {
    opacity: 0;
  }
}
</style>
