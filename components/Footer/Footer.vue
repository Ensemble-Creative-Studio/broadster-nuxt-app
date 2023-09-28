<script setup>
const route = useRoute()

const query = groq`*[_type == "footer"][0]
  {
    title,
    mail,
    socials[]
  }
`

const { data: footer } = useSanityQuery(query)
</script>

<template>
  <footer class="c-footer">
    <div class="c-footer__container u-wrapper">
      <div class="c-footer-row">
        <ul>
          <li>
            <a :href="`mailto:${footer.mail}`">{{ footer.mail }}</a>
          </li>
        </ul>
      </div>
      <div class="c-footer-row">
        <ul>
          <li v-for="(item, i) in footer.socials">
            <a :href="item.url" target="_blank">{{ item.title }}</a>
          </li>
        </ul>
      </div>
      <div class="c-footer-row">
        <ul>
          <li>
            <NuxtLink to="/mentions-legales"> Mentions Légales </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/politique-de-confidentialite"> Politique de confidentialité </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.c-footer {
  padding-bottom: 2.4rem;
  &__container {
    font-size: 1.6rem;
    @include grid(12, 1.2rem, 1.2rem);
    align-items: stretch;
    @include mq($until: tablet) {
      font-size: 1.4rem;
    }
  }
  &-row {
    grid-column: auto / span 4;
    background-color: $very-dark;
    color: $white;
    border-radius: 0.4rem;
    padding: 3.6rem;
    font-family: $the-future-mono;
    @include mq($until: tablet) {
      grid-column: 1 / -1;
      padding: 1.2rem;
      height: 10rem;
    }
  }
}
</style>
