<script setup>
import gsap from 'gsap'

const query = groq`*[_type == "productions"][0]
  {
    title,
    videoUrl,
    sections[]{
      ...,
      featuredFilm->{
        title,
        placeholderImage,
        loopUrl,
        videoUrl,
        shortDescription,
        fullDescription,
        categories[]->{
          title,
        },
        credits,
        duration,
        genre
      },
      films[]->{
        title,
        placeholderImage,
        loopUrl,
        videoUrl,
        shortDescription,
        fullDescription,
        categories[]->{
          title,
        },
        credits,
        duration
      },
    },
  }
`

const { data: productions } = useSanityQuery(query)

onMounted(() => {
  gsap.to('.l-productions', {
    opacity: 1,
    ease: 'power3.out',
    delay: 1,
  })
})

onBeforeUnmount(() => {
  gsap.killTweensOf('.l-productions')
})

onBeforeRouteLeave((to, from, next) => {
  gsap.to('.l-productions', {
    opacity: 0,
    ease: 'power3.out',
    onComplete: () => {
      next()
    },
  })
})
</script>

<template>
  <div class="l-productions">
    <Hero
      title="Productions"
      :video="productions?.videoUrl"
      scrollToTarget=".l-productions__section"
      class="-is-hidden-in-footer"
    />
    <ProductionsSection
      v-for="section in productions?.sections"
      :section="section"
      :key="section._key"
      class="l-productions__section -is-hidden-in-footer"
    />
    <Footer class="l-productions__footer" elemsToHide=".-is-hidden-in-footer" />
  </div>
</template>

<style lang="scss" scoped>
.l-productions {
  opacity: 0;
  &__footer {
    margin-top: 26rem;
  }
}
</style>
