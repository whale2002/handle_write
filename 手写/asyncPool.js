async function asyncPool(times, limit = 2) {
  const promises = []
  const pool = new Set()

  for (let i = 0; i < times.length; i++) {
    const time = times[i]
    const promise = new Promise((resolve) => {
      console.log(time)

      setTimeout(() => {
        resolve(time)
      }, time)
    })

    promises.push(promise)
    pool.add(promise)

    const clean = () => pool.delete(promise)
    promise.then(clean, clean)

    if (pool.size >= limit) await Promise.race(pool)
  }

  return Promise.all(promises)
}

asyncPool([1000, 2000, 3000, 4000], 2).then((res) => {
  console.log(res)
})
