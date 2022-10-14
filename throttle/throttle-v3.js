function throttle(fn, interval, options = { leading: true, trailing: false }) {
  const { leading, trailing } = options
  let lastTime = 0
  let timer = null

  function _throttle(...args) {
    const nowTime = new Date().getTime()
    if (!leading && lastTime === 0) lastTime = nowTime
    const remainTime = interval - (nowTime - lastTime)

    if (remainTime <= 0) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      fn.apply(this, args)
      lastTime = nowTime
      return
    }

    if (trailing && !timer) {
      timer = setTimeout(() => {
        timer = null
        if (leading) lastTime = nowTime
        else lastTime = 0
        fn.apply(this, args)
      }, remainTime)
    }
  }

  _throttle.cancel = function () {
    if (timer) clearTimeout(timer)
    timer = null
    lastTime = 0
  }

  return _throttle
}
