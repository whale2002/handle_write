function wait(ms) {
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log('timing')
      resolve('key')
    }, ms)
  )
}

function* generatorFunction() {
  console.log('Start')
  const temp = yield wait(1000)
  console.log('End', temp)
}

function co(generatorFunction) {
  // 执行生成器函数会返回一个生成器
  const generator = generatorFunction()
  const result = generator.next() // 每次调用生成器的 next 方法，都会返回一个对象，包含 value 和 done 两个属性

  function handler(result) {
    if (result.done) {
      return Promise.resolve(result.value)
    }
    // result.value 可能是一个 promise，也可能是一个具体的值
    Promise.resolve(result.value)
      .then((res) => {
        return handler(generator.next(res))
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  }

  handler(result)
}

co(generatorFunction)
