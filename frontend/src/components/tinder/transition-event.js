import { STATUS } from './status'

export default {
  data: () => ({
    leavedCount: 0,
    hideIndex: 50,
    lastHideIndex: 50,
    hidingKeys: []
  }),
  methods: {
    beforeEnter(el) {
      const beforeIndex = el.dataset.index - 0 + 1
      el.style.opacity = 0
      el.style.transform = this.getTransform(beforeIndex)
      if (this.rewindKeys.indexOf(el.dataset.id) > -1) {
        let x = -1
        x += this.size.width * (x < 0 ? -0.5 : 0.5)
        const ratio = x / (this.size.width * 0.5)
        const rotate = (ratio / (0.8 / 0.5)) * 15 * 1
        el.style.transform = `translate3d(${x}px, 0, 0) rotate(${rotate}deg)`
      }
      el.style.transition = 'all 0s'
    },
    /**
     * @param {element}  el
     * @param {Function} done
     */
    leave(el, done) {
      const state = this.state
      const { start, move, startPoint } = state
      let x = move.x - start.x || 0
      let y = move.y - start.y || 0
      if (state.result === 'super') {
        y -= this.size.width
      } else if (state.result === 'down') {
        y += this.size.width
      } else {
        x += this.size.width * (x < 0 ? -0.5 : 0.5)
        y *= x / (move.x - start.x)
      }
      const ratio = x / (this.size.width * 0.5)
      const rotate = (ratio / (0.8 / 0.5)) * 15 * startPoint
      let duration =
        state.touchId === null ||
        state.result === 'super' ||
        state.result === 'down'
          ? 800
          : 300
      el.style.opacity = 0
      el.style['pointer-events'] = 'none'
      if (this.leavingKeys.indexOf(el.dataset.id) > -1) {
        el.className += ` ${state.result}`
        el.style.transform = `translate3d(${x}px,${y}px,0) rotate(${rotate}deg)`
        el.style.zIndex = 1000000 - this.leavedCount++
      } else {
        this.hidingKeys.push(el.dataset.id)
        duration = 500
        const index =
          Math.min(this.max, this.onceRewindCount) + (el.dataset.index - 0)
        el.style.transform = this.getTransform(index)
        el.style.zIndex = this.getHideIndex(el.dataset.index - 0)
      }
      el.style.transition = `all ${duration}ms ${
        duration === 500 ? 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'ease'
      },z-index 0s`
      el.addEventListener('transitionend', e => {
        if (e.propertyName === 'transform') {
          if (this.lastHideIndex === el.style.zIndex - 0) {
            this.lastHideIndex = 50
            this.hideIndex = 50
          }
          if (
            this.sync &&
            (this.status === STATUS.NORMAL || this.status === STATUS.LEAVING)
          ) {
            this.resetStatus()
          }
          done()
        }
      })
      if (
        !this.sync &&
        el.dataset.index - 0 === 0 &&
        this.status !== STATUS.REWINDING
      ) {
        this.resetStatus()
      }
    },
    /**
     * @param {Number} index
     */
    getHideIndex(index) {
      const max = this.max
      let cur
      if (index === max) {
        if (this.lastHideIndex > this.hideIndex) {
          cur = this.hideIndex
          this.hideIndex += 1 + max
        } else {
          cur = this.hideIndex++
        }
      } else {
        cur = this.hideIndex + max - index
      }
      this.lastHideIndex = cur
      return cur
    },
    getTransform(index) {
      const scale = 1 - this.scaleStep * index
      let translateY = 0
      if (this.offsetY) {
        const inverse = this.offsetY < 0
        const offsetY = Math.abs(this.offsetY)
        let y = index * offsetY
        let offsetScale = ((1 - scale) / 2) * 100
        if (inverse) {
          y *= -1
          offsetScale *= -1
        }
        translateY = `calc(${offsetScale}% + ${y}${this.offsetUnit})`
      }
      return `translate3d(0,${translateY},0) scale3d(${scale},${scale},1)`
    }
  }
}
