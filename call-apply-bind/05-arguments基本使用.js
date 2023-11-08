// arguments 是一个对应于传递给函数的参数的类数组对象
// 类数组，本质上是一个对象

// arraay-like 意味着它不是一个数组类型，而是一个对象类型
// 但是它却拥有数组的一些特性，比如说length,比如可以通过 index 索引来访问 
// 但是它却没有数组的一些方法，比如forEach, map等等

function foo(num1, num2, num3) {
  console.log(arguments) //到控制台观察一下这是什么
  // 常见的对arguments的操作是三个
  //1. 获取参数的长度
  console.log(arguments.length)
  //2. 根据索引获取某一个参数
  console.log(arguments[2])
  //3. callee 获取当前arguments所在的函数
  console.log(arguments.callee)
  // arguments.callee() 会发生无限递归
}

foo(1, 2, 3, 4, 5)