<script setup>
const props = defineProps({
  client: String,
})
</script>

<template>
  <div class="c-infos-clients-item">
    <h3 class="c-infos-clients-item__title o-title">{{ client }}</h3>
  </div>
</template>

<style lang="scss" scoped>
.c-infos-clients-item {
  background-color: $very-dark;
  color: $white;
  padding: 2.4rem;
  border-radius: 0.4rem;
  min-height: clamp(20rem, 8vw, 10vw); // TODO - Check this
  display: flex;
  align-items: flex-end;
  @include mq($until: tablet) {
    padding: 1.2rem;
  }
  @include mq($until: small) {
    min-height: 15rem;
  }
  @include mq($until: tablet) {
    min-height: 10rem;
  }
  &__title {
    max-width: 10ch;
  }
}
</style>
