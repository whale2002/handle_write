// 防抖返回值
function debounce(fn, delay, immediate = false) {
  let timer = null
  let isInvoked = false

  function _debounce(...args) {
    if (timer) clearTimeout(timer)

    if (immediate && !isInvoked) {
      const res = fn.apply(this, args)
      isInvoked = true
    } else {
      timer = setTimeout(() => {
        const res = fn.apply(this, args)
        isInvoked = false
      }, delay)
    }
  }

  _debounce.cancel = function () {
    if (timer) clearTimeout(timer)
    timer = null
    isInvoked = false
  }

  return _debounce
}
