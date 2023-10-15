<script setup>
import { gsap } from 'gsap'
import { ForceWait } from '/utils/ForceWait'
import { useMediaQuery } from '@vueuse/core'

const isMobile = useMediaQuery('(max-width: 481px)')

const fw = new ForceWait()

const props = defineProps({
  elemsToHide: {
    type: String,
  },
})

const query = groq`*[_type == "footer"][0]
  {
    title,
    mail,
    socials[]
  }
`

const { data: footer } = useSanityQuery(query)

let ctx

onMounted(async () => {
  await fw.delay(500)
  ctx = gsap.context(() => {
    if (isMobile.value) {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.c-footer',
          // markers: true,
          start: '0% 75%',
          onLeaveBack: () => {
            tl.reverse()
          },
        },
      })

      if (props.elemsToHide) {
        tl.to(props.elemsToHide, { opacity: 0, duration: 0.5 })
      }
    }
  })
})

onBeforeUnmount(() => {
  ctx.revert()
  fw.kill()
})
</script>

<template>
  <footer class="c-footer">
    <div class="c-footer__container u-wrapper">
      <div class="c-footer-row">
        <ul>
          <li>
            <a :href="`mailto:${footer.mail}`" class="c-footer-row__link">{{ footer.mail }}</a>
          </li>
        </ul>
      </div>
      <div class="c-footer-row">
        <ul>
          <li v-for="(item, i) in footer.socials">
            <a :href="item.url" target="_blank" class="c-footer-row__link">{{ item.title }}</a>
          </li>
        </ul>
      </div>
      <div class="c-footer-row">
        <ul>
          <li>
            <NuxtLink to="/mentions-legales" class="c-footer-row__link">
              Mentions Légales
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/politique-de-confidentialite" class="c-footer-row__link">
              Politique de confidentialité
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
$cubic: cubic-bezier(0.16, 1, 0.3, 1);

.c-footer {
  padding-bottom: 2.4rem;
  margin-top: 1.2rem;
  @include mq($until: tablet) {
    padding-bottom: 1.2rem;
  }
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
    @include mq($from: tablet) {
      &__link {
        transition: 0.5s opacity $cubic;
        &:hover {
          opacity: 0.7;
        }
      }
    }
  }
}
</style>
