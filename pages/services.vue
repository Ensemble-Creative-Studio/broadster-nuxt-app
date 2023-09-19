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
</script>

<template>
  <div class="l-services">
    <Hero title="Services" :video="services?.videoUrl" scrollToTarget="l-services__section" />
    <ServicesSection
      v-for="(section, i) in services?.sections"
      class="l-services__section"
      :section="section"
      :key="i"
    />
  </div>
</template>

<style lang="scss" scoped>
.l-services {
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
