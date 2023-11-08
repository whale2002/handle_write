function Fun() {
  getName = function () {
    console.log(1)
  }
  return this
}

var getName

function getName() {
  console.log(5)
}

Fun.getName = function () {
  console.log(2)
}

Fun.prototype.getName = function () {
  console.log(3)
}

getName = function () {
  console.log(4)
}

getName()          // 4
Fun.getName()      // 2
Fun().getName()    // 1
getName()          // 1
new Fun.getName()  // 2
new Fun().getName() // 3
new new Fun().getName() // 3
