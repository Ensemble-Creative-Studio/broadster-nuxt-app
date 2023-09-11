<script setup>
const query = groq`*[_type == "productions"][0]
  {
    title,
    sections[]{
      ...,
      featuredFilm->{
        title,
        videoUrl,
        description,
        categories[]->{
          title,
        },
        credits,
        duration,
        genre
      },
      films[]->{
        title,
        videoUrl,
        description,
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
    />
  </div>
</template>
