<script setup>
const route = useRoute()

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  video: {
    type: String,
  },
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
    <div v-if="video" class="c-hero-video">
      <video :src="video" class="c-hero-video__source" autoplay muted loop playsinline></video>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.c-hero {
  height: 100svh;
  width: 100%;
  position: relative;
  $self: &;
  @include mq($until: tablet) {
    height: 75svh;
  }
  &__title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -75%);
  }
  &-video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    border-radius: 0.4rem;
    overflow: hidden;
    height: min(60vw, 40rem);
    width: auto;
    #{$self}.-is-productions & {
      aspect-ratio: 16 / 9;
    }
    #{$self}.-is-services & {
      aspect-ratio: 4 / 3;
    }
    #{$self}.-is-infos & {
      aspect-ratio: 9 / 16;
    }
  }
}
</style>
