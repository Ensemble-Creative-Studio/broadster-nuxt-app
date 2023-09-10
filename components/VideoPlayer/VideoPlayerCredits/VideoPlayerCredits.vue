<script setup></script>

<template>
  <div class="c-video-player-credits">
    <div class="c-video-player-credits__container u-wrapper">
      <div class="c-video-player-credits__grid">
        <h2 class="c-video-player-credits__title o-thumbnail-title">
          Drôles de Belges, font-ils mieux l'humour que les autres ?
        </h2>
        <p class="c-video-player-credits__description">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis veniam temporibus omnis
          a minus reprehenderit explicabo enim nulla delectus quod.
        </p>
        <ul class="c-video-player-credits__details">
          <li class="c-video-player-credits__item">
            <span class="o-button -has-white-outline">Test</span>
            <p class="c-video-player-credits__text">France / Belgique et Suisse</p>
          </li>
          <li class="c-video-player-credits__item">
            <span class="o-button -has-white-outline">Test</span>
            <p class="c-video-player-credits__text">France / Belgique et Suisse</p>
          </li>
          <li class="c-video-player-credits__item">
            <span class="o-button -has-white-outline">Test</span>
            <p class="c-video-player-credits__text">France / Belgique et Suisse</p>
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
