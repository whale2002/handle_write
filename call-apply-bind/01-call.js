// 给所有的函数添加一个hycall方法
Function.prototype.hycall = function(thisArg, ...args) {
  // 在这里执行调用的函数
  // 问题：得知道是哪个函数
  var fn = this
  thisArg = (thisArg == null || thisArg == undefined) ? window : Object(thisArg)

  thisArg.fn = fn
  var result = thisArg.fn(...args)
  delete thisArg.fn

  return result
}

function foo() {
  console.log('foo exe', this);
}

function sum(num1, num2) {
  console.log('sum函数被执行', this, num1, num2);
  return num1 + num2
}

// foo.call() 
// foo.hycall()
// var ret = sum.hycall({},10, 20)
// console.log(ret);

