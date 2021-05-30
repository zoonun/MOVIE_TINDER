import { STATUS, initStatus } from './status'

export default {
  methods: {
    /**
     * @param {Object} e
     */
    start(e) {
      const state = this.state
      if (
        state.touchId !== null ||
        this.status === STATUS.LEAVING ||
        this.status === STATUS.REVERT ||
        this.status === STATUS.REWINDING
      ) {
        return
      }
      let pageX, pageY
      if (e.type === 'touchstart') {
        pageX = e.changedTouches[0].pageX
        pageY = e.changedTouches[0].pageY
        // if (pageX < ?) {
        //   return
        // }
      } else {
        pageX = e.clientX
        pageY = e.clientY
      }
      const top = this.size.top
      const height = this.size.height
      const centerY = top + height / 2
      const startPoint = pageY > centerY ? -1 : 1

      this.state = {
        status: STATUS.MOVING,
        touchId:
          e.type === 'touchstart' ? e.changedTouches[0].identifier : 'mouse',
        start: {
          x: pageX,
          y: pageY
        },
        move: Object.create(null),
        startPoint,
        result: null
      }
    },
    /**
     * @param {Object} e
     */
    move(e) {
      e.preventDefault()
      const state = this.state
      if (
        state.touchId === null ||
        this.status === STATUS.LEAVING ||
        this.status === STATUS.REVERT ||
        this.status === STATUS.REWINDING ||
        (e.type === 'touchmove' &&
          state.touchId !== e.changedTouches[0].identifier)
      ) {
        return
      }
      let pageX, pageY
      if (e.type === 'touchmove') {
        pageX = e.changedTouches[0].pageX
        pageY = e.changedTouches[0].pageY
      } else {
        pageX = e.clientX
        pageY = e.clientY
      }
      state.move = {
        x: pageX,
        y: pageY
      }
    },
    /**
     * @param {Object} e
     */
    end(e) {
      if (
        e.type === 'touchstart' &&
        this.state.touchId !== e.changedTouches[0].identifier
      ) {
        return
      }
      if (
        this.status === STATUS.LEAVING ||
        this.status === STATUS.REVERT ||
        this.status === STATUS.REWINDING
      ) {
        return
      }
      if (
        Math.abs(this.pointerOpacity) >= 1 ||
        this.superOpacity >= 1 ||
        this.downOpacity >= 1
      ) {
        const result =
          this.superOpacity >= 1
            ? 'super'
            : this.downOpacity >= 1
            ? 'down'
            : this.pointerOpacity > 0
            ? 'like'
            : 'nope'
        this.shiftCard(result)
      } else if (this.status === STATUS.MOVING) {
        this.state = initStatus('reverted')
      }
    }
  }
}
