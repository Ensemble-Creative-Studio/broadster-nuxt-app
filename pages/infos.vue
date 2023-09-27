<script setup>
import anime from 'animejs/lib/anime.es.js'

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

onBeforeRouteLeave((to, from, next) => {
  anime({
    targets: '.l-infos',
    opacity: 0,
    easing: 'spring(1, 80, 20, 3)',
    complete: () => {
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
  </div>
</template>

<style lang="scss" scoped>
.l-infos {
  &__section {
    margin-top: 32rem;
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
    margin-top: 32rem;
    @include mq($until: tablet) {
      margin-top: 12rem;
    }
  }
}
</style>
