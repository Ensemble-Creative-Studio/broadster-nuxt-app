<script setup>
const props = defineProps({
  number: {
    required: true,
  },
  baseline: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="c-infos-numbers-card">
    <div class="c-infos-numbers-card__thumbnail">
      <video
        src="https://player.vimeo.com/progressive_redirect/playback/847356020/rendition/1080p/file.mp4?loc=external&signature=f4a64de90b8b76b1fc7c07b9518235626e948b27bbe8e8e869db69e3056cbb1a"
        alt=""
        muted
        loop
        autoplay
        playsinline
      ></video>
    </div>
    <footer>
      <h3 class="o-section-title">{{ number }}</h3>
      <p class="c-infos-numbers-card__baseline o-title">{{ baseline }}</p>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.c-infos-numbers-card {
  padding: 2.4rem;
  background-color: $black;
  grid-column: auto / span 4;
  border-radius: 0.4rem;
  color: $white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &__thumbnail {
    max-width: 26rem;
    aspect-ratio: 16/10;
    margin: 0 0 13.4rem auto;
    border-radius: 0.4rem;
    overflow: hidden;
    @include mq($until: tablet) {
      max-width: 33.33%;
      margin: 0;
    }
  }
  &__baseline {
    min-height: 13rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
}
</style>
