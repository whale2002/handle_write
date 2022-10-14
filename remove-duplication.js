// key: 数组去重：set, map, reduce, filter
let arr = [2, 4, 2, 5, 2, 7]

let res1 = [...new Set(arr)]
let res2 = Array.from(new Set(arr))

let res3 = []
arr.forEach((item) => {
  if (res3.indexOf(item) === -1) {
    res3.push(item)
  }
})

let res4 = []
let map = new Map()

arr.forEach((item) => {
  map.set(item, true)
})

console.log(map.keys())

let res5 = arr.reduce((res, item) => {
  return res.indexOf(item) === -1 ? [...res, item] : res
}, [])

console.log(res5)

let res6 = arr.filter((item, index) => arr.indexOf(item) === index)
console.log(res6)
