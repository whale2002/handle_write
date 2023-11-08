//实现apply
Function.prototype.hyapply = function(thisArg, argArray) {
  // 获取函数
  var fn = this

  // 处理绑定的thisArg
  thisArg = (thisArg == null || thisArg == undefined) ? window : Object(thisArg);

  //执行函数
  thisArg.fn = fn
  argArray = argArray ? argArray : []
  var result = thisArg.fn(...argArray)

  //最后处理
  delete thisArg.fn
  return result
}

function sum(num1, num2) {
  console.log('sum被调用', num1, num2)
  return num1 + num2
}

//系统apply
// var ret = sum.apply('abc', [20, 30])
// console.log(ret)

var ret = sum.hyapply('abc', [10, 30])
console.log(ret)

