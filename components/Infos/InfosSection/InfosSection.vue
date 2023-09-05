<template>
  <div class="c-infos-section">
    <div class="c-infos-section__container u-wrapper">
      <div class="c-infos-section__grid">
        <div class="c-infos-section-block -has-big-text">
          <h3 class="o-title">
            “Cultiver notre curiosité pour la partager au plus grand nombre et amplifier vos
            histoires“
          </h3>
          <footer>
            <p>
              Fondé en 2016 et dirigé par Aurélien Combelles, Broadster est un groupe indépendant
              d’audiovisuel spécialisé dans la production et la conception de documentaires pour le
              marché Français et International. Broadster intègre tous les métiers de la conception
              et production et collabore avec les talents qui partagent la même ambition « Cultiver
              notre curiosité pour la partager au plus grand nombre ».
            </p>
          </footer>
        </div>
        <div class="c-infos-section-block -has-small-video">
          <video
            class="c-infos-section__source"
            src="https://player.vimeo.com/progressive_redirect/playback/847355973/rendition/1080p/file.mp4?loc=external&signature=47ac414eb6ae8d2f123245b4ecc0d7e2d758146fdb1377231d8ab55be0ccfca7"
            autoplay
            muted
            loop
            playsinline
          ></video>
        </div>
        <div class="c-infos-section-block -has-small-video">
          <video
            class="c-infos-section__source"
            src="https://player.vimeo.com/progressive_redirect/playback/847356020/rendition/1080p/file.mp4?loc=external&signature=f4a64de90b8b76b1fc7c07b9518235626e948b27bbe8e8e869db69e3056cbb1a"
            autoplay
            muted
            loop
            playsinline
          ></video>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.c-infos-section {
  $self: &;
  &__grid {
    @include grid(12, 1.2rem, 0);
    align-items: stretch;
    margin-top: 1.2rem;
  }
  &-block {
    background-color: $bright-grey;
    height: 63.9rem;
    border-radius: 0.8rem;
    overflow: hidden;
    &.-has-small-video {
      grid-column: auto / span 3;
    }
    &.-has-big-text {
      grid-column: auto / span 6;
      background-color: $black;
      color: $white;
      padding: 2.4rem;
      font-size: 2rem;
      line-height: 145%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      ::selection {
        background-color: $white;
        color: $black;
      }
    }
  }
}
</style>
