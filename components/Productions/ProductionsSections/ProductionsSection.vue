<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

const props = defineProps({
  section: {
    type: Object,
  },
})

const hasEnoughFilms = computed(() => {
  return props.section?.films?.length > 2
})
</script>

<template>
  <div class="c-productions-section">
    <div class="c-productions-section__container u-wrapper">
      <Film :film="section.featuredFilm" class="c-productions-section__film -is-featured" />
      <h2 class="c-productions-section__title o-title">{{ section.title }}</h2>
      <div class="c-productions-section__slider">
        <Swiper
          :space-between="12"
          :grab-cursor="true"
          :free-mode="true"
          :slides-per-view="1.1"
          :breakpoints="{
            768: {
              slidesPerView: 2.5,
            },
          }"
        >
          <SwiperSlide
            v-for="(film, i) in section.films"
            class="slider__item"
            :class="{
              '-is-half': !hasEnoughFilms,
            }"
            :key="i"
          >
            <Film :film="film" class="c-productions-section__film" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.c-productions-section {
  &:last-child {
    margin-bottom: 1.2rem;
    @include mq($until: medium) {
      margin-bottom: 21rem;
    }
    @include mq($until: tablet) {
      margin-bottom: 16rem;
    }
  }
  &__title {
    margin-top: 28rem;
    @include mq($until: medium) {
      margin-top: 21rem;
    }
    @include mq($until: tablet) {
      margin-top: 16rem;
    }
  }
  &__slider {
    margin-top: 2.4rem;
    .swiper {
      overflow: visible;
      @include mq($until: tablet) {
        &-slide {
          :deep(.c-film__description) {
            opacity: 0;
            visibility: hidden;
          }
          &-active {
            :deep(.c-film__description) {
              opacity: 1;
              visibility: visible;
            }
          }
        }
      }
      @include mq($from: tablet) {
        &-slide {
          &.-is-half {
            flex: 50% !important;
            &:last-child {
              margin-right: 0 !important;
            }
          }
        }
      }
    }
  }
  &__film {
    aspect-ratio: 6 / 4;
    @include mq($until: medium) {
      aspect-ratio: initial;
    }
    @include mq($until: mobile) {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    &:not(:last-child) {
      margin-right: 1.2rem;
    }
    &.-is-featured {
      max-width: 80%;
      max-height: 80vh;
      margin: 0 auto;
      @include mq($until: tablet) {
        max-width: 100%;
        max-height: initial;
        height: auto;
      }
      margin-top: 21rem;
      @include mq($until: tablet) {
        margin-top: 12rem;
      }
    }
  }
}
</style>
