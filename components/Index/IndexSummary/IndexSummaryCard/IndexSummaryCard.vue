<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Index Summary Title',
  },
  slug: {
    type: String,
    default: '/',
  },
})
</script>

<template>
  <NuxtLink :to="slug" class="c-index-summary-card">
    <h2 class="o-title">{{ $props.title }}</h2>
    <div class="c-index-summary-card__thumbnail">
      <video
        src="https://player.vimeo.com/progressive_redirect/playback/847356020/rendition/1080p/file.mp4?loc=external&signature=f4a64de90b8b76b1fc7c07b9518235626e948b27bbe8e8e869db69e3056cbb1a"
        alt=""
        muted
        loop
        autoplay
        playsinline
      />
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.c-index-summary-card {
  padding: 2.4rem;
  background-color: $black;
  color: $white;
  border-radius: 0.4rem;
  @include mq($until: tablet) {
    grid-column: 1 / -1;
    display: flex;
    justify-content: space-between;
    padding: 1.2rem;
    min-height: 10rem;
  }
  &__thumbnail {
    max-width: 32rem;
    aspect-ratio: 16/10;
    margin: 16.7rem 0 0 auto;
    border-radius: 0.4rem;
    overflow: hidden;
    @include mq($until: tablet) {
      max-width: 33.33%;
      margin: 0;
    }
  }
}
</style>
