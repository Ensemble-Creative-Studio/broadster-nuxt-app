<template>
  <header class="c-header">
    <div class="c-header__container u-wrapper">
      <NuxtLink to="/">
        <HeaderLogo />
      </NuxtLink>
      <ul class="c-header-menu">
        <li class="c-header-menu__item">
          <NuxtLink to="/productions" title="">Productions</NuxtLink>
        </li>
        <li class="c-header-menu__item">
          <NuxtLink to="/services" title="">Services</NuxtLink>
        </li>
        <li class="c-header-menu__item">
          <NuxtLink to="/infos" title="">Infos</NuxtLink>
        </li>
      </ul>
    </div>
  </header>
</template>

<style lang="scss" scoped>
$cubic: cubic-bezier(0.16, 1, 0.3, 1);

.c-header {
  padding: 1.8rem 0;
  position: fixed;
  width: 100%;
  z-index: 10;
  animation: fadeIn 3s $cubic forwards;
  opacity: 0;
  @include mq($until: tablet) {
    padding: 1.2rem 0;
  }
  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &-menu {
    display: flex;
    align-items: center;
    font-size: 2rem;
    font-weight: $fw-medium;
    @include mq($until: tablet) {
      font-size: 1.6rem;
    }
    &__item {
      @include mq($from: tablet) {
        transition: 0.5s opacity $cubic;
        &:hover {
          opacity: 0.5;
        }
      }
      &:not(:first-child) {
        margin-left: 2.4rem;
        @include mq($until: tablet) {
          margin-left: 0.8rem;
        }
      }
    }
  }
}
@keyframes fadeIn {
  0%,
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
