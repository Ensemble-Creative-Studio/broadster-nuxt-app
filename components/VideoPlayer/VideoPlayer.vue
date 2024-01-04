<script setup>
import { useFullscreen } from '@vueuse/core'

const currentFilm = useState('currentFilm')
const isVideoPlayerOpen = useState('isVideoPlayerOpen', () => false)
const isVideoCreditsOpen = useState('isVideoCreditsOpen', () => false)

const $$base = shallowRef(null)
const $$video = shallowRef(null)
const $$timeline = shallowRef(null)

const isPlaying = ref(false)
const isMuted = ref(false)
const isFullscreen = ref(false)

const videoCurrentTime = ref(0)
const videoFormatedCurrentTime = ref(formatTime(videoCurrentTime.value))
const videoDuration = ref(null)
const videoFormatedDuration = ref(formatTime(videoDuration.value))

const lenis = inject('lenisCtx')

const { toggle, exit } = useFullscreen($$base.value)

let raf = null

function onCloseClick() {
  isVideoPlayerOpen.value = false
}

function onToggleCreditsClick() {
  isVideoCreditsOpen.value = !isVideoCreditsOpen.value
}

function onTogglePlayClick() {
  isPlaying.value = !isPlaying.value
  raf = window.requestAnimationFrame(onUpdate)
}

function onMuteClick() {
  isMuted.value = !isMuted.value
}

function onFullscreenClick() {
  toggle()
  isFullscreen.value = !isFullscreen.value
}

function onUpdate() {
  videoCurrentTime.value = $$video?.value?.currentTime
  raf = window.requestAnimationFrame(onUpdate)
}

function onVideoTimeUpdate() {
  videoFormatedCurrentTime.value = formatTime($$video?.value?.currentTime)
}

function formatTime(time) {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  const formatedSeconds = seconds < 10 ? `0${seconds}` : seconds

  return `${minutes}:${formatedSeconds}`
}

function onTimelineClick(event) {
  seekOnTimeline(event.clientX)
}

function seekOnTimeline(userX) {
  const timelineLeft = $$timeline.value.getBoundingClientRect().left
  const timelineWidth = $$timeline.value.getBoundingClientRect().width
  const userXRelativeToTimeline = userX - timelineLeft

  const seekTime = (userXRelativeToTimeline / timelineWidth) * videoDuration.value

  $$video.value.currentTime = seekTime
}

function onVideoEnded() {
  isPlaying.value = false
}

function onVideoLoadedData() {
  videoDuration.value = $$video.value.duration
  videoFormatedDuration.value = formatTime(videoDuration.value)
}

watch(isPlaying, (isPlaying) => {
  if (isPlaying) {
    $$video.value.play()
  } else {
    $$video.value.pause()
  }
})

watch(isMuted, (value) => {
  $$video.value.muted = value
})

onMounted(() => {
  onTogglePlayClick()
  lenis.value.stop()
})

onBeforeUnmount(() => {
  lenis.value.start()
  window.cancelAnimationFrame(raf)
  raf = null
  $$video.value = null
})
</script>

<template>
  <div
    class="c-video-player"
    :class="{
      '-is-open': isVideoPlayerOpen,
    }"
  >
    <VideoPlayerCredits
      :class="{
        '-is-visible': isVideoCreditsOpen,
      }"
      :data="currentFilm"
    />
    <button
      class="c-video-player-credits-button o-button -has-dark-grey-background"
      :class="{
        '-is-visible': !isFullscreen,
      }"
      @click="onToggleCreditsClick"
    >
      Credits
    </button>
    <button
      :class="{
        '-is-visible': !isVideoCreditsOpen && !isFullscreen,
      }"
      class="c-video-player-close-button o-button -has-white-outline"
      @click="onCloseClick"
    >
      Close
    </button>
    <div ref="$$base">
      <video
        ref="$$video"
        :src="currentFilm?.videoUrl"
        class="c-video-player__video"
        playsinline
        webkit-playsinline
        crossorigin="anonymous"
        @click="onTogglePlayClick"
        @loadeddata="onVideoLoadedData"
        @timeupdate="onVideoTimeUpdate"
        @ended="onVideoEnded"
      ></video>
      <footer
        class="c-video-player-controls"
        :class="{
          '-is-fullscreen': isFullscreen,
        }"
      >
        <div class="c-video-player-controls__buttons">
          <button class="o-button -has-dark-grey-background" @click="onTogglePlayClick">
            <span v-html="isPlaying ? 'Pause' : 'Play'"></span>
          </button>
          <button class="o-button -has-dark-grey-background" @click="onMuteClick">
            <span v-show="isMuted">Unmute</span>
            <span v-show="!isMuted">Mute</span>
          </button>
          <button
            class="c-video-player-controls__fullscreen o-button -has-dark-grey-background"
            @click="onFullscreenClick"
          >
            <span v-show="isFullscreen">Exit</span>
            <span v-show="!isFullscreen">Fullscreen</span>
          </button>
        </div>
        <div class="c-video-player-controls__time">
          <div class="c-video-player-controls__duration">
            <span class="c-video-player-controls__timestamp -is-current">
              {{ videoFormatedCurrentTime }}
            </span>
            <span class="c-video-player-controls__duration -is-total">
              {{ videoFormatedDuration }}
            </span>
          </div>
          <div
            ref="$$timeline"
            class="c-video-player-controls__timeline"
            @click="onTimelineClick"
            @mousedown="onTimelineMousedown"
            @mouseup="onTimelineMouseup"
            @touchstart="onTimelineTouchstart"
          >
            <div class="c-video-player-controls__background"></div>
            <div
              class="c-video-player-controls__current"
              :style="{
                transform: `translate3d(-${100 - (videoCurrentTime / videoDuration) * 100}%, 0, 0)`,
              }"
            ></div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$cubic: cubic-bezier(0.16, 1, 0.3, 1);

