// ES6 以后不推荐使用 arguments
// arguments 浏览器中没有，node中有

// 箭头函数没有 argumnets，向上层作用域寻找
// var foo = () => {
//   console.log(arguments);
// }

// foo()

// function foo() {
//   var bar = () => {
//     console.log(arguments)
//   }
//   return bar
// }

// var fn = foo(123)
// fn()


// 没有arguments怎么办？ 不慌！ 剩余参数来帮忙！！
var foo = (num1, num2, ...arg) => {

}

foo(10, 20, 30, 40, 50)