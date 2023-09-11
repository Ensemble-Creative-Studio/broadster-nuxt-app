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
    <Hero
      title="Infos"
      :video="infos?.videoUrl"
    />
    <InfosSection :blocks="infos?.sections" />
    <InfosNumbers :history="infos?.history" class="l-infos__numbers" />
    <InfosClients :clients="infos?.clients" class="l-infos__clients" />
  </div>
</template>

<style lang="scss" scoped>
.l-infos {
  &__numbers {
    margin-top: 10rem;
  }
  &__clients {
    margin-top: 32rem;
  }
}
</style>
