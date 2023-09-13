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
        <p class="c-video-player-credits__description" v-html="data?.fullDescription"></p>
        <ul class="c-video-player-credits__details">
          <li class="c-video-player-credits__item" v-if="data?.credits?.diffusion">
            <span class="o-button -has-white-outline">Diffusion</span>
            <p class="c-video-player-credits__text" v-html="data?.credits?.diffusion"></p>
          </li>
          <li class="c-video-player-credits__item" v-if="data?.duration">
            <span class="o-button -has-white-outline">Durée</span>
            <p class="c-video-player-credits__text" v-html="data?.duration"></p>
          </li>
          <li class="c-video-player-credits__item" v-if="data?.genre">
            <span class="o-button -has-white-outline">Genre</span>
            <p class="c-video-player-credits__text" v-html="data?.genre"></p>
          </li>
          <li class="c-video-player-credits__item" v-if="data?.credits?.realisation">
            <span class="o-button -has-white-outline">Réalisation</span>
            <p class="c-video-player-credits__text" v-html="data?.credits?.realisation"></p>
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
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s cubic-bezier(0.215, 0.61, 0.355, 1),
    visibility 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  &.-is-visible {
    opacity: 1;
    visibility: visible;
  }
  @include mq($until: tablet) {
    padding-top: 6rem;
  }
  &__grid {
    @include grid(12, 1.2rem, 1.2rem);
    @include mq($until: tablet) {
      row-gap: 2.4rem;
    }
  }
  &__title,
  &__description,
  &__details {
    grid-column: 1 / span 4;
    @include mq($until: tablet) {
      grid-column: 1 / span 12;
    }
  }
  &__description,
  &__details {
    margin-top: 3.7rem;
    @include mq($until: tablet) {
      margin-top: 0;
    }
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
