/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function (num1, num2) {
  let i = num1.length - 1,
    j = num2.length - 1
  let res = '',
    curry = 0

  while (i >= 0 || j >= 0) {
    let numA = num1[i] ? num1[i] - 0 : 0
    let numB = num2[j] ? num2[j] - 0 : 0

    let sum = numA + numB + curry
    curry = 0

    while (sum >= 10) {
      curry = 1
      sum %= 10
    }
    res = sum + res
  }

  if (curry) res = curry + res
  

  return res
}

console.log(addStrings('11', '123'))
