class _LazyMan {
  constructor(name) {
    this.taskQueue = []

    this.sayHi(name)

    setTimeout(() => {
      this.run()
    }, 0)
  }

  sayHi(name) {
    function task() {
      console.log(`Hi This is ${name}!`)
      return Promise.resolve()
    }

    this.taskQueue.push(task)
  }

  eat(eatTime) {
    function task() {
      console.log(`Eat ${eatTime}~`)
      return Promise.resolve()
    }

    this.taskQueue.push(task)
    return this
  }

  sleep(delay) {
    function task() {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(`Wake up after ${delay}`)
          resolve()
        }, delay * 1000)
      })
    }

    this.taskQueue.push(task)
    return this
  }

  sleepFirst(delay) {
    function task() {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(`Wake up after ${delay}`)
          resolve()
        }, delay * 1000)
      })
    }

    this.taskQueue.unshift(task)
    return this
  }

  async run() {
    for (let i = 0; i < this.taskQueue.length; i++) {
      await this.taskQueue[i]()
    }
  }
}

function LazyMan(name) {
  return new _LazyMan(name)
}

// 实现一个LazyMan，可以按照以下方式调用:
// LazyMan(“Hank”)输出:
// Hi! This is Hank!

// LazyMan('Hank')

// LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
// Hi! This is Hank!
// //等待10秒..
// Wake up after 10
// Eat dinner~

// LazyMan('hank').sleep(3).eat('dinner')

// LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
// Hi This is Hank!
// Eat dinner~
// Eat supper~

// LazyMan('hank').eat('dinner').eat('supper')

// LazyMan(“Hank”).sleepFirst(5).eat(“supper”)输出
// //等待5秒
// Wake up after 5
// Hi This is Hank!
// Eat supper
// 以此类推。

LazyMan('hank').sleepFirst(5).eat('supper')
