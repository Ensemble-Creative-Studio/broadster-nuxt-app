<template>
  <div class="l-infos">
    <Hero
      title="Infos"
      video="https://player.vimeo.com/progressive_redirect/playback/847356020/rendition/1080p/file.mp4?loc=external&signature=f4a64de90b8b76b1fc7c07b9518235626e948b27bbe8e8e869db69e3056cbb1a"
    />
    <InfosSection />
    <InfosNumbers class="l-infos__numbers" />
    <InfosClients class="l-infos__clients" />
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
