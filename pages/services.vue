<script setup>
import gsap from 'gsap'

const query = groq`*[_type == "services"][0]
  {
    title,
    videoUrl,
    placeholderImage,
    sections[]{
      ...,
    },
  }
`

const { data: services } = useSanityQuery(query)

onMounted(() => {
  gsap.to('.l-services', {
    opacity: 1,
    ease: 'power3.out',
    delay: 1,
  })
})

onBeforeUnmount(() => {
  gsap.killTweensOf('.l-services')
})

onBeforeRouteLeave((to, from, next) => {
  gsap.to('.l-services', {
    opacity: 0,
    ease: 'power3.out',
    onComplete: () => {
      next()
    },
  })
})
</script>

<template>
  <div class="l-services">
    <Hero title="Services" :video="services?.videoUrl" scrollToTarget=".l-services__section" />
    <ServicesSection
      v-for="(section, i) in services?.sections"
      class="l-services__section"
      :section="section"
      :key="i"
    />
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.l-services {
  opacity: 0;
  &__section {
    margin-top: 32rem;
    @include mq($until: tablet) {
      margin-top: 6rem;
    }
    &:last-child {
      margin-bottom: 1.2rem;
    }
  }
}
</style>
