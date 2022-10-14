// key: 数组扁平化
let arr = [1, 2, 3, [4, 5, [6, 7, 8]]]

function flatten(arr) {
  let res = []

  arr.forEach((item) => {
    if (Array.isArray(item)) {
      res = res.concat(flatten(item))
    } else {
      res.push(item)
    }
  })

  return res
}

console.log(flatten(arr))

// ----------------------------

console.log(arr.flat(Infinity))
