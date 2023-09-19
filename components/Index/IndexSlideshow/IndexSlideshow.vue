<script setup>
const props = defineProps({
  featuredFilms: {
    type: Array,
  },
})

const index = ref(0)
let interval

function incrementIndex() {
  index.value = (index.value + 1) % props.featuredFilms?.length
}

onMounted(() => {
  interval = setInterval(() => {
    const previousIndex = computed(() => {
      return index.value - 1 < 0 ? props.featuredFilms?.length - 1 : index.value - 1
    })

    index.value = (index.value + 1) % props.featuredFilms?.length
  }, 3000)
})

onUnmounted(() => {
  clearInterval(interval)
})

// TODO - Calculate the desired height for container
const aspectRatios = [1.77, 2.25, 0.6]
const modifiers = ['-is-wide', '-is-square', '-is-mobile']
</script>

<template>
  <div class="c-slideshow">
    <div
      class="c-slideshow-video"
      v-for="(item, i) in featuredFilms"
      :class="[modifiers[index], i === index ? '-is-visible' : '']"
      @click="incrementIndex"
    >
      <video
        class="c-slideshow-video__source"
        :src="item?.film?.loopUrl"
        autoplay
        muted
        loop
        playsinline
      ></video>
      <div class="c-slideshow-video__meta" v-if="item?.film?.categories">
        <h3 class="c-slideshow-video__title o-thumbnail-title">{{ item?.film?.title }}</h3>
        <footer class="c-slideshow-video__footer">
          <span
            class="o-button -has-dark-grey-background"
            v-for="category in item?.film?.categories"
          >
            {{ category.title }}
          </span>
          <span class="o-button -has-dark-grey-background" v-if="item?.film?.duration">
            {{ item.film?.duration }}
          </span>
        </footer>
      </div>
    </div>
    <footer class="c-slideshow-footer">
      <h2
        v-for="(item, i) in featuredFilms"
        class="c-slideshow-footer__baseline o-title"
        :class="[modifiers[index], i === index ? '-is-visible' : '']"
        ref="$baselines"
        :key="i"
      >
        {{ item.baseline }}
      </h2>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.c-slideshow {
  height: 100svh;
  position: relative;
  &-video {
    cursor: pointer;
    user-select: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    border-radius: 0.4rem;
    overflow: hidden;
    transform-origin: center;
    transition: 1s cubic-bezier(0.215, 0.61, 0.355, 1);
    height: auto;
    transition-property: opacity, visibility, height, width;
    opacity: 0;
    visibility: hidden;

    &.-is-visible {
      opacity: 1;
      visibility: visible;
    }
    &.-is-mobile {
      width: 17vw;
      height: 30vw;
      // @include mq($until: tablet) {
      //   width: 70vw;
      //   height: 50vw;
      // }
    }
    &.-is-square {
      width: 30vw;
      height: 23vw;
      // @include mq($until: tablet) {
      //   width: 95vw;
      //   height: 50vw;
      // }
    }
    &.-is-wide {
      width: 50vw;
      height: 28vw;
      // @include mq($until: tablet) {
      //   width: 60vw;
      //   height: 100vw;
      // }
    }
    &__source {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
    }
    &__meta {
      position: absolute;
      bottom: 3.6rem;
      left: 3.6rem;
      width: calc(100% - 6.4rem);
      @include mq($until: medium) {
        bottom: 1rem;
        left: 1rem;
        width: 100%;
      }
    }
    &__title {
      max-width: 35ch;
      color: $white;
    }
    &__footer {
      display: flex;
      flex-wrap: wrap;
      align-items: stretch;
      margin-top: 1.8rem;
      @include mq($until: medium) {
        margin-top: 0.5rem;
      }
      & > * {
        @include mq($until: medium) {
          margin-top: 0.5rem;
        }
      }
      & > *:not(:last-child) {
        margin-right: 1rem;
        @include mq($until: medium) {
          margin-right: 0.5rem;
        }
      }
    }
  }
  &-footer {
    user-select: none;
    &__baseline {
      max-width: 40ch;
      position: absolute;
      left: 2.4rem;
      bottom: 2.4rem;
      opacity: 0;
      visibility: hidden;
      transform: translateY(5rem);
      @include mq($until: medium) {
        left: 1.2rem;
        bottom: 1.2rem;
      }
      &.-is-visible {
        opacity: 1;
        visibility: visible;
        animation: fadeInAndOut 3s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
      }
    }
  }
}

@keyframes fadeInAndOut {
  0% {
    transform: translateY(50px);
    opacity: 0;
  }
  30% {
    transform: translateY(0);
    opacity: 1;
  }
  95% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-15px);
    opacity: 0;
  }
}
</style>
