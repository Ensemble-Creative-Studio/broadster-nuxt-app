<script setup>
import { gsap } from 'gsap'
import { query } from '@/groq/productions'

const { data: productions } = useSanityQuery(query)

let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.to('.l-productions', {
      autoAlpha: 1,
      ease: 'power3.out',
      delay: 1,
    })
  })
})

onBeforeUnmount(() => {
  ctx.revert()
})

onBeforeRouteLeave((to, from, next) => {
  gsap.to('.l-productions', {
    opacity: 0,
    ease: 'power3.out',
    onComplete: () => {
      next()
    },
  })
})
</script>

<template>
  <Title>Broadster — Productions</Title>
  <div class="l-productions">
    <Hero
      title="Productions"
      :video="productions?.videoUrl"
      :scrollToTarget="'.l-productions__section'"
      :scrollToOffset="-100"
      class="-is-hidden-in-footer"
    />
    <ProductionsSection
      v-for="(section, i) in productions?.sections"
      :section="section"
      :index="i"
      :key="section._key"
      class="l-productions__section -is-hidden-in-footer"
    />
    <Footer class="l-productions__footer" elemsToHide=".-is-hidden-in-footer" />
  </div>
</template>

<style lang="scss" scoped>
.l-productions {
  opacity: 0;
  &__footer {
    @include mq($until: medium) {
      margin-top: 26rem;
    }
  }
}
</style>
