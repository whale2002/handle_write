function sum(a, b, c, d) {
  return a + b + c + d
}

function curry(fn) {
  let arr = []
  function curried(...args) {
    arr = [...arr, ...args]
    if (arr.length >= fn.length) {
      return fn(...arr)
    }
    return curried
  }

  return curried
}

const curriedFn = curry(sum)
const curriedFn2 = curry(sum)

console.log(curriedFn(1)(2)(3)(4))
console.log(curriedFn2(1)(2)(3, 4))
