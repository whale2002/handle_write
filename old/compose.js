function double(number) {
  return number * 2
}

function sqare(number) {
  return number * number * number
}

function composeFns(m, n) {
  return (number) => {
    return n(m(number))
  }
}

// const newFn = composeFns(double, sqare)
// console.log(newFn(10))

// key: 不够智能

function compose1(...fns) {
  var length = fns.length

  function compose(...args) {
    var index = 0
    var result = length ? fns[index].apply(this, args) : args
    while (++index < length) {
      result = fns[index].call(this, result)
    }
    return result
  }
  return compose
}

function double(m) {
  return m * 2
}

function square(n) {
  return n ** 2
}

var newFn = compose1(double, sqare)
console.log(newFn(10))

function compose2(...fns) {
  if (fns.length === 0) return (args) => args
  else if (fns.length === 1) return fns[0]

  return fns.reduce(
    (a, b) =>
      (...args) =>
        b(a(...args))
  )
}
var newFn2 = compose2(double, sqare)
console.log(newFn2(10))

// key: bubucuo 写的，使用了reduce函数

function f1(arg) {
  console.log('f1', arg)
  return arg
}
function f2(arg) {
  console.log('f2', arg)
  return arg
}
function f3(arg) {
  console.log('f3', arg)
  return arg
}

function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  )
}
console.log(compose(f1, f2, f3)('omg'))
