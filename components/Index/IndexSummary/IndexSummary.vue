<script setup>
const props = defineProps({
  links: {
    type: Array,
  },
})

const slugs = [
  'productions',
  'services',
  'infos',
]
</script>

<template>
  <div class="c-index-summary">
    <div class="c-index-summary__grid u-wrapper">
      <IndexSummaryCard
        v-for="(link, i) in links"
        :data="link"
        :slug="slugs[i]"
        class="c-index-summary__card"
        :key="i"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.c-index-summary {
  padding-top: 36rem;
  margin-bottom: 1.2rem;
  &__grid {
    @include grid(12, 1.2rem, 1.2rem);
    align-items: stretch;
  }
  &__card {
    grid-column: auto / span 4;
  }
}
</style>
