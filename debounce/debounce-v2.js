// 立即执行
function debounce(fn, delay, immediate = false) {
  let timer = null
  let isInvoked = false

  function _debounce(...args) {
    if (timer) clearInterval(timer)

    if (immediate && !isInvoked) {
      fn.apply(this, args)
      isInvoked = true
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args)
        isInvoked = false
      }, delay)
    }
  }

  return _debounce
}
