function asyncFn() {
  return new Promise((resolve, reject) => {
    const isSuccess = Math.random() > 0.5
    setTimeout(() => {
      isSuccess ? resolve() : reject()
    }, Math.random() * 2 * 1000)
  })
}

async function series(fns, timeout) {
  // 你的实现
  let fullfilledNum = 0,
    rejectedNum = 0

  async function run() {
    const length = fns.length

    for (let i = 0; i < length; i++) {
      const task = fns[i]

      try {
        await task()
        fullfilledNum++
      } catch (e) {
        rejectedNum++
      }
    }
  }

  run()

  return {
    fullfilled: fullfilledNum,
    rejected: rejectedNum
  }
}

series([asyncFn, asyncFn, asyncFn, () => {}, asyncFn], 3 * 1000).then(
  console.log
)
// { fullfilled: 4, rejected: 1 }
// { fullfilled: 1, rejected: 1 }
