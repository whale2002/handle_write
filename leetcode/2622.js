var TimeLimitedCache = function () {
  this.cache = []
}

/**
 * @param {number} key
 * @param {number} value
 * @param {number} time until expiration in ms
 * @return {boolean} if un-expired key already existed
 */
TimeLimitedCache.prototype.set = function (key, value, duration) {
  const now = new Date().getTime()

  if (this.cache[key]) {
    const endTime = this.cache[key].endTime
    // 存在且到期
    if (endTime < now) {
      return false
    } else {
      const timeInfo = {
        value,
        endTime: new Date().getTime() + duration
      }

      this.cache[key] = timeInfo
      return true
    }
  }

  const timeInfo = {
    value,
    endTime: new Date().getTime() + duration
  }

  this.cache[key] = timeInfo
  return false
}

/**
 * @param {number} key
 * @return {number} value associated with key
 */
TimeLimitedCache.prototype.get = function (key) {
  if (this.cache[key]) {
    const now = new Date().getTime()
    const endTime = this.cache[key].endTime
    if (now <= endTime) return this.cache[key].value
  }

  return -1
}

/**
 * @return {number} count of non-expired keys
 */
TimeLimitedCache.prototype.count = function () {
  let n = 0
  const now = new Date().getTime()

  this.cache.forEach((item) => {
    if (item.endTime >= now) n++
  })

  return n
}

/**
 * Your TimeLimitedCache object will be instantiated and called as such:
 * var obj = new TimeLimitedCache()
 * obj.set(1, 42, 1000); // false
 * obj.get(1) // 42
 * obj.count() // 1
 */
