<script setup>
const props = defineProps({
  blocks: {
    type: Object,
  },
})
</script>

<template>
  <div class="c-infos-section">
    <div class="c-infos-section__container u-wrapper">
      <div class="c-infos-section__grid">
        <div class="c-infos-section-block -has-big-text">
          <div>
            <h3 class="c-infos-section-block__title o-title">
              {{ blocks?.presentation?.quote }}
            </h3>
            <p class="c-infos-section-block__author" v-html="blocks?.presentation?.author"></p>
          </div>
          <footer class="c-infos-section-block__footer">
            <SanityContent :blocks="blocks?.presentation?.text" />
          </footer>
        </div>
        <div class="c-infos-section-block -has-small-video">
          <video
            class="c-infos-section__source"
            :src="blocks?.video1?.url"
            autoplay
            muted
            loop
            playsinline
          ></video>
        </div>
        <div class="c-infos-section-block -has-small-video">
          <video
            class="c-infos-section__source"
            :src="blocks?.video2?.url"
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
      background-color: $very-dark;
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
    &__title {
      max-width: 19ch;
      width: auto;
    }
    &__author {
      margin-top: 2rem;
    }
    &__footer {
      max-width: 50ch;
      width: auto;
    }
  }
}
</style>
