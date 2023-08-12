class TrafficLight {
  constructor() {
    this.tasks = []
  }

  red() {
    const task = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('red');
          resolve()
        }, 3000)
      })
    }

    this.tasks.push(task)

    return this
  }

  green() {
    const task = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('green');
          resolve()
        }, 1000)
      })
    }

    this.tasks.push(task)

    return this
  }

  yellow() {
    const task = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('yellow');
          resolve()
        }, 2000)
      })
    }

    this.tasks.push(task)

    return this
  }

  async loop() {
    while (true) {
      for (let i = 0; i < this.tasks.length; i++) {
        const currentTask = this.tasks[i]
        await currentTask()
      }
    }
  }
}

const light = new TrafficLight()

light.red().green().yellow().loop()
