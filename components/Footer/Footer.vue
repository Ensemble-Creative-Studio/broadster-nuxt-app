<template>
  <footer class="c-footer">
    <div class="c-footer__container u-wrapper">
      <div class="c-footer-row">
        <ul>
          <li>Contact@broadster.fr</li>
        </ul>
      </div>
      <div class="c-footer-row">
        <ul>
          <li>Linkedin</li>
          <li>Instagram</li>
          <li>Facebook</li>
        </ul>
      </div>
      <div class="c-footer-row">
        <ul>
          <li>Mentions Légales</li>
          <li>Politique de confidentialité</li>
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
    background-color: $bright-grey;
    border-radius: 0.4rem;
    padding: 3.6rem;
    @include mq($until: tablet) {
      grid-column: 1 / -1;
      padding: 1.2rem;
      height: 10rem;
    }
  }
}
</style>
