class TRAFFIC {
  constructor() {
    this.taskQueue = []

    setTimeout(() => {
      this.start()
    }, 0)
  }

  async start() {
    for (let i = 0; i < this.taskQueue.length; i++) {
      const task = this.taskQueue[i]
      await task()
    }
  }

  light(color) {
    function task() {
      console.log(color)
      return Promise.resolve()
    }

    this.taskQueue.push(task)

    return this
  }

  sleep(delay) {
    function task() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, delay)
      })
    }

    this.taskQueue.push(task)

    return this
  }
}

const light = new TRAFFIC()
light.light('yellow').sleep(3000).light('red').sleep(5000).light('green')
