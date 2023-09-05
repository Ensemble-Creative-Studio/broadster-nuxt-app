<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="c-hero">
    <h1 class="c-hero__title o-section-title">{{ title }}</h1>
    <div class="c-hero-video">
      <video :src="video" class="c-hero-video__source" autoplay muted loop playsinline></video>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.c-hero {
  height: 100svh;
  width: 100%;
  position: relative;
  &__title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -75%);
  }
  &-video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    border-radius: 1.2rem;
    overflow: hidden;
    aspect-ratio: 1 / 1;
    height: 40rem;
    width: auto;
  }
}
</style>
