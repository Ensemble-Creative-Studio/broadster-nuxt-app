<script setup>
import { gsap } from 'gsap'

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

let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.to('.l-services', {
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
  <Title>Broadster — Services</Title>
  <div class="l-services">
    <Hero
      title="Services"
      :video="services?.videoUrl"
      scrollToTarget=".l-services__section"
      class="-is-hidden-in-footer"
    />
    <ServicesSection
      v-for="(section, i) in services?.sections"
      class="l-services__section -is-hidden-in-footer"
      :class="i === 0 ? '-is-first' : ''"
      :section="section"
      :key="section._key"
      :index="i"
    />
    <Footer elemsToHide=".-is-hidden-in-footer" />
  </div>
</template>

<style lang="scss" scoped>
.l-services {
  opacity: 0;
  &__section {
    margin-top: 26rem;
    @include mq($until: tablet) {
      margin-top: 6rem;
    }
    &.-is-first {
      margin-top: 0;
      height: 100vh;
      display: flex;
      align-items: flex-end;
    }
  }
}
</style>
