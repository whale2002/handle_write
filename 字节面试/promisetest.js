let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 1000)
})
let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2)
  }, 2000)
})
let p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3)
  }, 3000)
})

const promiseList = [p1, p2, p3]

Promise.IResolve = function (value) {
  return new Promise((resolve, reject) => {
    resolve(value)
  })
}

Promise.IReject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}

Promise.IAll = function (promiseList) {
  return new Promise((resolve, reject) => {
    let resList = []

    promiseList.forEach((promise) => {
      promise.then(
        (res) => {
          resList.push(res)
          if (resList.length === promiseList.length) resolve(resList)
        },
        (err) => reject(err)
      )
    })
  })
}

Promise.IRace() = function(promiseList) {
  return new Promise((resolve, reject) => {
    promiseList.forEach(promise => {
      promise.then((res) => {
        resolve(res)
      }, (error) => {
        reject(error)
      })
    })
  })
}

Promise.IAllSettled = function(promiseList) {
  return new Promise((resolve, reject) => {
    let res = []
    promiseList.forEach(promise => {
      promise.then(res => {
        res.push({value: res, status: 'fulfilled'})
        if(res.length === promiseList.length) resolve(res)
      }, error => {
        res.push({resson: error, status: 'rejected'})
        if(res.length === promiseList.length) resolve(res)
      })
    })
  })
}

Promise.IAny = function(promiseList) {
  return new Promise((resolve, reject) => {
    let reason = []
    promiseList.forEach(promise => {
      promise.then(res => {
        resolve(res)
      }, error => {
        reason.push(error)
        if(reason.length === promiseList.length) reject(reason)
      })
    })
  })
}