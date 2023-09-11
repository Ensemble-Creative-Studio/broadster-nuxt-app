<script setup>
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
console.log(services.value);
</script>

<template>
  <div class="l-services">
    <Hero
      title="Services"
      :video="services.videoUrl"
    />
    <ServicesSection
      v-for="(section, i) in services.sections"
      class="l-services__section"
      :section="section"
      :key="i"
    />
  </div>
</template>

<style lang="scss" scoped>
.l-services {
  &__section {
    margin-top: 28rem;
    &:last-child {
      margin-bottom: 1.2rem;
    }
  }
}
</style>
