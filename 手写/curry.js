function getSum(a, b, c, d) {
  return a + b + c + d
}

function curry(fn) {
  const argsLength = fn.length
  let arr = []

  function curried(...args) {
    arr = [...arr, ...args]

    if (arr.length >= argsLength) return fn(...arr)

    else return curried
  }

  return curried
}

const add = curry(getSum)

// console.log(add(1)(2)(3, 4));
console.log(add(1)(2)(3)(4));
