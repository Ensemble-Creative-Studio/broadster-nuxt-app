<script setup>
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { ForceWait } from '/utils/ForceWait'

const fw = new ForceWait()

CustomEase.create('title', '0.16, 0.6, 0.38, 0.85')
CustomEase.create('video', '0.17, 0.52, 0.44, 0.86')

let ctx

const props = defineProps({
  history: {
    type: Object,
  },
})

const $$base = shallowRef()
const $$item = shallowRef()

onMounted(async () => {
  await fw.delay(500)
  ctx = gsap.context(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $$base.value,
        // markers: true,
        start: '0% 75%',
      },
    })

    tl.to('.c-infos-numbers-card__thumbnail', {
      duration: 1,
      stagger: 0.3,
      ease: 'video',
      transform: 'scale(1)',
    })
    tl.to(
      '.c-infos-numbers-card__text',
      {
        duration: 0.75,
        stagger: 0.15,
        ease: 'title',
        autoAlpha: 1,
      },
      '-=1'
    )
    tl.to(
      '.c-infos-numbers-card__title',
      {
        duration: 0.75,
        stagger: 0.15,
        ease: 'title',
        transform: 'translateY(0)',
        autoAlpha: 1,
      },
      '-=0.5'
    )
  })
})

onBeforeUnmount(() => {
  ctx.revert()
  fw.kill()
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
}
</style>
