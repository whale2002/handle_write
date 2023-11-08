function createPromise(val) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(val)
    }, 1000)
  })
}

// ;(async function () {
//   const p1 = createPromise(100)
//   const p2 = createPromise(200)
//   const p3 = createPromise(300)

//   // Promise.all([p1, p2, p3]).then((res) => {
//   //   console.log(res)
//   // })

//   const list = [p1, p2, p3]
//   for await (let res of list) {
//     console.log(res)
//   }
// })()

;(async function () {
  const res1 = await createPromise(100)
  console.log(res1)
  const res2 = await createPromise(200)
  console.log(res2)
  const res3 = await createPromise(300)
  console.log(res3)
})()
