Promise.IAllSettled = function (promiseList) {
  return new Promise((resolve, reject) => {
    const res = new Array(promiseList.length)
    let counter = 0

    promiseList.forEach((promise, index) => {
      promise.then(
        (res) => {
          res[index] = { value: res, status: 'fulfilled' }
          if (++counter === promiseList.length) resolve(res)
        },
        (error) => {
          res[index] = { resson: error, status: 'rejected' }
          if (++counter === promiseList.length) resolve(res)
        }
      )
    })
  })
}
