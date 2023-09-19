<script setup>
const props = defineProps({
  data: {
    type: Object,
  },
})

const lenis = inject('lenisCtx')

onBeforeMount(() => {
  lenis.value.start()
})
</script>

<template>
  <div class="c-annex">
    <div class="c-annex__wrapper">
      <div class="c-annex__content" v-if="data?.content">
        <h1 class="o-title">{{ data?.title }}</h1>
        <SanityContent :blocks="data?.content" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.c-annex {
  &__content {
    width: clamp(20rem, 100%, 80rem);
    padding: 10rem 1.5rem;
    max-width: 100%;
    margin: auto;

    h2:not(:first-child) {
      margin-top: 4rem;
    }

    h2 {
      margin-bottom: -2rem;
      display: block;
      font-family: $the-future-mono;
      font-weight: 500;
      line-height: 2;
      text-transform: none;

      @include mq($until: tablet) {
        font-size: 1.6rem;
      }

      @include mq($until: tablet) {
        font-size: 1.4rem;
      }
    }

    p,
    ul,
    ol {
      margin-top: 2rem;
    }

    ol,
    ul {
      margin-left: 2rem;

      li {
        &::before {
          content: '•';
          margin-right: 1rem;
        }
      }
    }
  }
}
</style>
