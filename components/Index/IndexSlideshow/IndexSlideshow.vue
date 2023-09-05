<script setup>
import anime from 'animejs'

const index = ref(0)

// Sources
const videos = [
  'https://player.vimeo.com/progressive_redirect/playback/847355973/rendition/1080p/file.mp4?loc=external&signature=47ac414eb6ae8d2f123245b4ecc0d7e2d758146fdb1377231d8ab55be0ccfca7',
  'https://player.vimeo.com/progressive_redirect/playback/847356020/rendition/1080p/file.mp4?loc=external&signature=f4a64de90b8b76b1fc7c07b9518235626e948b27bbe8e8e869db69e3056cbb1a',
  'https://player.vimeo.com/progressive_redirect/playback/847356001/rendition/720p/file.mp4?loc=external&signature=033c82e6182f6b278fc1d97adf1270512e5cae1ce26eed7e8b20c3fac46306ad',
]

// Baselines
const $baselines = ref([])
const baselines = [
  'Broadster imagine et produit des contenus audiovisuels pour raconter des histoires originales.',
  'Cultiver notre curiosité pour créer des documentaires captivants.',
  'Raconter vos engagements avec la force narrative du documentaire.',
]

// Calculate the desired height for container
const aspectRatios = [1.73, 2.25, 0.6]
const modifiers = ['-is-small', '-is-medium', '-is-large']

let interval

onMounted(() => {
  interval = setInterval(() => {
    const previousIndex = computed(() => {
      return index.value - 1 < 0 ? videos.length - 1 : index.value - 1
    })

    const tl = anime.timeline({
      easing: 'easeInOutQuad',
      duration: 500,
    })

    tl.add({
      targets: $baselines.value[index.value],
      opacity: [0, 1],
      translateY: [50, 0],
      complete: function (anim) {
        anim.animatables[0].target.style.transform = 'translateY(50px)'
        anim.animatables[0].target.style.opacity = '0'
      },
    }).add(
      {
        targets: $baselines.value[previousIndex.value],
        opacity: [1, 0],
        translateY: [0, -50],
      },
      '+=1250'
    )

    index.value = (index.value + 1) % videos.length
  }, 2500)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<template>
  <div class="c-slideshow">
    <div class="c-slideshow-video" :class="modifiers[index]">
      <video
        v-for="(video, i) in videos"
        class="c-slideshow-video__source"
        :class="i === index ? '-is-visible' : ''"
        :src="video"
        autoplay
        muted
        loop
        playsinline=""
      ></video>
    </div>
    <footer class="c-slideshow-footer">
      <h2
        v-for="(baseline, i) in baselines"
        class="c-slideshow-footer__baseline o-title"
        ref="$baselines"
      >
        {{ baseline }}
      </h2>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.c-slideshow {
  height: 100svh;
  position: relative;
  &-video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 1.2rem;
    overflow: hidden;
    transform-origin: center;
    transition: cubic-bezier(0.215, 0.61, 0.355, 1) 1.5s;
    height: auto;
    transition-property: height, width;
    &.-is-small {
      width: 15vw;
      height: 45rem;
    }
    &.-is-medium {
      width: 35vw;
      height: 40rem;
    }
    &.-is-large {
      width: 55vw;
      height: 55rem;
    }
    &__source {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      visibility: hidden;
      transition: opacity 1.5s cubic-bezier(0.215, 0.61, 0.355, 1);
      &.-is-visible {
        opacity: 1;
        visibility: visible;
      }
    }
  }
  &-footer {
    &__baseline {
      max-width: 75vw;
      position: absolute;
      left: 2.4rem;
      bottom: 2.4rem;
      opacity: 0;
      transform: translateY(50px);
      transition: ease-in-out 1s;
    }
  }
}
</style>
