<script setup>
const props = defineProps({
  film: {
    type: Object,
    required: true,
  },
  class: {
    type: String,
    default: '',
  },
})

const $film = ref(null)
const $filmMeta = ref(null)
const $video = ref(null)
const isHovered = ref(false)
const isFeatured = computed(() => props.class.includes('-is-featured'))

const isVideoPlayerOpen = useState('isVideoPlayerOpen')
const currentFilm = useState('currentFilm', () => {})

function onMouseOver() {
  if (!isFeatured.value) {
    $video.value.play()
    isHovered.value = true
  }
}

function onMouseLeave() {
  if (!isFeatured.value) {
    $video.value.pause()
    isHovered.value = false
  }
}

function onClick() {
  isVideoPlayerOpen.value = true
  currentFilm.value = props.film
}
</script>

<template>
  <div
    ref="$film"
    :class="[
      'c-film',
      {
        '-is-hovered': isHovered,
      },
      props.class,
    ]"
    @mouseover="onMouseOver"
    @mouseleave="onMouseLeave"
  >
    <div class="c-film__container">
      <div class="c-film__media">
        <div class="c-film__overlay"></div>
        <div class="c-film__thumbnail">
          <SanityImage
            v-if="film.placeholderImage"
            :asset-id="film.placeholderImage?.asset?._ref"
            alt=""
            auto="format"
          />
        </div>
        <video
          ref="$video"
          :src="film?.loopUrl"
          class="c-film__video"
          :class="{
            '-is-visible': (!isFeatured && isHovered) || isFeatured,
          }"
          muted
          loop
          playsinline
          :autoplay="isFeatured"
        ></video>
      </div>
      <div
        ref="$filmMeta"
        class="c-film__meta"
        :style="{
          transform:
            isHovered && !isFeatured && $filmMeta?.clientHeight
              ? `translateY(calc(100% - ${$filmMeta?.clientHeight}px))`
              : !isHovered && isFeatured
              ? `translateY(0%)`
              : `translateY(100%)`,
        }"
      >
        <h3 class="c-film__title o-thumbnail-title">{{ film.title }}</h3>
        <p
          class="c-film__description"
          v-if="film.shortDescription"
          v-html="film.shortDescription"
        ></p>
        <footer class="c-film__footer">
          <button
            class="c-film-play-button o-button -has-white-background -has-icon"
            @click="onClick"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 12V0L12 6L0 12Z" />
            </svg>
            <span class="c-film-play-button__text">Play</span>
          </button>
          <span
            class="o-button -has-dark-grey-background"
            v-for="category in film.categories"
            v-if="film.categories"
          >
            {{ category.title }}
          </span>
          <span class="o-button -has-dark-grey-background" v-if="film.duration">
            {{ film.duration }}
          </span>
        </footer>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.c-film {
  border-radius: 0.4rem;
  overflow: hidden;
  user-select: none;
  $self: &;
  @include mq($until: medium) {
    height: auto;
    overflow: visible;
  }
  &__container {
    position: relative;
    height: 100%;
    width: 100%;
    @include mq($until: medium) {
      padding: 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }
  }
  &__media {
    position: relative;
    height: 100%;
    width: 100%;
    aspect-ratio: 66 / 43.5;
    @include mq($until: medium) {
      aspect-ratio: 3 / 2;
    }
  }
  &__overlay,
  &__thumbnail,
  &__video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  &__overlay {
    background-color: rgba($dark-grey, 0.4);
    z-index: -1;
    transition: opacity 0.3s cubic-bezier(0.215, 0.61, 0.355, 1),
      visibility 0.3s cubic-bezier(0.215, 0.61, 0.355, 1),
      background-color 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
    @include mq($until: medium) {
      display: none;
    }
    #{$self}:hover & {
      background-color: rgba($dark-grey, 0.6);
    }
    #{$self}.-is-featured:hover & {
      background-color: rgba($dark-grey, 0.4);
    }
  }
  &__thumbnail {
    @include mq($until: medium) {
      position: relative;
      min-height: 100%;
    }
  }
  &__thumbnail {
    z-index: -3;
  }
  &__video {
    z-index: -2;
    #{$self}:not(.-is-featured) & {
      opacity: 0;
      visibility: hidden;
      &.-is-visible {
        opacity: 1;
        visibility: visible;
      }
    }
  }
  &__meta {
    position: absolute;
    bottom: 3.6rem;
    left: 3.6rem;
    width: calc(100% - 6.4rem);
    @include mq($until: medium) {
      position: relative;
      bottom: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      flex: 2;
      width: 100%;
    }
    #{$self}:not(.-is-featured) & {
      transition: transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
      transform: translateY(100%);
      @include mq($until: medium) {
        transform: translateY(0%) !important;
      }
    }
  }
  &__title,
  &__description {
    color: $white;
    @include mq($until: medium) {
      color: $black;
    }
  }
  &__title {
    max-width: 35ch;
    @include mq($until: medium) {
      order: 2;
      margin-top: 1rem;
      max-width: 100%;
    }
    #{$self}:not(.-is-featured) & {
      @include mq($from: medium) {
        transform: translateY(0%);
        position: absolute;
        bottom: 100%;
        left: 0;
      }
    }
  }
  &__description {
    margin-top: 1.2rem;
    max-width: 50ch;
    @include mq($until: medium) {
      order: 3;
      flex: auto;
      display: flex;
      align-items: flex-end;
      max-width: 100%;
    }
    #{$self}:not(.-is-featured) & {
      @include mq($from: medium) {
        transition: transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);

        transform: translateY(calc(50%));
      }
    }
    #{$self}:hover:not(.-is-featured) & {
      @include mq($from: medium) {
        transform: translateY(calc(0%));
      }
    }
  }
  &__footer {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    margin-top: 1.8rem;
    @include mq($until: medium) {
      order: 1;
      margin-top: 0;
    }
    #{$self}:not(.-is-featured) & {
      @include mq($from: medium) {
        transition: transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);

        transform: translateY(calc(50%));
      }
    }
    #{$self}:hover:not(.-is-featured) & {
      @include mq($from: medium) {
        transform: translateY(calc(0%));
      }
    }
    & > * {
      @include mq($until: medium) {
        margin-top: 0.5rem;
      }
    }
    & > *:not(:last-child) {
      margin-right: 1rem;
      @include mq($until: medium) {
        margin-right: 0.5rem;
      }
    }
  }
  &-play-button {
    @include mq($until: medium) {
      background-color: $black;
      color: $white;
    }
    &__text {
      margin-left: 1rem;
    }
  }
}
</style>
