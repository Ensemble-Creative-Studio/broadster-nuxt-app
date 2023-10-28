<script setup>
import { gsap } from 'gsap'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css'

const modules = [Navigation]

let ctx
let mm = gsap.matchMedia(),
  breakpoint = 992

const props = defineProps({
  section: {
    type: Object,
  },
  index: {
    type: Number,
  },
})

const hasEnoughFilms = computed(() => {
  return props.section?.films?.length > 2
})

const $$featuredFilm = shallowRef()
const $$film = shallowRef()

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.to(`.-has-index-${props.index} .c-productions-section__film:not(.-is-featured)`, {
      stagger: 0.2,
      autoAlpha: 1,
      duration: 1,
      ease: 'ease.inOut',
      scrollTrigger: {
        trigger: `.-has-index-${props.index} .c-productions-section__slider`,
        start: '0% 75%',
        // markers: true
      },
    })

    mm.add(
      {
        isDesktop: `(min-width: ${breakpoint}px)`,
        isMobile: `(max-width: ${breakpoint - 1}px)`,
      },
      (context) => {
        let { isDesktop, isMobile } = context.conditions

        gsap.to(
          `.-has-index-${props.index} .c-productions-section__film.-is-featured .c-film__meta`,
          {
            duration: 1,
            autoAlpha: 1,
            ease: 'expo.out',
            delay: isDesktop ? 0.5 : 0.25,
            scrollTrigger: {
              trigger: `.-has-index-${props.index}`,
              // markers: true,
              start: isDesktop ? '20% 50%' : '0% 30%',
            },
          }
        )

        gsap.to(
          `.-has-index-${props.index} .c-productions-section__film.-is-featured .c-film__media`,
          {
            scale: 1,
            duration: 1.5,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: `.-has-index-${props.index}`,
              // markers: true,
              start: isDesktop ? '20% 50%' : '0% 30%',
            },
          }
        )
      }
    )
  })
})

onBeforeUnmount(() => {
  ctx.revert()
})
</script>

<template>
  <div class="c-productions-section" :class="'-has-index-' + index">
    <div class="c-productions-section__container u-wrapper">
      <Film
        :film="section.featuredFilm"
        class="c-productions-section__film -is-featured"
        ref="$$featuredFilm"
      />
      <header class="c-productions-section__header">
        <h2 class="c-productions-section__title o-title">{{ section.title }}</h2>
        <div class="c-productions-section-navigation">
          <button class="c-productions-section-navigation-button -is-prev">
            <svg class="c-productions-section-navigation-button__icon" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 9.375L0.625 5M0.625 5L5 0.625M0.625 5L9.375 5" stroke="black" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="c-productions-section-navigation-button -is-next">
            <svg class="c-productions-section-navigation-button__icon" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 9.375L0.625 5M0.625 5L5 0.625M0.625 5L9.375 5" stroke="black" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
      </div>
      </header>
      <div class="c-productions-section__slider">
        <Swiper
          :modules="[...modules]"
          :space-between="12"
          :grab-cursor="true"
          :free-mode="true"
          :slides-per-view="1.1"
          :navigation="{
            nextEl: '.c-productions-section-navigation-button.-is-next',
            prevEl: '.c-productions-section-navigation-button.-is-prev',
          }"
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
            <Film :film="film" class="c-productions-section__film" ref="$$film" />
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
  &__header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-top: 28rem;
    @include mq($until: medium) {
      margin-top: 21rem;
    }
    @include mq($until: tablet) {
      margin-top: 16rem;
    }
    @include mq($until: mobile) {
      flex-direction: column;
      align-items: flex-start;
    }
  }
  &-navigation {
    display: flex;
    align-items: center;
    @include mq($until: mobile) {
      margin-top: 1.2rem;
    }
    &-button {
      $button: &;
      position: relative;
      aspect-ratio: 1 / 1;
      width: 3rem;
      height: 3rem;
      border: .1rem solid $black;
      border-radius: .4rem;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: opacity 1s ease;
      &:not(:last-child) {
        margin-right: 1.2rem;
      }
      &.swiper-button-disabled {
        opacity: .3;
        pointer-events: none;
      }
      &__icon {
        transform: translate(-50%, -50%);
        position: absolute;
        top: 50%;
        left: 50%;
        width: 1rem;
        height: 1rem;
        #{$button}.-is-next & {
          transform: translate(-50%, -50%) rotate(180deg);
        }
      }
    }
  }
  &__slider {
    margin-top: 2.4rem;
    .swiper {
      overflow: visible;
      @include mq($until: tablet) {
        &-slide {
          height: auto;
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
    &:not(.-is-featured) {
      opacity: 0;
    }
    &:not(:last-child) {
      margin-right: 1.2rem;
    }
    &.-is-featured {
      max-width: 60%;
      margin: 0 auto;
      @include mq($until: medium) {
        max-width: 70%;
      }
      @include mq($until: small) {
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
