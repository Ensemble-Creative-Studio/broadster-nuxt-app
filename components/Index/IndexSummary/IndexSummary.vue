<script setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const slugs = ['productions', 'services', 'infos']

const props = defineProps({
  links: {
    type: Array,
  },
})

const $$base = shallowRef()
let timeout

onMounted(() => {
  timeout = setTimeout(() => {
    gsap.to('.c-index-summary__card', {
      stagger: 0.3,
      opacity: 1,
      duration: 0.5,
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
  <div class="c-index-summary">
    <div class="c-index-summary__grid u-wrapper" ref="$$base">
      <IndexSummaryCard
        v-for="(link, i) in links"
        :data="link"
        :slug="slugs[i]"
        class="c-index-summary__card"
        :key="i"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.c-index-summary {
  padding-top: 36rem;
  margin-bottom: 1.2rem;
  &__grid {
    @include grid(12, 1.2rem, 1.2rem);
    align-items: stretch;
  }
  &__card {
    grid-column: auto / span 4;
    opacity: 0;
    @include mq($until: tablet) {
      grid-column: auto / span 12;
    }
  }
}
</style>
