// 基本实现
function isObject(value) {
  if (
    value !== null &&
    (typeof value === 'object' || typeof value === 'function')
  )
    return true
}

function deepClone(originValue) {
  if (originValue instanceof Set) {
    return new Set([...originValue])
  }
  // 判断是否是一个Map类型
  if (originValue instanceof Map) {
    return new Map([...originValue])
  }

  if (typeof originValue === 'symbol') return Symbol(originValue.description)

  // 如果是函数，直接返回函数。直接用原来的函数
  if (typeof originValue === 'function') return originValue

  if (!isObject(originValue)) return originValue

  let newObj = Array.isArray(originValue) ? [] : {}

  for (let key in originValue) {
    newObj[key] = deepClone(originValue[key])
  }

  // 对Symbol的key进行特殊的处理
  const symbolKeys = Object.getOwnPropertySymbols(originValue)
  for (const sKey of symbolKeys) {
    newObject[sKey] = deepClone(originValue[sKey])
  }

  return newObj
}

const s1 = Symbol('aaa')
const s2 = Symbol('bbb')

const obj = {
  name: 'qhy',
  age: 18,
  skills: {
    item: 'coding'
  },
  hobby: ['music', 'etools', 'coding'],
  foo: function () {
    console.log(666)
  },
  // Symbol作为key，不能拷贝  因为遍历不到Symbol
  [s1]: 'abc',
  s2: s2,
  set: new Set(['aaa', 'bbb', 'ccc']),
  map: new Map([
    ['aaa', 'abc'],
    ['bbb', 'cba']
  ])
}

const newObj = deepClone(obj)
console.log(newObj)
