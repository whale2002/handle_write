const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledFns = []
    this.onRejectedFns = []

    const resolve = (value) => {
      // if (this.status === PROMISE_STATUS_PENDING) {
      queueMicrotask(() => {
        if (this.status !== PROMISE_STATUS_PENDING) return
        this.status = PROMISE_STATUS_FULFILLED
        this.value = value
        this.onFulfilledFns.forEach((fn) => {
          fn(this.value)
        })
      })
      // }
    }

    const reject = (reason) => {
      // if (this.status === PROMISE_STATUS_PENDING) {
      queueMicrotask(() => {
        if (this.status !== PROMISE_STATUS_PENDING) return
        this.status = PROMISE_STATUS_REJECTED
        this.reason = reason
        this.onRejectedFns.forEach((fn) => {
          fn(this.reason)
        })
      })
      // }
    }

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) {
    const defaultOnRejected = (err) => {
      throw err
    }
    onRejected = onRejected || defaultOnRejected

    const defaultOnFulfilled = (value) => {
      throw value
    }
    onFulfilled = onFulfilled || defaultOnFulfilled

    return new MyPromise((resolve, reject) => {
      if (this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
        try {
          const result = onFulfilled(this.value)
          resolve(result)
        } catch (err) {
          // 执行过程抛出异常
          reject(err)
        }
      }
      if (this.status === PROMISE_STATUS_REJECTED && onRejected) {
        try {
          const reason = onRejected(this.reason)
          resolve(reason)
        } catch (err) {
          // 执行过程抛出异常
          reject(err)
        }
      }

      if (this.status === PROMISE_STATUS_PENDING) {
        if (onFulfilled)
          this.onFulfilledFns.push(() => {
            try {
              const value = onFulfilled(this.value)
              resolve(value)
            } catch (err) {
              reject(err)
            }
          })

        if (onRejected)
          this.onRejectedFns.push(() => {
            try {
              const reason = onRejected(this.reason)
              resolve(reason)
            } catch (err) {
              reject(err)
            }
          })
      }
    })
  }

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  finally(onFinally) {
    this.then(
      () => {
        onFinally()
      },
      () => {
        onFinally()
      }
    )
  }

  static resolve(value) {
    return new MyPromise((resolve) => resolve(value))
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason))
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const values = []
      promises.forEach((promise) => {
        promise.then(
          (res) => {
            values.push(res)
            if (values.length === promises.length) {
              resolve(values)
            }
          },
          (err) => {
            reject(err)
          }
        )
      })
    })
  }

  static allSettled(promises) {
    return new MyPromise((resolve, reject) => {
      const result = []
      promises.forEach((promise) => {
        promise.then(
          (res) => {
            result.push({ status: PROMISE_STATUS_FULFILLED, value: res })
            if (result.length === promises.length) resolve(result)
          },
          (err) => {
            result.push({ status: PROMISE_STATUS_REJECTED, value: err })
            if (result.length === promises.length) resolve(result)
          }
        )
      })
    })
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise) => {
        promise.then(
          (res) => {
            resolve(res)
          },
          (err) => {
            reject(err)
          }
        )
      })
    })
  }

  static any(promises) {
    return new MyPromise((resolve, reject) => {
      const reasons = []
      promises.forEach((promise) => {
        promise.then(
          (res) => {
            resolve(res)
          },
          (err) => {
            reasons.push(err)
            if (reasons.length === promises.length)
              reject(new AggregateError(reasons))
          }
        )
      })
    })
  }
}

// const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(1111)
//   }, 1000)
// })
// const p2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(2222)
//   }, 2000)
// })
// const p3 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(3333)
//   }, 3000)
// })

// MyPromise.all([p1, p2, p3])
//   .then((res) => {
//     console.log(res)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

// MyPromise.allSettled([p1, p2, p3])
//   .then((res) => {
//     console.log(res)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

// MyPromise.race([p1, p2, p3])
//   .then((res) => {
//     console.log(res)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

// MyPromise.any([p1, p2, p3])
//   .then((res) => {
//     console.log(res)
//   })
//   .catch((err) => {
//     console.log(err.errors)
//   })

// const promise = new MyPromise((resolve, reject) => {
//   // pending
//   console.log('传入的函数被直接调用了')
//   resolve(111)
//   // reject(222)
// })

// MyPromise.resolve('Hello World').then(res => {
//   console.log(res)
// })

// MyPromise.reject('Hello World').catch(reason => {
//   console.log(reason)
// })

// promise
//   .then((res) => {
//     console.log('执行then1', res)
//     return 'aaaaa'
//   })
//   .then((res) => {
//     console.log('执行then2', res)
//   })
//   .catch(err => {
//     console.log('执行catch1', err)
//   }).finally(() => {
//     console.log('I am finally');
//   })

// promise
//   .then((res) => {
//     console.log('执行then1', res)
//   })
//   .catch((err) => {
//     console.log('执行catch1', err)
//   })

// promise
//   .then(
//     (res) => {
//       console.log('执行then1', res)
//       // return 333
//       throw new Error('err message')
//     },
//     (err) => {
//       console.log('执行catch1', err)
//     }
//   )
//   .then(
//     (res) => {
//       console.log('执行then11', res)
//     },
//     (err) => {
//       console.log('执行catch12', err)
//     }
//   )
