<script setup>
import { gsap } from 'gsap'

const route = useRoute()
let ctx

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  video: {
    type: String,
  },
  scrollToTarget: {
    type: String,
  },
  scrollToOffset: {
    type: Number,
    default: 12,
  },
})

const lenis = inject('lenisCtx')

onMounted(() => {
  ctx = gsap.context(() => {
    let tl = gsap.timeline({
      defaults: {
        duration: 2,
        ease: 'expo.out',
      },
    })

    tl.to('.c-hero__title', {
      autoAlpha: 1,
      transform: 'translate(-50%, -75%) scale(1)',
      delay: 1,
    }).to(
      '.c-hero-video',
      {
        transform: 'translate(-50%, -50%) scale(1)',
        onComplete: () => {
          if (window.scrollY < 100) {
            lenis.value.scrollTo(props.scrollToTarget, {
              offset: props.scrollToOffset,
            })
          }
        },
      },
      '-=2.1'
    )
  })
})

onBeforeUnmount(() => {
  ctx.revert()
})
</script>

<template>
  <div
    class="c-hero"
    :class="{
      '-is-productions': route.name === 'productions',
      '-is-services': route.name === 'services',
      '-is-infos': route.name === 'infos',
    }"
  >
    <h1 class="c-hero__title o-section-title">{{ title }}</h1>
    <div class="c-hero-video">
      <video
        :src="video"
        class="c-hero-video__source"
        autoplay
        muted
        loop
        playsinline
        data-not-lazy
      ></video>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.c-hero {
  height: 100vh;
  width: 100%;
  position: relative;
  user-select: none;
  overflow: hidden;
  $self: &;
  &__title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 500%) scale(0.5);
    opacity: 0;
  }
  &-video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 500%) scale(0);
    z-index: -1;
    border-radius: 0.4rem;
    overflow: hidden;
    #{$self}.-is-productions & {
      aspect-ratio: 16 / 9;
      height: min(50vw, 40rem);
    }
    #{$self}.-is-services & {
      aspect-ratio: 4 / 3;
      height: min(60vw, 40rem);
    }
    #{$self}.-is-infos & {
      aspect-ratio: 9 / 16;
      height: min(80vw, 40rem);
    }
    &__source {
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>
