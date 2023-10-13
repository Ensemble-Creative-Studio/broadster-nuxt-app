<script setup>
const props = defineProps({
  data: {
    type: Object,
  },
  slug: {
    type: String,
    default: '/',
  },
})
</script>

<template>
  <NuxtLink :to="slug" class="c-index-summary-card">
    <h2 class="c-index-summary-card__title o-title">{{ data.title }}</h2>
    <div class="c-index-summary-card__thumbnail">
      <video :src="data.videoUrl" alt="" muted loop autoplay playsinline></video>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.c-index-summary-card {
  padding: 2.4rem;
  background-color: $very-dark;
  color: $white;
  border-radius: 0.4rem;
  @include mq($until: tablet) {
    grid-column: 1 / -1;
    display: flex;
    justify-content: space-between;
    padding: 1.2rem 1.2rem 2.8rem 1.2rem;
    min-height: 10rem;
  }
  &__title {
    transform: translateY(5rem);
    opacity: 0;
    will-change: transform;
  }
  &__thumbnail {
    max-width: 32rem;
    aspect-ratio: 16/10;
    margin: 16.7rem 0 0 auto;
    border-radius: 0.4rem;
    overflow: hidden;
    transform: scale(0);
    transform-origin: bottom right;
    @include mq($until: tablet) {
      max-width: 33.33%;
      margin: 0;
    }
  }
}
</style>
