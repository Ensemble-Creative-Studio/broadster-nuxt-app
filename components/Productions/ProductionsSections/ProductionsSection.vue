<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="c-productions-section">
    <div class="c-productions-section__container u-wrapper">
      <Film :film="section.featuredFilm" class="c-productions-section__film -is-featured" />
      <h2 class="c-productions-section__title o-title">{{ section.title }}</h2>
      <div class="c-productions-section__slider">
        <Swiper :space-between="12" :grab-cursor="true" :free-mode="true" :slides-per-view="2.5">
          <SwiperSlide v-for="(film, i) in section.films" class="slider__item" :key="i">
            <Film :film="film" class="c-productions-section__film" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.c-productions-section {
  margin-top: 29rem;
  &:last-child {
    margin-bottom: 1.2rem;
  }
  &__title {
    margin-top: 29rem;
  }
  &__slider {
    display: flex;
    overflow-x: visible !important;
    margin-top: 2.4rem;
  }
  &__film {
    aspect-ratio: 666 / 435;
    &:not(:last-child) {
      margin-right: 1.2rem;
    }
    &.-is-featured {
      max-width: 80%;
      max-height: 80vh;
      margin: 0 auto;
    }
  }
}
</style>
