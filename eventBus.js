// key: 发布订阅模式
class EventBus {
  constructor() {
    this.eventBus = {}
  }

  on(eventName, eventCallback, thisArg) {
    let handlers = this.eventBus[eventName]
    if (!handlers) {
      handlers = []
      this.eventBus[eventName] = handlers
    }
    handlers.push({
      eventCallback,
      thisArg
    })
  }

  off(eventName, eventCallback) {
    const handlers = this.eventBus[eventName]
    if (!handlers) return
    const newHandlers = [...handlers]
    for (let i = 0; i < newHandlers.length; i++) {
      const handler = newHandlers[i]
      if (handler.eventCallback === eventCallback) {
        const index = handlers.indexOf(handler)
        handlers.splice(index, 1)
      }
    }
  }

  emit(eventName, ...payload) {
    const handlers = this.eventBus[eventName]
    if (!handlers) return
    handlers.forEach((handler) => {
      handler.eventCallback.apply(handler.thisArg, payload)
    })
  }

  once(eventName, ...payload) {
    const handlers = this.eventBus[eventName]
    if (!handlers) return
    handlers.forEach((handler) => {
      handler.eventCallback.apply(handler.thisArg, payload)
    })

    delete this.eventBus[eventName]
  }
}

const eventBus = new EventBus()

eventBus.on(
  'abc',
  function (payload) {
    console.log('监听abc1', this, payload)
  },
  { name: 'why' }
)

const handleCallback = function (payload) {
  console.log('监听abc2', this, payload)
}
eventBus.on('abc', handleCallback, { name: 'why' })

// 触发
eventBus.emit('abc', 123)

// 移除监听
eventBus.off('abc', handleCallback)

// 再次触发
eventBus.emit('abc', 123)
