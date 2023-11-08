// 存放数据的方式

const s = new Set()

;['red', 'blue', 'green', 'green', 'white'].forEach((num) => s.add(num))

console.log(s)

let arr = Array.from(s)
console.log(arr)

console.log(s.keys())
console.log(s.values())
console.log(s.entries())

let ws = new WeakSet()
ws.add()
