<script setup>
const props = defineProps({
  layout: {
    type: String,
    default: 'smb',
  },
  title: {
    type: String,
    default: 'Section Title',
  },
  isGrey: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div
    class="c-services-section"
    :class="[
      layout === 'sbm'
        ? '-is-sbm'
        : layout === 'smb'
        ? '-is-smb'
        : layout === 'bsm'
        ? '-is-bsm'
        : '',
      isGrey ? '-is-grey' : '',
    ]"
  >
    <div class="c-services-section__container u-wrapper">
      <h2 class="o-title">{{ $props.title }}</h2>
      <div class="c-services-section__grid">
        <div class="c-services-section-block -has-small-video">
          <video
            class="c-services-section__source"
            src="https://player.vimeo.com/progressive_redirect/playback/847355973/rendition/1080p/file.mp4?loc=external&signature=47ac414eb6ae8d2f123245b4ecc0d7e2d758146fdb1377231d8ab55be0ccfca7"
            autoplay
            muted
            loop
            playsinline
          ></video>
        </div>
        <div class="c-services-section-block -has-medium-text">
          <p>
            Broadster imagine, développe et conçoit des documentaires pour le marché Français et
            International. Le cœur de notre métier est de mettre en lumière des histoires
            inspirantes et des personnages uniques qui sauront attirer un large public.
          </p>
          <footer>
            <h3>Expertises</h3>
            <ul class="c-services-section-block__list">
              <li class="c-services-section-block__tag">Création originale</li>
              <li class="c-services-section-block__tag">Narration</li>
              <li class="c-services-section-block__tag">Production</li>
            </ul>
          </footer>
        </div>
        <div class="c-services-section-block -has-big-video">
          <video
            class="c-services-section__source"
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
.c-services-section {
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
      grid-column: auto / span 2;
    }
    &.-has-medium-text {
      grid-column: auto / span 4;
      background-color: $black;
      color: $white;
      padding: 3.6rem 9.6rem 3.6rem 3.6rem;
      font-size: 2rem;
      line-height: 145%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      ::selection {
        background-color: $white;
        color: $black;
      }
      #{$self}.-is-grey & {
        background-color: $bright-grey;
        color: $black;
        ::selection {
          background-color: $black;
          color: $white;
        }
      }
    }
    &.-has-big-video {
      grid-column: auto / span 6;
    }
    #{$self}.-is-sbm & {
      &.-has-small-video {
        order: 1;
      }
      &.-has-big-video {
        order: 2;
      }
      &.-has-medium-text {
        order: 3;
      }
    }
    #{$self}.-is-smb & {
      &.-has-small-video {
        order: 1;
      }
      &.-has-medium-text {
        order: 2;
      }
      &.-has-big-video {
        order: 3;
      }
    }
    #{$self}.-is-bsm & {
      &.-has-big-video {
        order: 1;
      }
      &.-has-small-video {
        order: 2;
      }
      &.-has-medium-text {
        order: 3;
      }
    }
    &__list {
      margin-top: 1.2rem;
      display: flex;
      align-items: start;
    }
    &__tag {
      border: 0.1rem solid $white;
      padding: 1.2rem;
      font-size: 1.2rem;
      line-height: 150%;
      border-radius: 0.4rem;
      text-transform: uppercase;
      #{$self}.-is-grey & {
        border: 0.1rem solid $black;
      }
      &:not(:last-child) {
        margin-right: 1.2rem;
      }
    }
  }
}
</style>
