// 实现add(1)(2)(3)
function add(a, b, c) {
  return a + b + c
}

function curry(fn) {
  let arr = []

  const _fn = (...args) => {
    arr = [...arr, ...args]
    if (arr.length === fn.length) return fn(...arr)
    return _fn
  }

  return _fn
}

const curriedAdd = curry(add)
const curriedAdd2 = curry(add)
const curriedAdd3 = curry(add)
const curriedAdd4 = curry(add)

console.log(curriedAdd(1, 2, 3))
console.log(curriedAdd2(1)(2)(3))
console.log(curriedAdd3(1)(2, 3))
console.log(curriedAdd4(1, 2)(3))
