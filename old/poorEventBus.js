// key: 丐版发布订阅模式
// 方法: on, off, emit, once
class Mitt {
  constructor() {
    this.eventBus = {}
  }
  on(eventName, handler) {
    if (this.eventBus[eventName]) {
      this.eventBus[eventName].push(handler)
    } else {
      this.eventBus[eventName] = [handler]
    }
  }
  off(eventName, handler) {
    if (!this.eventBus[eventName]) {
      return
    } else {
      let index = this.eventBus[eventName].indexOf(handler)
      this.eventBus[eventName].splice(index, 1)
    }
  }
  emit(eventName) {
    if (this.eventBus[eventName]) {
      this.eventBus[eventName].forEach((fn) => {
        fn()
      })
    }
  }
  once(eventName) {
    if (this.eventBus[eventName]) {
      this.eventBus[eventName].forEach((fn) => {
        fn()
      })
      delete this.eventBus[eventName]
    }
  }
}

const mitter = new Mitt()

const event1 = () => {
  console.log('This is event1')
}
const event2 = () => {
  console.log('This is event2')
}

mitter.on('action', event1)
mitter.on('action', event2)
mitter.emit('action')

mitter.off('action', event2)
console.log('移除 event2')
mitter.emit('action')
