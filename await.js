const getCodeRequest = (code) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(code)
    }, 2000)
  })
}

// 这是generator
function* getData() {
  const res1 = yield getCodeRequest('code')
  console.log(res1)
  const res2 = yield 1
  console.log(res2)
  const res3 = yield getCodeRequest('code' + res2)
  console.log(res3)

  return res3
}

function execGenerator(generatorFunction) {
  const generator = generatorFunction

  return new Promise((resolve, reject) => {
    function exec(res) {
      // 需要将这一轮回调参数拿回来
      const result = generator.next(res) // 进度推进一下

      // 拿这一轮的 Promise进行处理
      if (result.done) {
        console.log('最后的res', res)
        resolve(res)
        return // 说明结束了
      }

      // 如果done没有结束，那么等当前Promise执行完，执行下一次任务
      // 对于内层的Promise，我们要进行事件捕捉，一旦reject或者throw即终止
      result.value =
        result.value instanceof Promise
          ? result.value
          : Promise.resolve(result.value)

      result.value
        .then((res) => {
          exec(res)
        })
        .catch((err) => {
          reject(err)
          console.log('我在内层报错')
        })
    }

    exec()
  })
}

execGenerator(getData())
  .then((res) => {
    console.log('async的结果')
    console.log(res)
  })
  .catch((err) => {
    console.log('async的错误')
    console.log(err)
  })
