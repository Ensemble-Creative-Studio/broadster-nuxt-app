<script setup>
import { gsap } from 'gsap'

const query = groq`*[_type == "policy"][0]`

const { data: policy } = useSanityQuery(query)

let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.to('.l-policy', {
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
  gsap.to('.l-policy', {
    opacity: 0,
    ease: 'power3.out',
    onComplete: () => {
      next()
    },
  })
})
</script>

<template>
  <Title>Broadster — Politique de confidentialité</Title>
  <div class="l-policy">
    <Annex :data="policy" />
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.l-policy {
  opacity: 0;
}
</style>
