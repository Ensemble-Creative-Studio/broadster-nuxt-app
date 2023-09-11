<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="c-infos-numbers-card">
    <div class="c-infos-numbers-card__thumbnail">
      <video
        :src="data.videoUrl"
        alt=""
        muted
        loop
        autoplay
        playsinline
      ></video>
    </div>
    <footer>
      <h3 class="o-section-title">{{ data.number }}</h3>
      <p class="c-infos-numbers-card__text o-title">{{ data.text }}</p>
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
  &__text {
    min-height: 13rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
}
</style>
