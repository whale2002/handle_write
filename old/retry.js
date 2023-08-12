let i = 0

const request = function (url) {
  console.log(`第${++i}次请求`)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.8 ? resolve(url + ' ok') : reject(url + ' failed')
    }, 1000)
  })
}

const retry =
  (fn, maxNum) =>
  (...args) => {
    function run() {
      return fn(...args)
        .then((res) => {
          return Promise.resolve(res)
        })
        .catch((e) => {
          maxNum--
          if (maxNum <= 0) {
            return Promise.reject(e)
          } else {
            return run()
          }
        })
    }

    return run()
  }

let request4 = retry(request, 4)
request4('https://www.baidu.com')
  .then((res) => {
    console.log(res)
  })
  .catch((e) => {
    console.log(e)
  })
