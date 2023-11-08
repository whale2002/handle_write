/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function (num1, num2) {
  let length1 = num1.length,
    length2 = num2.length
  let stack1 = [],
    stack2 = [],
    stack = []
  let add = 0

  for (let i = 0; i < length1; i++) stack1.push(num1[i])
  for (let i = 0; i < length2; i++) stack2.push(num2[i])

  while (stack1.length && stack2.length) {
    let num1 = stack1.pop(),
      num2 = stack2.pop()
    let sum = num1 - 0 + (num2 - 0) + add
    add = 0
    if (sum >= 10) {
      add = 1
      sum %= 10
    }
    stack.push(sum)
  }

  let restStack = stack1.length ? stack1 : stack2
  while (restStack.length) {
    let num = restStack.pop() - 0 + add
    add = 0
    if (num >= 10) {
      add = 1
      num %= 10
    }
    stack.push(num)
  }

  if (add) stack.push(add)
  console.log(stack)

  let res = ''
  for (let i = stack.length - 1; i >= 0; i--) {
    res += stack[i]
  }

  return res
}

console.log(addStrings('11', '123'))
