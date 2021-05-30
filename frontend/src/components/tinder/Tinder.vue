<template>
  <transition-group
    class="vue-tinder"
    tag="div"
    :css="false"
    @beforeEnter="beforeEnter"
    @leave="leave"
    @touchstart.native="start"
    @touchmove.native="move"
    @touchend.native="end"
    @touchcancel.native="end"
    @mousedown.native="start"
    @mousemove.native="move"
    @mouseup.native="end"
  >
    <template v-for="(item, index) in list">
      <TinderCard
        v-if="index < max + 1"
        :ready="index === max"
        :key="item.$vtKey || item[keyName]"
        :data-id="item.$vtKey || item[keyName]"
        :index="index"
        :state="state"
        :ratio="ratio"
        :rewind="
          rewindKeys.indexOf(item.$vtKey || item[keyName]) > -1 ? index : false
        "
        :tinder-mounted="tinderMounted"
        :scale-step="scaleStep"
        :offset-y="offsetY"
        :offset-unit="offsetUnit"
        @reverted="resetStatus"
      >
        <slot :data="item" :index="index" :status="status"></slot>
        <template v-if="index === 0 && status !== 2">
          <span
            slot="nope"
            class="pointer-wrap nope-pointer-wrap"
            :style="{ opacity: nopeOpacity }"
          >
            <slot name="nope" :opacity="nopeOpacity" />
          </span>
          <span
            slot="like"
            class="pointer-wrap like-pointer-wrap"
            :style="{ opacity: likeOpacity }"
          >
            <slot name="like" :opacity="likeOpacity" />
          </span>
          <span
            v-if="allowSuper"
            slot="super"
            class="pointer-wrap super-pointer-wrap"
            :style="{ opacity: superOpacity }"
          >
            <slot name="super" :opacity="superOpacity" />
          </span>
          <span
            v-if="allowDown"
            slot="down"
            class="pointer-wrap down-pointer-wrap"
            :style="{ opacity: downOpacity }"
          >
            <slot name="down" :opacity="downOpacity" />
          </span>
        </template>
        <span
          v-if="state.status === 4"
          slot="rewind"
          class="pointer-wrap rewind-pointer-wrap"
        >
          <slot name="rewind" />
        </span>
      </TinderCard>
    </template>
  </transition-group>
</template>

<script>
import TinderCard from '@/components/tinder/TinderCard'
import queueHandle from './queue-handle'
import touchEvent from './touch-event'
import transitionEvent from './transition-event'
import openMethods from './open-methods'
import { initStatus } from './status'

let resizeTimer
export default {
  name: 'Tinder',
  mixins: [queueHandle, touchEvent, transitionEvent, openMethods],
  components: {
    TinderCard
  },
  props: {
    allowSuper: {
      type: Boolean,
      default: true
    },
    allowDown: {
      type: Boolean,
      default: false
    },
    queue: {
      type: Array,
      default: () => []
    },
    keyName: {
      type: String,
      default: 'key'
    },
    pointerThreshold: {
      type: Number,
      default: 0.5
    },
    superThreshold: {
      type: Number,
      default: 0.5
    },
    downThreshold: {
      type: Number,
      default: 0.5
    },
    sync: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number,
      default: 3
    },
    scaleStep: {
      type: Number,
      // default: 30
      default: 0.05
    },
    offsetY: {
      type: Number,
      default: 0
    },
    offsetUnit: {
      type: String,
      default: 'px'
    }
  },
  data: () => ({
    size: {
      top: 0,
      width: 0,
      height: 0
    },
    state: initStatus(),
    list: [],
    tinderMounted: false
  }),
  computed: {
    status() {
      return this.state.status
    },
    ratio() {
      if (this.size.width) {
        const { start, move } = this.state
        const x = move.x - start.x || 0
        const ratio = x / (this.size.width * 0.5)
        return ratio
      }
      return 0
    },
    pointerOpacity() {
      return this.ratio / this.pointerThreshold
    },
    disY() {
      if (this.allowSuper || this.allowDown) {
        return this.state.move.y - this.state.start.y
      }
      return 0
    },
    superOpacity() {
      if (!this.allowSuper) {
        return 0
      }
      const ratio = this.disY / (-this.superThreshold * this.size.height)
      const pointerOpacity = Math.abs(this.pointerOpacity)
      return ratio > pointerOpacity ? ratio : 0
    },
    downOpacity() {
      if (!this.allowDown) {
        return 0
      }
      const ratio = this.disY / (this.downThreshold * this.size.height)
      const pointerOpacity = Math.abs(this.pointerOpacity)
      return ratio > pointerOpacity ? ratio : 0
    },
    likeOpacity() {
      if (this.superOpacity || this.downOpacity) {
        return 0
      }
      return this.pointerOpacity
    },
    nopeOpacity() {
      return -this.likeOpacity
    }
  },
  watch: {
    queue(val) {
      const keyName = this.keyName
      const newKeys = val.map(item => item[keyName])
      const oldKeys = this.list.map(item => item[keyName])
      this.diff(newKeys, oldKeys)
    }
  },
  mounted() {
    if (!this.$el.offsetWidth || !this.$el.offsetHeight) {
      console.error('vue-tinder의 너비와 높이를 설정해!');
      return
    }
    this.size = {
      top: this.$el.offsetTop,
      width: this.$el.offsetWidth,
      height: this.$el.offsetHeight
    }
    window.onresize = this.getSize
    this.tinderMounted = true
  },
  created() {
    this.list = this.queue.slice(0)
  },
  destroyed() {
    window.removeEventListener('onresize', this.getSize)
  },
  methods: {
    getSize() {
      clearInterval(resizeTimer)
      resizeTimer = setTimeout(() => {
        this.size = {
          top: this.$el.offsetTop,
          width: this.$el.offsetWidth,
          height: this.$el.offsetHeight
        }
      }, 300)
    },
    resetStatus() {
      this.state = initStatus()
    }
  }
}
</script>

<style scoped>
.vue-tinder {
  position: relative;
  -webkit-tap-highlight-color: transparent;
}
.v-move {
  transition: none !important;
}
.pointer-wrap {
  pointer-events: none;
  transition: opacity 0.2s ease;
}
.tinder-card.nope .nope-pointer-wrap,
.tinder-card.like .like-pointer-wrap,
.tinder-card.super .super-pointer-wrap,
.tinder-card.down .down-pointer-wrap {
  opacity: 1 !important;
}
.tinder-card.nope .rewind-pointer-wrap,
.tinder-card.like .rewind-pointer-wrap,
.tinder-card.super .rewind-pointer-wrap,
.tinder-card.down .rewind-pointer-wrap {
  display: none;
}
</style>