.c-video-player {
  height: 100%;
  width: 100%;
  position: fixed;
  background-color: $black;
  z-index: 11;
  top: 0;
  left: 0;
  &-credits-button,
  &-close-button {
    position: absolute;
    top: 2.4rem;
    z-index: 10;
    @include mq($until: tablet) {
      top: 1.2rem;
    }
  }
  &-credits-button {
    left: 2.4rem;
    cursor: pointer;
    transition: opacity 1s 1s $cubic, transform 0.5s $cubic, visibility 1s 1s $cubic;
    will-change: transform;
    opacity: 0;
    visibility: hidden;
    @include mq($until: tablet) {
      left: 1.2rem;
    }
    &:hover {
      transform: scale(1.05);
    }
    &.-is-visible {
      opacity: 1;
      visibility: visible;
    }
  }
  &-close-button {
    right: 2.4rem;
    cursor: pointer;
    transition: opacity 1s 1s $cubic, color 0.5s $cubic, background-color 0.5s $cubic,
      transform 0.5s $cubic, visibility 1s 1s $cubic;
    will-change: transform;
    opacity: 0;
    visibility: hidden;
    @include mq($until: tablet) {
      right: 1.2rem;
    }
    &:hover {
      color: $black;
      background-color: $white;
      transform: scale(1.05);
    }
    &.-is-visible {
      opacity: 1;
      visibility: visible;
    }
  }
  &__video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    height: 100%;
    object-fit: contain;
    cursor: pointer;
  }
  &__thumbnail {
    z-index: -1;
  }
  &__video {
    z-index: -2;
  }
  &-controls {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 2.4rem;
    display: flex;
    align-items: center;
    @include mq($until: medium) {
      padding: 1.2rem;
      flex-wrap: wrap;
    }
    // &.-is-fullscreen {
    //   opacity: 0;
    //   &:hover {
    //     opacity: 1;
    //   }
    // }
    &__buttons {
      @include mq($until: medium) {
        order: 2;
        margin-top: 2.4rem;
        display: flex;
        justify-content: space-between;
        width: 100%;
      }
      & > * {
        cursor: pointer;
      }
      & > *:not(:last-child) {
        margin-right: 1.2rem;
        @include mq($until: medium) {
          margin-right: 0rem;
        }
      }
    }
    &__fullscreen {
      @include mq($until: medium) {
        display: none;
      }
    }
    &__time {
      flex: auto;
      margin-left: 1.2rem;
      position: relative;
      @include mq($until: medium) {
        order: 1;
        flex: 100%;
        margin-left: 0;
      }
    }
    &__duration {
      font-size: 1.2rem;
      color: $white;
      margin-bottom: 2.1rem;
      @include mq($until: medium) {
        margin-bottom: 0rem;
      }
      &.-is-total {
        color: $medium-grey;
        margin-left: 0.6rem;
      }
    }
    &__timeline {
      overflow: hidden;
      width: 100%;
      height: 2rem;
      display: flex;
      align-items: center;
      cursor: pointer;
      position: absolute;
      top: 50%;
      transform: translateY(calc(-50% + 2rem));
      will-change: transform;
    }
    &__background {
      position: absolute;
      left: 0;
      height: 0.1rem;
      background-color: $medium-grey;
      opacity: 0.8;
      width: 100%;
    }

    &__current {
      height: 0.1rem;
      background-color: $white;
      position: absolute;
      left: 0;
      width: 100%;
      transform: scaleX(0);
      transform-origin: left;
    }
  }
}
</style>
