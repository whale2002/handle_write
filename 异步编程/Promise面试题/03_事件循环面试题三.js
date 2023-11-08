Promise.resolve()
  .then(() => {
    console.log(0)
    return Promise.resolve(4) // return thenable的值
    // return 4     // 直接return 一个值，相当于直接resolve
  })
  .then((res) => {
    console.log(res)
  })

Promise.resolve()
  .then(() => {
    console.log(1)
  })
  .then(() => {
    console.log(2)
  })
  .then(() => {
    console.log(3)
  })
  .then(() => {
    console.log(5)
  })
  .then(() => {
    console.log(6)
  })

// return 4: 0 1 4 2 3 5 6

// I do not understand.
// return Promise.resolve(4): 0 1 2 4 3 5 6
