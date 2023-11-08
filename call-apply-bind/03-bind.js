Function.prototype.hybind = function(thisArg, ...argArray) {
  //获取到函数
  var fn = this;
  //绑定this
  thisArg = (thisArg !== null && thisArg !== undefined) ? Object(thisArg) : window

  function proxyFn(...args) {
    thisArg.fn = fn
    var finalArgs = [...argArray, ...args]
    var result = thisArg.fn(...finalArgs)
    return result
    delete thisArg.fn
  }

  return proxyFn;
}

function foo() {
  console.log('foo exe', this);
  return 20
}
function sum(num1, num2, num3, num4) {
  console.log(num1, num2, num3, num4)
}

//系统调用
// var bar = foo.bind('abc')
// bar()

// var newSum = sum.bind('aaa', 10, 20, 30, 40)
// newSum()
// var newSum = sum.bind('aaa')
// newSum(10, 20, 30, 40)

// var newSum = sum.bind('aaa', 10, 20)
// newSum(30, 40)

// var bar = foo.hybind('abc')
// console.log(bar())

var bar = sum.bind('abc')
bar(10, 20, 30, 40)