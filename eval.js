// eval('const a = 0')

// // 参数是字符串，返回 undefined
// console.log(eval('const a = 0'))

// console.log(eval('1+1'))

// console.log(eval('(() => 3)()'))

// ;(function () {
//   const a = 0

//   function fnA() {
//     return 10
//   }

//   ;(function inner() {
//     console.log(a) // 0
//     console.log(fnA()) // 10
//     eval('var a = 1; function fnA () { return 11; };')
//     console.log(a) // 1
//     console.log(fnA()) // 11
//   })()
// })()

;(function () {
  eval('const a = 2; let b = 3;')
  // console.log(a); // ReferenceError
  // console.log(b); // ReferenceError
})()

/**
 * 没有作用域隔离的话，var 和 const/let 会冲突报语法错误
 */
;(function () {
  const a = 0
  // eval('var a = 1'); // SyntaxError
})()

/**
 * var 没有块作用域，一样会因为 var 和 const 冲突报语法错误
 */
;(function () {
  const a = 0
  {
    // eval('var a = 1'); // SyntaxError
  }
})()


