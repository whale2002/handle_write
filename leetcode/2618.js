/**
 * @param {any} obj
 * @param {any} classFunction
 * @return {boolean}
 */

// 先排除特殊情况，再手写 instanceOf
var checkIfInstanceOf = function (obj, classFunction) {
  if (typeof classFunction !== 'function') return false

  if (obj === null || obj === undefined) return false

  while (obj.__proto__ && obj.__proto__ !== classFunction.prototype) {
    obj = obj.__proto__
  }

  return obj.__proto__ === classFunction.prototype
}

checkIfInstanceOf(new Date(), Date) // true
