<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="c-video-player-credits">
    <div class="c-video-player-credits__container u-wrapper">
      <div class="c-video-player-credits__grid">
        <h2 class="c-video-player-credits__title o-thumbnail-title">
          {{ data.title }}
        </h2>
        <p class="c-video-player-credits__description" v-html="data.fullDescription"></p>
        <ul class="c-video-player-credits__details">
          <li class="c-video-player-credits__item">
            <span class="o-button -has-white-outline">Diffusion</span>
            <p class="c-video-player-credits__text" v-html="data.credits.diffusion"></p>
          </li>
          <li class="c-video-player-credits__item">
            <span class="o-button -has-white-outline">Durée</span>
            <p class="c-video-player-credits__text" v-html="data.duration"></p>
          </li>
          <li class="c-video-player-credits__item">
            <span class="o-button -has-white-outline">Genre</span>
            <p class="c-video-player-credits__text" v-html="data.genre"></p>
          </li>
          <li class="c-video-player-credits__item">
            <span class="o-button -has-white-outline">Réalisation</span>
            <p class="c-video-player-credits__text" v-html="data.credits.realisation"></p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.c-video-player-credits {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
  padding-top: 20rem;
  background-color: rgba($black, 0.8);
  color: $white;
  &__grid {
    @include grid(12, 1.2rem, 1.2rem);
  }
  &__title,
  &__description,
  &__details {
    grid-column: 1 / span 4;
  }
  &__description,
  &__details {
    margin-top: 3.7rem;
  }
  &__item {
    display: flex;
    align-items: center;
    &:not(:last-child) {
      margin-bottom: 1.8rem;
    }
  }
  &__text {
    margin-left: 1.8rem;
  }
}
</style>
