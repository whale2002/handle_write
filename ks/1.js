// setTimeout(() => {
//   console.log(1)
// }, 0)

// console.log(2)

// new Promise((resolve) => {
//   console.log(3)
// }).then(() => {
//   console.log(4)
// })

// console.log(5)

// var name = '123'

// var obj = {
//   name: '456',

//   getName: function () {
//     function printName() {
//       console.log(this.name)
//     }

//     printName()
//   }
// }

// obj.getName()

// function Foo() {
//   this.a = 1
//   return {
//     a: 2,
//     b: 3
//   }
// }

// Foo.prototype.a = 6

// Foo.prototype.b = 7

// Foo.prototype.c = 8

// var o = new Foo()

// console.log(o.a)

// console.log(o.b)

// console.log(o.c)

// const originData = [
//   {
//     field: 'shandong',
//     displayName: '山东',
//     category: 2,
//     children: [
//       {
//         field: 'weihai',
//         displayName: '威海',
//         category: 2
//       },
//       {
//         field: 'qingdao',
//         displayName: '青岛',
//         category: 2
//       }
//     ]
//   }
// ]
// // 示例 key： [shandong, qingdao];
// // 要求找出传入key最后一层的元数据（层数不确定）
// const filterDataFromCascader = (originData, key) => {
//   let origin = originData
//   let index = 0

//   while (index < key.length) {
//     let item = key[index++]
//     origin = findData(origin, item)
//   }

//   return origin
// }

// function findData(origin, key) {
//   if (!Array.isArray(origin)) origin = origin.children

//   for (let item of origin) {
//     if (item.field === key) return item
//   }
// }

// console.log(filterDataFromCascader(originData, ['shandong', 'qingdao']))

Function.prototype.a = () => alert(1)
Object.prototype.b = () => alert(2)

function A() {}
var a = new A()
a.a()
a.b()
