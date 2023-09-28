<script setup>
import anime from 'animejs/lib/anime.es.js'

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

onBeforeRouteLeave((to, from, next) => {
  anime({
    targets: '.l-productions',
    opacity: 0,
    easing: 'spring(3, 80, 20, 1)',
    complete: () => {
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
    />
    <ProductionsSection
      v-for="section in productions?.sections"
      :section="section"
      :key="section._key"
      class="l-productions__section"
    />
  </div>
</template>
