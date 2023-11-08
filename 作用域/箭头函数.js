// var foo = (num1, num2, num3) => {};

// function bar(num1, num2, num3) {}

// //高阶函数
// var nums = [10, 20, 45, 78];
// nums.forEach((item, index, arr) => {});

//箭头函数常见的简写
//简写一： 如果参数只有一个，小括号可以省略
//简写二： 如果函数执行体只有一行代码，那么{}也可以省略
//强调：并且它会默认将这行代码的执行结果作为返回值
//简写三： 如果一个箭头函数，只有一行代码，并且返回一个对象，对象外层加括号


// var name = 'arrow'

// var foo = () => {
//   console.log(this);
// }

// foo()
// var obj = {foo: foo}
// obj.foo()
// foo.call('abc')   //打印的都是window


// application
var obj = {
  data: [],
  getData: function() {
    // 箭头函数之前的解决方案
    // var _this = this
    // setTimeout(function() {
    //   var ret = ['abc', 'cba', 'cab']
    //   _this.data = ret  
    //   //定时器是JS内置的函数，this自动为我们绑定了window
    // })
    setTimeout(() => {
      var ret = ["abc", "cba", "cab"];
      this.data = ret
    }, 2000)
  }
}