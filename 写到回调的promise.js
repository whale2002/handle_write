// 一个不能链式回调的promise

class promise {
  // 构造函数
  constructor(executor) {
    this.state = 'pending'
    this.value = undefined
    this.reason = undefined
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    let resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled'
        this.value = value
        this.onFulfilledCallbacks.forEach((fn) => fn())
      }
    }
    let reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected'
        this.reason = reason
        this.onRejectedCallbacks.forEach((fn) => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    let promise2 = new promise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        onFulfilled(this.value)
      }
      if (this.state === 'rejected') {
        onRejected(this.reason)
      }
      // --------------- 至此， 可以解决同步问题

      if (this.state === 'pending') {
        this.onFulfilledCallbacks.push(() => {
          onFulfilled(this.value)
        })
        this.onRejectedCallbacks.push(() => {
          onRejected(this.reason)
        })
      }
    })

    return promise2
  }
}

let p = new promise((resolve, reject) => {
  resolve(123)
})

p.then(
  () => {
    console.log('fulfilled')
  },
  () => {
    console.log('rejected')
  }
)
