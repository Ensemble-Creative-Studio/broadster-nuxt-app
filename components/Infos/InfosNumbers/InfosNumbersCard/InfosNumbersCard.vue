<script setup>
const props = defineProps({
  data: {
    type: Object,
  },
})
</script>

<template>
  <div class="c-infos-numbers-card">
    <div class="c-infos-numbers-card__thumbnail">
      <video :src="data?.videoUrl" alt="" muted loop autoplay playsinline></video>
    </div>
    <footer>
      <h3 class="o-section-title">{{ data?.number }}</h3>
      <p class="c-infos-numbers-card__text o-title">{{ data?.text }}</p>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.c-infos-numbers-card {
  padding: 2.4rem;
  background-color: $very-dark;
  grid-column: auto / span 4;
  border-radius: 0.4rem;
  color: $white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @include mq($until: tablet) {
    grid-column: auto / span 12;
  }
  &__thumbnail {
    max-width: 26rem;
    aspect-ratio: 16/10;
    margin: 0 0 13.4rem auto;
    border-radius: 0.4rem;
    overflow: hidden;
    @include mq($until: tablet) {
      margin: 0 0 6rem auto;
    }
    @include mq($until: mobile) {
      max-width: 50%;
      margin: 0 0 3.2rem auto;
    }
  }
  &__text {
    min-height: 13rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    @include mq($until: tablet) {
      min-height: auto;
      margin-top: 1rem;
    }
  }
}
</style>
