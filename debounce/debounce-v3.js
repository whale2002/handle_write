// 取消功能
function debounce(fn, delay, immediate = false) {
  let timer = null
  let isInvoked = false

  function _debounce(...args) {
    if (timer) clearTimeout(timer)

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

  _debounce.cancel = function () {
    if (timer) clearTimeout(timer)
    timer = null
    isInvoked = false
  }

  return _debounce
}
