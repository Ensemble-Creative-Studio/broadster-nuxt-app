<script setup>
import { ForceWait } from '/utils/ForceWait'

const fw = new ForceWait()
const route = useRoute()

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

onMounted(async () => {
  await fw.delay(3000)
  if (window.scrollY < 100) {
    lenis.value.scrollTo(props.scrollToTarget, {
      offset: props.scrollToOffset,
    })
  }
})

onBeforeUnmount(() => {
  fw.kill()
})
</script>

<template>
  <div class="c-hero" :class="`-is-${route.name}`">
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
    animation: titleTranslateFromBottom 2s 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  &-video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 500%) scale(0);
    animation: videoTranslateFromBottom 2s 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
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

@keyframes videoTranslateFromBottom {
  0% {
    transform: translate(-50%, 500%) scale(0);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes titleTranslateFromBottom {
  0% {
    transform: translate(-50%, 500%) scale(0.5);
  }
  100% {
    transform: translate(-50%, -75%) scale(1);
  }
}
</style>
