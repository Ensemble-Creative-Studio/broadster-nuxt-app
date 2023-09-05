<script setup>
const items = [
  {
    number: 40,
    baseline: 'Documentaires',
  },
  {
    number: 40,
    baseline: 'Créations originales',
  },
  {
    number: 700,
    baseline: 'Vidéos corporate',
  },
]
</script>

<template>
  <div class="c-infos-numbers">
    <div class="c-infos-numbers__container u-wrapper">
      <h2 class="o-title">Broadster depuis sa création</h2>
      <div class="c-infos-numbers__grid">
        <InfosNumbersCard v-for="item in items" :number="item.number" :baseline="item.baseline" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.c-infos-numbers {
  &__grid {
    margin-top: 1.2rem;
    @include grid(12, 1.2rem, 1.2rem);
    align-items: stretch;
  }
}
</style>
