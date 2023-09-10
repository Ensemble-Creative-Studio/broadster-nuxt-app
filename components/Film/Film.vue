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
const $video = ref(null)
const isFilmHovered = ref(false)
const isFeatured = computed(() => props.class.includes('-is-featured'))
const isVideoPlayerOpen = useState('isVideoPlayerOpen')

function onMouseOver() {
  if (!isFeatured.value) {
    $video.value.play()
    isFilmHovered.value = true
  }
}

function onMouseLeave() {
  if (!isFeatured.value) {
    $video.value.pause()
    isFilmHovered.value = false
  }
}

function onClick() {
  console.log('Open video player')
  isVideoPlayerOpen.value = true
}
</script>

<template>
  <div
    ref="$film"
    :class="[
      'c-film',
      {
        '-is-hovered': isFilmHovered,
      },
      props.class,
    ]"
    @mouseover="onMouseOver"
    @mouseleave="onMouseLeave"
  >
    <div class="c-film__container">
      <div class="c-film__overlay"></div>
      <div class="c-film__thumbnail"></div>
      <video
        ref="$video"
        :src="film.url"
        class="c-film__video"
        muted
        loop
        playsinline
        :autoplay="isFeatured"
      ></video>
      <div class="c-film__meta">
        <h3 class="c-film__title o-thumbnail-title">{{ film.title }}</h3>
        <p class="c-film__description">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas consequuntur optio,
          temporibus illum possimus molestiae at nesciunt provident voluptatibus omnis!
        </p>
        <footer class="c-film__footer">
          <button
            class="c-film-play-button o-button -has-white-background -has-icon"
            @click="onClick"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 12V0L12 6L0 12Z" fill="black" />
            </svg>
            <span class="c-film-play-button__text">Play</span>
          </button>
          <span class="o-button -has-dark-grey-background">Doc-fiction</span>
          <span class="o-button -has-dark-grey-background">4x50min</span>
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
  &__container {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 3.6rem;
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
    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out,
      background-color 0.3s ease-in-out;
    #{$self}:hover & {
      background-color: rgba($dark-grey, 0.6);
    }
    #{$self}.-is-featured:hover & {
      background-color: rgba($dark-grey, 0.4);
    }
  }
  &__thumbnail {
    z-index: -1;
  }
  &__video {
    z-index: -2;
  }
  &__meta {
    transition: transform 0.5s ease-in-out;
    transform: translateY(85%);
    #{$self}.-is-hovered & {
      transform: translateY(0%);
    }
    #{$self}.-is-featured & {
      transform: translateY(0%);
    }
  }
  &__description {
    margin-top: 2.8rem;
  }
  &__description,
  &__title {
    color: $white;
  }
  &__footer {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    margin-top: 1.8rem;
    & > *:not(:last-child) {
      margin-right: 1rem;
    }
    & > * {
      border-radius: 0.4rem;
      padding: 1rem;
      text-transform: uppercase;
      font-size: 1.2rem;
    }
  }
  &-play-button {
    &__text {
      margin-left: 1rem;
    }
  }
}
</style>
