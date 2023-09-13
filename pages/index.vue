<script setup>
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

const index = ref(0)
let interval

function incrementIndex() {
  index.value = (index.value + 1) % home?.value?.featuredFilms?.length
}

onMounted(() => {
  interval = setInterval(() => {
    const previousIndex = computed(() => {
      return index.value - 1 < 0 ? home?.value?.featuredFilms?.length - 1 : index.value - 1
    })

    index.value = (index.value + 1) % home?.value?.featuredFilms?.length
  }, 3000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<template>
  <div class="l-index">
    <IndexSlideshow :index="index" :featuredFilms="home?.featuredFilms" @click="incrementIndex" />
    <IndexSummary :links="home?.links" />
  </div>
</template>

<style lang="scss" scoped>
.l-index {
  min-height: 100vh;
  width: 100%;
}
</style>
