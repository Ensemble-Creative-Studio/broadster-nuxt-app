<script setup>
import gsap from 'gsap'

const query = groq`*[_type == "legal"][0]`

const { data: legal } = useSanityQuery(query)

onMounted(() => {
  gsap.to('.l-legal', {
    opacity: 1,
    ease: 'power3.out',
    delay: 1,
  })
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
