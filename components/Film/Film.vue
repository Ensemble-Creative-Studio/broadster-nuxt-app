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

const $$filmMeta = ref(null)
const $$video = ref(null)
const isHovered = ref(false)
const isFeatured = computed(() => props.class.includes('-is-featured'))

const isVideoPlayerOpen = useState('isVideoPlayerOpen')
const isVideoCreditsOpen = useState('isVideoCreditsOpen')
const currentFilm = useState('currentFilm', () => {})

function onMouseOver() {
  if (!isFeatured.value) {
    $$video.value.play()
    isHovered.value = true
  }
}

function onMouseLeave() {
  if (!isFeatured.value) {
    $$video.value.pause()
    $$video.value.currentTime = 0
    isHovered.value = false
  }
}

function onPlayClick() {
  isVideoPlayerOpen.value = true
  currentFilm.value = props.film
}

function onCreditsClick() {
  isVideoPlayerOpen.value = true
  isVideoCreditsOpen.value = true
  currentFilm.value = props.film
}
</script>

<template>
  <div
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
          ref="$$video"
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
        ref="$$filmMeta"
        class="c-film__meta"
        :style="{
          transform:
            isHovered && !isFeatured && $$filmMeta?.clientHeight
              ? `translateY(calc(100% - ${$$filmMeta?.clientHeight}px))`
              : !isHovered && isFeatured
              ? `translateY(0%)`
              : `translateY(100%)`,
        }"
      >
        <div class="c-film__details">
          <h3 class="c-film__title o-thumbnail-title">{{ film.title }}</h3>
          <p
            class="c-film__description"
            v-if="film.shortDescription"
            v-html="film.shortDescription"
          ></p>
        </div>
        <footer class="c-film__footer">
          <button
            class="c-film-play-button o-button -has-white-background -has-icon"
            @click="onPlayClick"
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
          <button
            class="c-film-credits-button o-button -has-white-background"
            @click="onCreditsClick"
          >
            <span class="c-film-credits-button__text">Crédits</span>
          </button>
          <span
            class="c-film-credits__tag o-button -has-dark-grey-background"
            v-for="category in film.categories"
            v-if="film.categories"
          >
            {{ category.title }}
          </span>
          <span class="c-film-credits__tag o-button -has-dark-grey-background" v-if="film.duration">
            {{ film.duration }}
          </span>
        </footer>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$cubic: cubic-bezier(0.16, 1, 0.3, 1);

.c-film {
  border-radius: 0.4rem;
  overflow: hidden;
  user-select: none;
  $self: &;
  &__container {
    position: relative;
    height: 100%;
    width: 100%;
    @include mq($until: small) {
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
    @include mq($until: small) {
      aspect-ratio: 3 / 2;
    }
    @include mq($until: mobile) {
      height: auto;
    }
    #{$self}.-is-featured & {
      transform: scale(0.5);
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
    #{$self}:not(.-is-featured) & {
      @include mq($until: medium) {
        display: none;
      }
    }
    #{$self}.-is-featured & {
      @include mq($until: small) {
        display: none;
      }
    }
    #{$self}:hover & {
      background-color: rgba($dark-grey, 0.6);
    }
    #{$self}.-is-featured:hover & {
      background-color: rgba($dark-grey, 0.4);
    }
  }
  &__thumbnail {
    @include mq($until: small) {
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
    bottom: 3rem;
    left: 3.6rem;
    width: calc(100% - 6.4rem);
    @include mq($until: mobile) {
      height: 100%;
    }
    #{$self}.-is-featured & {
      opacity: 0;
			@include mq($until: small) {
				position: relative;
				bottom: 0;
				left: 0;
				display: flex;
				flex-direction: column;
				width: 100%;
			}
    }
    #{$self}:not(.-is-featured) & {
      transition: transform 0.75s cubic-bezier(0.215, 0.61, 0.355, 1);
      transform: translateY(100%);
      @include mq($until: medium) {
        transform: translateY(0%) !important;
        flex: 1;
				position: relative;
				bottom: 0;
				left: 0;
				display: flex;
				flex-direction: column;
				width: 100%;
      }
    }
  }
  &__details {
		#{$self}.-is-featured & {
			@include mq($until: small) {
				order: 2;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				height: 100%;
				}
		}
		#{$self}:not(.-is-featured) & {
			@include mq($until: medium) {
				order: 2;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				height: 100%;
				}
		}
  }
  &__title,
  &__description {
    color: $white;
		#{$self}.-is-featured & {
			@include mq($until: small) {
				color: $black;
			}
		}
		#{$self}:not(.-is-featured) & {
			@include mq($until: medium) {
				color: $black;
			}
		}
  }
  &__title {
    max-width: 35ch;
		#{$self}.-is-featured & {
			@include mq($until: small) {
				margin-top: 1rem;
				max-width: 100%;
			}
		}
    #{$self}:not(.-is-featured) & {
			@include mq($until: medium) {
				margin-top: 1rem;
				max-width: 100%;
			}
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
    transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out;
    @include mq($until: small) {
      flex: auto;
      display: flex;
      align-items: flex-end;
      max-width: 100%;
    }
    #{$self}:not(.-is-featured) & {
      @include mq($from: medium) {
        transition: transform 0.75s cubic-bezier(0.215, 0.61, 0.355, 1);
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
		#{$self}.-is-featured & {
			margin-top: 0.5rem;
			@include mq($from: small) {
				margin-top: 1.8rem;
			}
		}
    #{$self}:not(.-is-featured) & {
      @include mq($from: medium) {
        transition: transform 0.75s cubic-bezier(0.215, 0.61, 0.355, 1);
        transform: translateY(calc(50%));
      }
    }
    #{$self}:hover:not(.-is-featured) & {
      @include mq($from: medium) {
        transform: translateY(calc(0%));
      }
			@include mq($from: medium) {
				order: 1;
				margin-top: 0;
			}
    }
    & > * {
			#{$self}:not(.-is-featured) & {
				margin-top: 1.8rem;
				@include mq($until: medium) {
					margin-top: 0.5rem;
				}
			}
    }
    & > *:not(:last-child) {
			#{$self}:not(.-is-featured) & {
				margin-right: 0.5rem;
			}
			#{$self}.-is-featured & {
				margin-right: 0.5rem;
				@include mq($until: small) {
					margin-right: 0.5rem;
				}
			}
    }
  }
  &-play-button {
    cursor: pointer;
    transition: 0.5s transform $cubic;
    will-change: transform;
		#{$self}:not(.-is-featured) & {
			@include mq($until: medium) {
				background-color: $black;
				color: $white;
			}
		}
		#{$self}.-is-featured & {
			@include mq($until: small) {
				background-color: $black;
				color: $white;
			}
		}
		@include mq($from: medium) {
			&:hover {
				transform: scale(1.05);
			}
		}
    &__text {
      margin-left: 1rem;
    }
  }
  &-credits {
    &-button {
			cursor: pointer;
			background-color: $black;
			color: $white;
			transition: 0.5s transform $cubic;
			will-change: transform;
			&:hover {
				transform: scale(1.05);
			}
    }
  }
}
</style>
