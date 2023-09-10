<script setup>
const blocks = [
  {
    title: 'Productions',
    slug: 'productions',
  },
  {
    title: 'Services',
    slug: 'services',
  },
  {
    title: 'À propos',
    slug: 'infos',
  },
]
</script>

<template>
  <div class="c-index-summary">
    <div class="c-index-summary__grid u-wrapper">
      <IndexSummaryCard
        v-for="(block, i) in blocks"
        :title="block.title"
        :slug="block.slug"
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
