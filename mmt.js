// 传入的对象当原型
function create(obj) {
  function F() {}
  F.prototype = obj
  return new F()
}

// 沿着对象的原型链，看能不能找到函数的prototype
function myInstanceOf(obj, Fn) {
  let proto = Object.getPrototypeOf(obj)
  let prototype = Fn.prototype

  while (true) {
    if (!proto) return false
    if (proto === prototype) return true

    // 不断更新proto
    proto = Object.getPrototypeOf(proto)
  }
}

const _new = function (fn, ...args) {
  // 补全代码
  let obj = {}
  obj.__proto__ = fn.prototype
  fn.apply(obj, args)
  return obj
}

function debounce(fn, dealy) {
  let timer = null

  return (...args) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, dealy)
  }
}

function throttle(fn, delay) {
  let timer = null

  return (...args) => {
    if (timer) return
    timer = setTimeout(() => {
      fn.apply(this, args)
      clearTimeout(timer)
    }, delay)
  }
}

// 顺时针打印二维数组
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  if (matrix.length === 0) return []
  let res = []

  let a = 0,
    b = matrix[0].length - 1,
    c = matrix.length - 1,
    d = 0

  while (true) {
    for (let i = d; i <= b; i++) {
      res.push(matrix[a][i])
      console.log(matrix[a][i])
    }
    a++
    if (a > c) break
    for (let i = a; i <= c; i++) {
      res.push(matrix[i][b])
      console.log(matrix[i][b])
    }
    b--
    if (b < d) break
    for (let i = b; i >= d; i--) {
      res.push(matrix[c][i])
      console.log(matrix[c][i])
    }
    c--
    if (c < a) break
    for (let i = c; i >= a; i--) {
      res.push(matrix[i][d])
      console.log(matrix[i][d])
    }
    d++
    if (d > b) break
  }

  return res
}

function printMatrix(arr) {
  let m = arr.length,
    n = arr[0].length
  let res = []

  // 左上角，从0 到 n - 1 列进行打印
  for (let k = 0; k < n; k++) {
    for (let i = 0, j = k; i < m && j >= 0; i++, j--) {
      res.push(arr[i][j])
    }
  }

  // 右下角，从1 到 n - 1 行进行打印
  for (let k = 1; k < m; k++) {
    for (let i = k, j = n - 1; i < m && j >= 0; i++, j--) {
      res.push(arr[i][j])
    }
  }
  return res
}

// console.log(
//   printMatrix([
//     [1, 2, 3, 4],
//     [5, 6, 7, 8],
//     [9, 10, 11, 12]
//   ])
// )

// 自己实现
function print(arr) {
  let m = arr.length,
    n = arr[0].length
  let res = []

  // k纵坐标
  for (let k = 0; k < n; k++) {
    for (let i = 0, j = k; i < m && j >= 0; i++, j--) {
      res.push(arr[i][j])
    }
  }

  // k横坐标
  for (let k = 1; k < m; k++) {
    for (let i = k, j = n - 1; i < m && j >= 0; i++, j--) {
      res.push(arr[i][j])
    }
  }

  return res
}

// print([
//   [1, 2, 3, 4],
//   [5, 6, 7, 8],
//   [9, 10, 11, 12]
// ])

