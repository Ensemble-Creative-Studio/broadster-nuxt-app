<script setup>
const props = defineProps({
  history: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="c-infos-numbers">
    <div class="c-infos-numbers__container u-wrapper">
      <h2 class="o-title">Broadster depuis sa création</h2>
      <div class="c-infos-numbers__grid">
        <InfosNumbersCard
          v-for="(item, i) in history"
          :data="item"
          :key="i"
        />
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
