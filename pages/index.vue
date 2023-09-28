<script setup>
import gsap from 'gsap'

const query = groq`*[_type == "home"][0]
  {
    featuredFilms[]{
      film->{
        categories[]->{
          title,
        },
        title,
        loopUrl,
        duration,
      },
      baseline,
    },
    links[]{
      title,
      videoUrl,
    },
  }
`

const { data: home } = useSanityQuery(query)

onBeforeRouteLeave((to, from, next) => {
  gsap.to('.l-index', {
    opacity: 0,
    ease: 'power3.out',
    onComplete: () => {
      next()
    },
  })
})
</script>

<template>
  <div class="l-index">
    <IndexSlideshow :featuredFilms="home?.featuredFilms" />
    <IndexSummary :links="home?.links" />
  </div>
</template>

<style lang="scss" scoped>
.l-index {
  min-height: 100vh;
  width: 100%;
}
</style>
