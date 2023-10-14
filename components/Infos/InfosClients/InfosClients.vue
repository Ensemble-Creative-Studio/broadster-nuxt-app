<script setup>
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { ForceWait } from '/utils/ForceWait'

const fw = new ForceWait()

CustomEase.create('title', '0.16, 0.6, 0.38, 0.85')

let ctx

const props = defineProps({
  clients: {
    type: Array,
  },
})

const $$base = shallowRef()

onMounted(async () => {
  await fw.delay(500)
  ctx = gsap.context(() => {
    gsap.to('.c-infos-clients-item__title', {
      stagger: 0.075,
      autoAlpha: 1,
      transform: 'translateY(0)',
      duration: 1,
      ease: 'title',
      scrollTrigger: {
        trigger: $$base.value,
        // markers: true,
        start: '5% 50%',
      },
    })
  })
})

onBeforeUnmount(() => {
  ctx.revert()
  fw.kill()
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
