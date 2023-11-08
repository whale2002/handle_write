function foo(num1, num2) {
  var newArr = []

  // 1. for循环遍历
  // for (let i = 0; i < arguments.length; i++) {
  //   newArr.push(arguments[i]*10)
  // }

  //2. 将 arguments 直接转成数组
  var newArr2 = Array.prototype.slice.call(arguments)
  console.log(newArr2)

  // 3. ES6的语法
  // var newArr4 = Array.from(arguments)
  // 4. 展开操作符
  // var newArr5 = [...arguments]
}

foo(10, 20, 30, 40)

// 补充： Array.prototype.slice.call() 
// var names = ['aaa', 'bbb', 'ccc', 'ddd']

// Array.prototype.hyslice = function(start, end) {
//   var arr = this
//   start = start || 0;
//   end = end || arr.length;

//   var newArr = []
//   for (let i = start; i < end; i++) {  //左开右闭
//     newArr.push(arr[i])
//   }
//   return newArr
// }

// var newArray = Array.prototype.hyslice.call(['aaa', 'bbb', 'ccc'])
// console.log(newArray)