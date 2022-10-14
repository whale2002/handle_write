let obj = {
  name: 'chin',
  age: 18,
  info: {
    major: 'cs'
  },
  hobby: ['music', 'etools', 'coding'],
  foo: function () {
    console.log(666)
  }
}
obj.self = obj

let newObj = { ...obj }
let newObj2 = Object.assign({}, obj)

// 浅拷贝 1. 拓展运算符 2. Object.assign
// 深拷贝 1. JSON.parse(JSON.stringify())  2. 实现 deepClone 函数

// let newObj3 = JSON.parse(JSON.stringify(obj))

function deepClone(target, cache = new WeakMap()) {
  // 基本数据类型, 函数直接返回
  if (
    typeof target !== 'object' ||
    typeof target === null
  )
    return target

  if (cache.has(target)) return cache.get(target)
  let obj = new target.constructor()
  cache.set(target, obj)

  for (let key in target) {
    obj[key] = deepClone(target[key], cache)
  }

  return obj
}

let newObj4 = deepClone(obj)

obj.name = 'qhy'
obj.info.major = 'cspro'

console.log(newObj4)
