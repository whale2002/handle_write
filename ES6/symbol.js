let s = Symbol('key')

let obj = {}

Object.defineProperty(obj, s, {
  configurable: true,
  enumerable: true,   // 不生效
  value: 'wjw'
})

console.log(Object.keys(obj))