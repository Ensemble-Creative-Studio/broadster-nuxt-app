<script setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps({
  blocks: {
    type: Object,
  },
})

const $$base = shallowRef()

onMounted(() => {
  gsap.to($$base.value, {
    opacity: 1,
    duration: 0.5,
    scrollTrigger: {
      trigger: $$base.value,
      // markers: true,
    },
  })
})

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach((trigger) => {
    trigger.kill()
  })
})
</script>

<template>
  <div class="c-infos-section" ref="$$base">
    <div class="c-infos-section__container u-wrapper">
      <div class="c-infos-section__grid">
        <div class="c-infos-section-block -has-big-text -is-mobile">
          <header class="c-infos-section-block__header">
            <h3 class="c-infos-section-block__title o-title">
              {{ blocks?.presentation?.quote }}
            </h3>
            <p class="c-infos-section-block__author" v-html="blocks?.presentation?.author"></p>
          </header>
        </div>
        <div class="c-infos-section-block -has-big-text">
          <header class="c-infos-section-block__header">
            <h3 class="c-infos-section-block__title o-title">
              {{ blocks?.presentation?.quote }}
            </h3>
            <p class="c-infos-section-block__author" v-html="blocks?.presentation?.author"></p>
          </header>
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
  opacity: 0;
  &__grid {
    @include grid(12, 1.2rem, 1.2rem);
    align-items: stretch;
    margin-top: 1.2rem;
  }
  &-block {
    $block: &;
    background-color: $very-dark;
    height: clamp(63.9rem, 36vw, 42vw); // TODO - Check this
    border-radius: 0.4rem;
    overflow: hidden;
    @include mq($until: desktop) {
      height: auto;
    }
    &.-has-small-video {
      grid-column: auto / span 3;
      @include mq($until: desktop) {
        grid-column: auto / span 12;
        order: 2;
      }
      @include mq($until: mobile) {
        aspect-ratio: 4 / 3;
      }
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
      @include mq($until: desktop) {
        grid-column: auto / span 12;
        &:not(&.-is-mobile) {
          order: 3;
        }
      }
      @include mq($until: mobile) {
        font-size: 1.5rem;
        line-height: 144%;
      }
      ::selection {
        background-color: $white;
        color: $black;
      }
      &.-is-mobile {
        @include mq($from: desktop) {
          display: none;
          order: 1;
        }
      }
    }
    &__title {
      max-width: 19ch;
      width: auto;
    }
    &__author {
      margin-top: 2rem;
    }
    &__header {
      #{$block}:not(.-is-mobile) & {
        @include mq($until: desktop) {
          display: none;
        }
      }
    }
    &__footer {
      max-width: 50ch;
      width: auto;
    }
  }
}
</style>
