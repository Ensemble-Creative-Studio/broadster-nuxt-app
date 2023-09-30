<script setup>
import gsap from 'gsap'

const query = groq`*[_type == "infos"][0]
  {
    title,
    videoUrl,
    placeholderImage,
    // TODO - Rename sections to blocks in Sanity
    sections,
    history[],
    clients[]
  }
`

const { data: infos } = useSanityQuery(query)

onMounted(() => {
  gsap.to('.l-infos', {
    opacity: 1,
    ease: 'power3.out',
    delay: 1,
  })
})

onBeforeUnmount(() => {
  gsap.killTweensOf('.l-infos')
})

onBeforeRouteLeave((to, from, next) => {
  gsap.to('.l-infos', {
    opacity: 0,
    ease: 'power3.out',
    onComplete: () => {
      next()
    },
  })
})
</script>

<template>
  <div class="l-infos">
    <Hero title="Infos" :video="infos?.videoUrl" scrollToTarget=".l-infos__section" />
    <InfosSection :blocks="infos?.sections" class="l-infos__section" />
    <InfosNumbers :history="infos?.history" class="l-infos__numbers" />
    <InfosClients :clients="infos?.clients" class="l-infos__clients" />
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.l-infos {
  opacity: 0;
  &__section {
    margin-top: 26rem;
    @include mq($until: tablet) {
      margin-top: 6rem;
    }
  }
  &__numbers {
    margin-top: 10rem;
    @include mq($until: tablet) {
      margin-top: 6rem;
    }
  }
  &__clients {
    margin-top: 26rem;
    @include mq($until: tablet) {
      margin-top: 12rem;
    }
  }
}
</style>
