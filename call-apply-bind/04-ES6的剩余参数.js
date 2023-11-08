//rest paramters
function sum(...nums) {
  // nums 是一个数组
  console.log(nums);
}

sum(10)
sum(10, 20)
sum(10, 20, 30)

// 展开运算符 spread
var names = ['abc', 'cba', 'nba']
var newNames = [...names]
