<script setup>
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import { ForceWait } from '/utils/ForceWait'

const fw = new ForceWait()

const props = defineProps({
  featuredFilms: {
    type: Array,
  },
})

const modifiers = ['-is-wide', '-is-square', '-is-mobile']
const index = ref(0)
const $$baseline = shallowRef()

const lenis = inject('lenisCtx')

let ctx
let interval
let result

watch(index, () => {
  console.log('index changed')
})

onMounted(async () => {
  window.addEventListener('wheel', function (event) {
    isTrackPad(event)
  })
  window.addEventListener('resize', setHeight)

  setHeight()
  createInterval(5000)

  await fw.delay(500)
  setIndex(0)

  ctx = gsap.context(() => {
    let tl = gsap.timeline({
      defaults: {
        duration: 1,
        ease: 'expo.out',
      },
    })

    tl.to('.c-slideshow', {
      autoAlpha: 1,
    }).to(
      '.c-slideshow-video__meta',
      {
        autoAlpha: 1,
      },
      '-=0.2'
    )

    let currentProgress = 0
    let progress = 0

    let realProgress = 0

    ScrollTrigger.create({
      trigger: '.c-slideshow',
      pin: true,
      end: '+=' + window.innerHeight * 2, // TODO - Make innerHeight reactive
      onUpdate: (self) => {
        console.log(self)

        if (self.progress < 0.3) {
          progress = 0
        } else if (self.progress > 0.3 && self.progress < 0.6) {
          progress = 1
        } else if (self.progress > 0.6) {
          progress = 2
        }

        if (progress !== currentProgress) {
          currentProgress = progress
          setIndex(progress)
          createInterval(5000)
          stopAndStart()
        }
      },
      onLeave: () => {
        clearInterval(interval)
      },
      onEnterBack: () => {
        createInterval(5000)
      },
    })
  })
})

onBeforeUnmount(() => {
  ctx.revert()
  fw.kill()

  window.removeEventListener('resize', setHeight)
  window.removeEventListener('wheel', function (event) {
    isTrackPad(event)
  })

  console.log('interval cleared')
  clearInterval(interval)
  interval = null
})

function isTrackPad(e) {
  const { deltaY } = e
  if (deltaY && !Number.isInteger(deltaY)) {
    result = 'mouse'
  } else {
    result = 'trackpad'
  }
}

function createInterval(delay) {
  clearInterval(interval)

  interval = setInterval(() => {
    incrementIndex()
  }, delay)

  console.log('interval created')
}

function incrementIndex() {
  const value = ((index.value + 1) * (window.innerHeight * 2)) / 3
  lenis.value.scrollTo(index.value !== 2 ? value : '.c-footer')
}

function setIndex(i) {
  index.value = i

  console.log(i);

  gsap.to($$baseline.value[i], {
    autoAlpha: 1,
    transform: 'translateY(0)',
  })

  if (i > 0) {
    gsap.to($$baseline.value[i - 1], {
      opacity: 0,
      transform: 'translateY(-5rem)',
    })
  }

  if (i < 2) {
    gsap.to($$baseline.value[i + 1], {
      opacity: 0,
      transform: 'translateY(5rem)',
    })
  }
}

function setHeight() {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

function stopAndStart() {
  lenis.value.stop()
  console.log(lenis.value);
  setTimeout(() => {
    lenis.value.start()
  }, 750)
}
</script>

<template>
  <div class="c-slideshow">
    <div
      class="c-slideshow-video"
      v-for="(item, i) in featuredFilms"
      :class="[modifiers[index], i === index ? '-is-visible' : '']"
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
        ref="$$baseline"
        :key="i"
      >
        {{ item.baseline }}
      </h2>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
:root {
  --vh: 1vh;
}

$cubic: cubic-bezier(0.16, 1, 0.3, 1);

.c-slideshow {
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
  position: relative;
  opacity: 0;
  &-video {
    cursor: pointer;
    user-select: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -60%, 0);
    border-radius: 0.4rem;
    overflow: hidden;
    transform-origin: center;
    transition: 1s cubic;
    height: auto;
    transition-property: opacity, visibility, height, width;
    opacity: 0;
    visibility: hidden;
    will-change: opacity, visibility, height, width;

    &.-is-visible {
      opacity: 1;
      visibility: visible;
    }
    &.-is-wide {
      width: 60vw;
      height: 34vw;
      @include mq($until: medium) {
        width: 70vw;
        height: 39vw;
      }
      @include mq($until: tablet) {
        width: 90vw;
        height: 51vw;
      }
    }
    &.-is-square {
      width: 40vw;
      height: 30vw;
      @include mq($until: medium) {
        width: 50vw;
        height: 38vw;
      }
      @include mq($until: tablet) {
        width: 70vw;
        height: 53vw;
      }
    }
    &.-is-mobile {
      width: 19vw;
      height: 34vw;
      @include mq($until: medium) {
        width: 25vw;
        height: 44vw;
      }
      @include mq($until: tablet) {
        width: 50vw;
        height: 89vw;
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
      @include mq($until: medium) {
        bottom: 2.4rem;
        left: 2.4rem;
      }
      @include mq($until: tablet) {
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
      transform: translateY(5rem);
      will-change: transform;
      @include mq($until: desktop) {
        left: 1.2rem;
        bottom: 1.2rem;
      }
    }
  }
}
</style>
