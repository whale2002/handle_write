const _new = function (fn, ...args) {
  // 补全代码
  let obj = {}
  obj.__proto__ = fn.prototype
  fn.apply(obj, args)
  return obj
}

const Fn = function () {}
const o = _new(Fn)
const result = o.__proto__ === Fn.prototype

console.log(result)
