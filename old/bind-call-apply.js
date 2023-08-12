Function.prototype.ICall = function (context, ...args) {
  context = context === null || context === undefined ? window : context
  context._fn = this
  let res = context._fn(...args)
  delete context._fn
  return res
}
Function.prototype.IApply = function (context, args) {
  context = context === null || context === undefined ? window : context
  context._fn = this
  let res = context._fn(...args)
  delete context._fn
  return res
}
Function.prototype.IBind = function (context) {
  context = context === null || context === undefined ? window : context

  return (...args) => {
    context._fn = this
    let res = context._fn(...args)
    delete context._fn
    return res
  }
}

function printName(age) {
  console.log(this.name, age)
}

let name = 'outer window'
let me = {
  name: 'qhy'
}

printName.ICall(me, 18)
printName.ICall(null, 18)
printName.IApply(me, [19])
printName.IApply(null, [19])

const bindPrintName = printName.IBind(me)
bindPrintName(20)

const bindPrintName2 = printName.IBind()
bindPrintName2(20)