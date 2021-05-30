import { STATUS } from './status'

const difference = (array, exclude) => {
  const result = []
  for (let i = 0; i < array.length; i++) {
    if (exclude.indexOf(array[i]) > -1) {
      break
    }
    result.push(array[i])
  }
  return result
}

export default {
  data: () => ({
    leavingKeys: [],
    onceRewindCount: 0
  }),
  methods: {
    /**
     * @param {Array} list
     * @param {Array} old
     */
    diff(list, old) {
      // rewind
      const keyName = this.keyName
      const add = difference(list, old)
      let onceRewindCount = 0
      if (add.length) {
        for (let i = 0; i < add.length; i++) {
          const item = this.queue[i]
          if (item[keyName] && add[i] === item[keyName]) {
            onceRewindCount++
            const id = item[keyName]
            const newVueTinderkey = id + Math.random()
            if (
              this.leavingKeys.indexOf(item.$vtKey) > -1 ||
              this.leavingKeys.indexOf(id) > -1 ||
              this.rewindKeys.indexOf(item.$vtKey) > -1 ||
              this.rewindKeys.indexOf(id) > -1
            ) {
              item.$vtKey = newVueTinderkey
              const rewindIndex = Math.max(
                this.rewindKeys.indexOf(item.$vtKey),
                this.rewindKeys.indexOf(id)
              )
              if (rewindIndex > -1) {
                this.rewindKeys[rewindIndex] = newVueTinderkey
                this.state.status = STATUS.REWINDING
              }
            }
          } else {
            break
          }
        }
      }
      this.onceRewindCount = onceRewindCount

      const remove = difference(old, list)
      if (remove.length) {
        this.leavingKeys.push(this.list[0].$vtKey || this.list[0][keyName])
        for (let i = this.max + 1; i < this.max + 1 + remove.length; i++) {
          const item = this.list[i]
          if (item) {
            if (
              this.leavingKeys.indexOf(item[keyName]) > -1 ||
              this.hidingKeys.indexOf(item[keyName]) > -1
            ) {
              item.$vtKey = item[keyName] + Math.random()
            }
          }
        }
      }

      this.list = this.queue.slice(0)
    }
  }
}
