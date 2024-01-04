<script setup>
import { gsap } from 'gsap'
import { query } from '@/groq/legal'

const { data: legal } = useSanityQuery(query)

let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.to('.l-legal', {
      autoAlpha: 1,
      ease: 'power3.out',
      delay: 1,
    })
  })
})

onUnmounted(() => {
  ctx.revert()
})

onBeforeRouteLeave((to, from, next) => {
  gsap.to('.l-legal', {
    opacity: 0,
    ease: 'power3.out',
    onComplete: () => {
      next()
    },
  })
})
</script>

<template>
  <Title>Broadster — Mentions légales</Title>
  <div class="l-legal">
    <Annex :data="legal" />
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.l-legal {
  opacity: 0;
}
</style>
