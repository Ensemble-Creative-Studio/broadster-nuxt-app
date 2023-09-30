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
    <Hero
      title="Infos"
      :video="infos?.videoUrl"
      class="-is-hidden-in-footer"
      scrollToTarget=".l-infos__section"
    />
    <InfosSection :blocks="infos?.sections" class="l-infos__section -is-hidden-in-footer" />
    <InfosNumbers :history="infos?.history" class="l-infos__numbers -is-hidden-in-footer" />
    <InfosClients :clients="infos?.clients" class="l-infos__clients -is-hidden-in-footer" />
    <Footer class="l-infos__footer" elemsToHide=".-is-hidden-in-footer" />
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
  &__footer {
    margin-top: 10rem;
    @include mq($until: tablet) {
      margin-top: 26rem;
    }
  }
}
</style>
