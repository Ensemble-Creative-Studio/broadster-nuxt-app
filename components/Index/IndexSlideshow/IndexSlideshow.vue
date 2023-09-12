<script setup>
const query = groq`*[_type == "home"][0]
  {
    featuredFilms[]{
      film->{
        categories[]->{
          title,
        },
        title,
        description,
        loopUrl,
      },
      baseline,
    },
  }
`

const { data: home } = useSanityQuery(query)
console.log(home.value);

const index = ref(0)

// Calculate the desired height for container
const aspectRatios = [1.73, 2.25, 0.6]
const modifiers = ['-is-small', '-is-medium', '-is-large']

let interval

onMounted(() => {
  interval = setInterval(() => {
    const previousIndex = computed(() => {
      return index.value - 1 < 0 ? home.value?.featuredFilms?.length - 1 : index.value - 1
    })

    index.value = (index.value + 1) % home.value?.featuredFilms?.length
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
        v-for="(item, i) in home?.featuredFilms"
        class="c-slideshow-video__source"
        :class="i === index ? '-is-visible' : ''"
        :src="item.film.loopUrl"
        autoplay
        muted
        loop
        playsinline
      ></video>
    </div>
    <footer class="c-slideshow-footer">
      <h2
        v-for="(item, i) in home?.featuredFilms"
        class="c-slideshow-footer__baseline o-title"
        ref="$baselines"
        :key="i"
      >
        {{ item.film.baseline }}
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
