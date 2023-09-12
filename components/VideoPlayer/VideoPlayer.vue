<script setup>
// TODO: handle fullscreen
// import { useFullscreen } from '@vueuse/core'
// const { isFullscreen, enter, exit, toggle } = useFullscreen()

const currentFilm = useState('currentFilm')
const isVideoPlayerOpen = useState('isVideoPlayerOpen', () => false)
const isCreditsOpen = ref(false)

// Template refs
const $video = ref(null)
const $timeline = ref(null)

const isPlaying = ref(false)
const isMuted = ref(false)
const isFullscreen = ref(false)

const videoCurrentTime = ref(0)
const videoFormatedCurrentTime = ref(formatTime(videoCurrentTime.value))
const videoDuration = ref(null)
const videoFormatedDuration = ref(formatTime(videoDuration.value))

let raf = null

function onCloseClick() {
  isVideoPlayerOpen.value = false
}

function onToggleCreditsClick() {
  isCreditsOpen.value = !isCreditsOpen.value
}

function onTogglePlayClick() {
  isPlaying.value = !isPlaying.value
  raf = window.requestAnimationFrame(onUpdate)
}

function onMuteClick() {
  isMuted.value = !isMuted.value
}

function onFullscreenClick() {
  isFullscreen.value = !isFullscreen.value
}

function onUpdate() {
  videoCurrentTime.value = $video?.value?.currentTime
  raf = window.requestAnimationFrame(onUpdate)
}

function onVideoTimeUpdate() {
  videoFormatedCurrentTime.value = formatTime($video?.value?.currentTime)
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
  const timelineLeft = $timeline.value.getBoundingClientRect().left
  const timelineWidth = $timeline.value.getBoundingClientRect().width
  const userXRelativeToTimeline = userX - timelineLeft

  const seekTime = (userXRelativeToTimeline / timelineWidth) * videoDuration.value

  $video.value.currentTime = seekTime
}

function onVideoEnded() {
  isPlaying.value = false
}

function onVideoLoadedData() {
  videoDuration.value = $video.value.duration
  videoFormatedDuration.value = formatTime(videoDuration.value)
}

watch(
  () => isPlaying.value,
  (isPlaying) => {
    if (isPlaying) {
      $video.value.play()
    } else {
      $video.value.pause()
    }
  }
)

watch(
  () => isMuted.value,
  (value) => {
    $video.value.muted = value
  }
)

onMounted(() => {
  onTogglePlayClick()
}),

onBeforeUnmount(() => {
  window.cancelAnimationFrame(raf)
  $video.value = null
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
      v-show="isCreditsOpen"
      :data="currentFilm"
    />
    <button
      class="c-video-player-credits-button o-button -has-dark-grey-background"
      @click="onToggleCreditsClick"
    >
      Credits
    </button>
    <button
      v-show="!isCreditsOpen"
      class="c-video-player-close-button o-button -has-white-outline"
      @click="onCloseClick"
    >
      Close
    </button>
    <div class="c-video-player__thumbnail"></div>
    <video
      ref="$video"
      :src="currentFilm?.videoUrl"
      class="c-video-player__video"
      playsinline
      @loadeddata="onVideoLoadedData"
      @timeupdate="onVideoTimeUpdate"
      @ended="onVideoEnded"
    ></video>
    <footer class="c-video-player-controls">
      <div class="c-video-player-controls__buttons">
        <button class="o-button -has-dark-grey-background" @click="onTogglePlayClick">
          <span v-html="isPlaying ? 'Pause' : 'Play'"></span>
        </button>
        <button :class="['o-button -has-dark-grey-background']" @click="onMuteClick">
          <span v-html="isMuted ? 'Unmute' : 'Mute'"></span>
        </button>
        <button :class="['o-button -has-dark-grey-background']" @click="onFullscreenClick">
          <span v-html="isFullscreen ? 'Exit' : 'Fullscreen'"></span>
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
          ref="$timeline"
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
</template>

<style lang="scss" scoped>
.c-video-player {
  pointer-events: none;
  height: 100vh;
  width: 100%;
  position: fixed;
  background-color: $black;
  z-index: 11;
  top: 0;
  left: 0;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  &.-is-open {
    opacity: 1;
    visibility: visible;
    pointer-events: all;
  }
  &-credits-button,
  &-close-button {
    position: absolute;
    top: 2.4rem;
    z-index: 10;
  }
  &-credits-button {
    left: 2.4rem;
  }
  &-close-button {
    right: 2.4rem;
  }
  &__thumbnail,
  &__video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    height: 100%;
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
    &__buttons {
      & > *:not(:last-child) {
        margin-right: 1.2rem;
      }
    }
    &__time {
      flex: auto;
      margin-left: 1.2rem;
      position: relative;
    }
    &__duration {
      font-size: 1.2rem;
      color: $white;
      margin-bottom: 2.1rem;
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
