/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const length = s.length;
  if (length % 2) return false;

  let res = true;
  const stack = [];

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(" || s[i] === "{" || s[i] === "[") stack.push(s[i]);
    else if (stack.length === 0) {
      return false;
    } else {
      if (
        (s[i] === ")" && stack[stack.length - 1] === "(") ||
        (s[i] === "}" && stack[stack.length - 1] === "{") ||
        (s[i] === "]" && stack[stack.length - 1] === "[")
      )
        stack.pop();
      else {
        return false;
      }
    }
  }

  console.log(res);
  return stack.length === 0;
};

isValid("()");
