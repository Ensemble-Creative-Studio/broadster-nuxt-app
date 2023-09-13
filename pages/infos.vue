<script setup>
const query = groq`*[_type == "infos"][0]
  {
    title,
    videoUrl,
    placeholderImage,
    //TODO: rename sections to blocks in Sanity
    sections,
    history[],
    clients[]
  }
`

const { data: infos } = useSanityQuery(query)
</script>

<template>
  <div class="l-infos">
    <Hero title="Infos" :video="infos?.videoUrl" />
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
