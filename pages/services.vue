<script setup>
const sections = [
  {
    title: 'Documentaires',
    video: '/videos/hero-documentaires.mp4',
    layout: 'sbm',
    isGrey: false,
  },
  {
    title: 'Corporate content',
    video: '/videos/hero-corporate.mp4',
    layout: 'smb',
    isGrey: false,
  },
  {
    title: 'Production de services',
    video: '/videos/hero-production.mp4',
    layout: 'bsm',
    isGrey: true,
  },
]
</script>

<template>
  <div class="l-services">
    <Hero
      title="Services"
      video="https://player.vimeo.com/progressive_redirect/playback/847356020/rendition/1080p/file.mp4?loc=external&signature=f4a64de90b8b76b1fc7c07b9518235626e948b27bbe8e8e869db69e3056cbb1a"
    />
    <ServicesSection
      v-for="(section, i) in sections"
      class="l-services__section"
      :title="section.title"
      :layout="section.layout"
      :isGrey="section.isGrey"
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
