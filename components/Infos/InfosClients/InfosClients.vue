<script setup>
const props = defineProps({
  clients: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="c-infos-clients">
    <div class="c-infos-clients__container u-wrapper">
      <h2 class="o-title">Clients</h2>
      <div class="c-infos-clients__grid">
        <InfosClientsItem
          v-for="(client, i) in clients"
          :client="client"
          class="c-infos-clients__item"
          :key="i"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.c-infos-clients {
  width: 100%;
  margin-bottom: 10rem;
  &__grid {
    @include grid(12, 1.2rem, 1.2rem);
    align-items: stretch;
    margin-top: 1.2rem;
  }
  &__item {
    grid-column: auto / span 3;
    @include mq($until: small) {
      grid-column: auto / span 4;
    }
    @include mq($until: tablet) {
      grid-column: auto / span 6;
    }
    @include mq($until: tablet) {
      grid-column: 1 / -1;
    }
  }
}
</style>
