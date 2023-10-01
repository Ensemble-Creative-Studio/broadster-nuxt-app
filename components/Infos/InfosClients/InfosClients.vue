<script setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps({
  clients: {
    type: Array,
  },
})

const $$base = shallowRef()
let timeout

onMounted(() => {
  timeout = setTimeout(() => {
    gsap.to('.c-infos-clients__item', {
      stagger: 0.1,
      opacity: 1,
      y: 0,
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
  <div class="c-infos-clients">
    <div class="c-infos-clients__container u-wrapper">
      <h2 class="o-title">Clients</h2>
      <div class="c-infos-clients__grid" ref="$$base">
        <InfosClientsItem
          v-for="(client, i) in clients"
          :client="client"
          class="c-infos-clients__item"
          :key="i"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.c-infos-clients {
  width: 100%;
  &__grid {
    @include grid(12, 1.2rem, 1.2rem);
    align-items: stretch;
    margin-top: 1.2rem;
  }
  &__item {
    grid-column: auto / span 3;
    opacity: 0;
    transform: translateY(5rem);
    @include mq($until: small) {
      grid-column: auto / span 4;
    }
    @include mq($until: tablet) {
      grid-column: auto / span 6;
    }
    @include mq($until: mini) {
      grid-column: 1 / -1;
    }
  }
}
</style>
