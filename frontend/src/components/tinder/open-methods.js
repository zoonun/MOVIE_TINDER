import { STATUS } from './status'

export default {
  data: () => ({
    rewindKeys: []
  }),
  methods: {
    /**
     * @param {String} type
     */
    decide(type) {
      if (this.state.touchId || this.status !== STATUS.NORMAL) {
        return
      }
      this.state.start = { x: 0, y: 0 }
      this.state.move = {
        x: type === 'super' || type === 'down' ? 0 : type === 'like' ? 1 : -1,
        y: type === 'super' ? -1 : type === 'down' ? 1 : 0
      }
      this.state.startPoint = 1
      this.shiftCard(type)
    },
    /**
     * @param {Array} list
     */
    rewind(list) {
      const keyName = this.keyName
      for (const item of list) {
        this.rewindKeys.push(item[keyName] + '')
      }
      this.queue.unshift(...list)
    },
    /**
     * @param {String} type
     */
    shiftCard(type) {
      this.state.status = STATUS.LEAVING
      this.state.result = type
      const item = this.queue.shift()
      this.$emit('update:queue', this.queue)
      this.submitDecide(type, item)
    },
    /**
     * @param {Boolean} type
     * @param {String}  key
     * @param {Object}  item
     */
    submitDecide(type, item) {
      this.$emit('submit', { type, key: item[this.keyName], item })
    }
  }
}
