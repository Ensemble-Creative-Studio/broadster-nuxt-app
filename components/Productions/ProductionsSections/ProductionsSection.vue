<script setup>
import { gsap } from 'gsap'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

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
        start: '0% 50%',
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
