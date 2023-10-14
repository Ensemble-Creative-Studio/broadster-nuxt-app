<script setup>
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'

CustomEase.create('title', '0.16, 0.6, 0.38, 0.85')

const props = defineProps({
  section: {
    type: Object,
  },
  index: {
    type: Number,
  },
})

let ctx

const $$item = shallowRef()

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.to(`.-has-index-${props.index} .c-services-section-block__content`, {
      autoAlpha: 1,
      duration: 0.75,
      ease: 'title',
      transform: 'translateY(0)',
      scrollTrigger: {
        trigger: `.-has-index-${props.index}`,
        start: '0% 50%',
        // markers: true,
      },
    })
  })
})

onBeforeUnmount(() => {
  ctx.revert()
})
</script>

<template>
  <div class="c-services-section" :class="'-has-index-' + index + ' -is-' + section.layout">
    <div class="c-services-section__container u-wrapper">
      <h2 class="o-title">{{ section.title }}</h2>
      <div class="c-services-section__grid">
        <div class="c-services-section-block -has-small-video" ref="$$item">
          <video :src="section?.video1?.url" autoplay muted loop playsinline></video>
        </div>
        <div class="c-services-section-block -has-medium-text" ref="$$item">
          <div class="c-services-section-block__content">
            <SanityContent :blocks="section.presentation.text" />
          </div>
          <footer class="c-services-section-block__footer">
            <h3>{{ section.presentation.label }}</h3>
            <ul class="c-services-section-block__list">
              <li
                v-for="item in section.presentation.expertises"
                class="c-services-section-block__tag o-button -has-white-outline"
              >
                {{ item }}
              </li>
            </ul>
          </footer>
        </div>
        <div class="c-services-section-block -has-big-video" ref="$$item">
          <video :src="section?.video2?.url" autoplay muted loop playsinline></video>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.c-services-section {
  $self: &;
  &__grid {
    @include grid(12, 1.2rem, 1.2rem);
    align-items: stretch;
    margin-top: 1.2rem;
  }
  &-block {
    background-color: $very-dark;
    height: clamp(63.9rem, 36vw, 42vw); // TODO - Check this
    border-radius: 0.4rem;
    overflow: hidden;
    @include mq($until: desktop) {
      height: auto;
    }
    &.-has-small-video {
      grid-column: auto / span 2;
      @include mq($until: desktop) {
        grid-column: auto / span 3;
      }
    }
    &.-has-medium-text {
      grid-column: auto / span 4;
      background-color: $very-dark;
      color: $white;
      padding: 3.6rem 9.6rem 3.6rem 3.6rem;
      font-size: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      @include mq($until: wide) {
        padding: 3.6rem;
      }
      @include mq($until: desktop) {
        grid-column: auto / span 12;
      }
      @include mq($until: tablet) {
        font-size: 1.7rem;
        padding: 2.4rem;
      }
      ::selection {
        background-color: $white;
        color: $black;
      }
      #{$self}.-is-grey & {
        background-color: $bright-grey;
        color: $black;
        ::selection {
          background-color: $very-dark;
          color: $white;
        }
      }
    }
    &.-has-big-video {
      grid-column: auto / span 6;
      @include mq($until: desktop) {
        grid-column: auto / span 9;
        height: 35vw;
      }
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
        @include mq($until: desktop) {
          order: 3;
        }
      }
      &.-has-big-video {
        order: 3;
        @include mq($until: desktop) {
          order: 2;
        }
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
    &__content {
      opacity: 0;
      transform: translateY(10rem);
    }
    &__footer {
      @include mq($until: desktop) {
        margin-top: 7rem;
      }
    }
    &__list {
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
    }
    &__tag {
      margin-top: 1.2rem;
      #{$self}.-is-grey & {
        border: 0.1rem solid $black;
        color: $black;
      }
      &:not(:last-child) {
        margin-right: 1.2rem;
      }
    }
  }
}
</style>
