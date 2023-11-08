function red() {
  console.log('red')
}

function green() {
  console.log('green')
}

function yellow() {
  console.log('yellow')
}

const task = (timer, light) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (light === 'red') {
        red()
      } else if (light === 'green') {
        green()
      } else if (light === 'yellow') {
        yellow()
      }
      resolve()
    }, timer)
  })
}

const taskRunner = async () => {
  while (1) {
    await task(3000, 'red')
    await task(1000, 'green')
    await task(2000, 'yellow')
  }
}

taskRunner()
