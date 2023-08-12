async function multiRequest(arr, maxNum) {
  let i = 0
  // 所有异步任务
  const promises = []
  // 正在执行的异步任务
  const executing = []

  for (const time of arr) {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(time)
      }, time)
    })
    promises.push(promise)

    if (arr.length >= maxNum) {
      // 需要进行并发控制
      const e = promise.then(() => executing.splice(executing.indexOf(e)), 1)
      executing.push(e)
      if (executing.length >= maxNum) {
        await Promise.race(executing)
      }
    }
  }

  return Promise.all(promises)
}

multiRequest([1000, 2000, 3000, 4000], 2).then((res) => {
  console.log(res)
})
