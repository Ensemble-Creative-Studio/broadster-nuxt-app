<script setup>
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const props = defineProps({
  featuredFilms: {
    type: Array,
  },
})

const modifiers = ['-is-wide', '-is-square', '-is-mobile']
const index = shallowRef(0)

let interval
let timeout

function incrementIndex() {
  index.value = (index.value + 1) % props.featuredFilms?.length
}

onMounted(() => {
  timeout = setTimeout(() => {
    const tl = gsap.timeline({
      defaults: {
        ease: 'power4.out',
        duration: 1,
      },
    })

    tl.to('.c-slideshow', {
      opacity: 1,
    }).to(
      '.c-slideshow-video__meta',
      {
        opacity: 1,
      },
      '-=0.2'
    )

    ScrollTrigger.create({
      trigger: '.c-slideshow',
      pin: true,
      end: '+=' + window.innerHeight * 2, // TODO - Make innerHeight reactive
      onUpdate: (self) => {
        if (self.progress > 0 && self.progress < 0.3) {
          console.log('index 0')
        }

        if (self.progress > 0.3 && self.progress < 0.6) {
          console.log('index 1')
        }

        if (self.progress > 0.6) {
          console.log('index 2')
        }
      },
    })
  }, 100)

  // interval = setInterval(() => {
  //   incrementIndex()
  // }, 3000)
})

onUnmounted(() => {
  clearInterval(interval)
  clearTimeout(timeout)

  ScrollTrigger.getAll().forEach((trigger) => {
    trigger.kill()
  })
})
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
  opacity: 0;
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
    transition: 1.5s cubic-bezier(0.215, 0.61, 0.355, 1);
    height: auto;
    transition-property: opacity, visibility, height, width;
    opacity: 0;
    visibility: hidden;
    will-change: opacity, visibility, height, width;

    &.-is-visible {
      opacity: 1;
      visibility: visible;
    }
    &.-is-mobile {
      width: 17vw;
      height: 30vw;
      @include mq($until: tablet) {
        width: 50vw;
        height: 89vw;
      }
    }
    &.-is-square {
      width: 30vw;
      height: 23vw;
      @include mq($until: tablet) {
        width: 70vw;
        height: 53vw;
      }
    }
    &.-is-wide {
      width: 50vw;
      height: 28vw;
      @include mq($until: tablet) {
        width: 90vw;
        height: 51vw;
      }
    }
    &__source {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 1;
      visibility: visible;
    }
    &__meta {
      position: absolute;
      bottom: 3.6rem;
      left: 3.6rem;
      width: calc(100% - 6.4rem);
      opacity: 0;
      @include mq($until: large) {
        bottom: 2.4rem;
        left: 2.4rem;
      }
      @include mq($until: medium) {
        bottom: 1rem;
        left: 1rem;
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
      margin-top: 0.8rem;
      @include mq($until: large) {
        margin-top: 0.5rem;
      }
      @include mq($until: medium) {
        margin-top: 0;
      }
      & > * {
        margin-top: 1rem;
        @include mq($until: medium) {
          margin-top: 0.5rem;
        }
        &:not(:last-child) {
          margin-right: 1rem;
          @include mq($until: medium) {
            margin-right: 0.5rem;
          }
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
