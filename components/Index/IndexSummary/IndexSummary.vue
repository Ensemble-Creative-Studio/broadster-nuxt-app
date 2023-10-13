<script setup>
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { ForceWait } from '/utils/ForceWait'

CustomEase.create('title', '0.16, 0.6, 0.38, 0.85')
CustomEase.create('video', '0.17, 0.52, 0.44, 0.86')

const fw = new ForceWait()
const slugs = ['productions', 'services', 'infos']
let ctx

const props = defineProps({
  links: {
    type: Array,
  },
})

const $$trigger = shallowRef()

onMounted(async () => {
  await fw.delay(500)
  ctx = gsap.context(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $$trigger.value,
        // markers: true,
        start: 'bottom 100%',
      },
    })
    tl.to('.c-index-summary-card__title', {
      duration: 0.75,
      ease: 'title',
      stagger: 0.15,
      y: 0,
      autoAlpha: 1,
      onStart: () => {
        console.log('go')
      },
    })
    tl.to(
      '.c-index-summary-card__thumbnail',
      { duration: 0.95, ease: 'video', stagger: 0.15, scale: 1 },
      '-=0.85'
    )
  })
})

onBeforeUnmount(() => {
  ctx.revert()
  fw.kill()
})
</script>

<template>
  <div class="c-index-summary">
    <div class="c-index-summary__grid u-wrapper" ref="$$trigger">
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
    @include mq($until: tablet) {
      grid-column: auto / span 12;
    }
  }
}
</style>
