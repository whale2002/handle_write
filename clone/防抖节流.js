function throttle(fn, delay) {
  let timer = null

  function _throttle(...args) {
    if (timer) return

    timer = setTimeout(() => {
      fn.apply(this, args)
      clearTimeout(timer)
    }, delay)
  }

  return _throttle
}

function debounce(fn, delay) {
  let timer = null

  function _debounce(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }

  return _debounce
}
