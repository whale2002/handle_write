function isObject(obj) {
  return typeof obj === 'object' && obj !== 'null'
}

function deepEqual(obj1, obj2) {
  if (!isObject(obj1) || !isObject(obj2)) {
    return obj1 === obj2
  }

  // 相同的对象
  if (obj1 === obj2) return true

  let keys1 = Object.keys(obj1)
  let keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) return false

  for (let key of keys1) {
    if (!deepEqual(obj1[key], obj2[key])) return false
  }

  return true
}

const obj1 = {
  a: 100,
  b: {
    x: 200,
    y: 200
  }
}

const obj2 = {
  a: 100,
  b: {
    x: 100,
    y: 200
  }
}

console.log(deepEqual(obj1, obj2))
