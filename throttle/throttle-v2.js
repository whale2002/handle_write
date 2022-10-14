function throttle(fn, interval, options = { leading: true, trailing: false }) {
  const { leading, trailing } = options
  let lastTime = 0
  function _throttle(...args) {
    const nowTime = new Date().getTime()
    if (!leading && lastTime === 0) lastTime = nowTime
    const remainTime = interval - (nowTime - lastTime)

    if (remainTime <= 0) {
      fn.apply(this, args)
      lastTime = nowTime
    }
  }

  return _throttle
}
