<script setup>
const query = groq`*[_type == "productions"][0]
  {
    title,
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
</script>

<template>
  <div class="l-productions">
    <Hero title="Productions" />
    <ProductionsSection
      v-for="section in productions?.sections"
      :section="section"
      :key="section._key"
      class="l-productions__section"
    />
  </div>
</template>
