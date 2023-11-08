function Person(name, age) {
  this.name = name
  this.age = age
}

Person.prototype.running = function() {
  console.log(this.name + 'is running')
}

let p1 = new Person('wjw', 20)

console.log(p1)
console.log(p1.valueOf())  //返回指定对象的原始值
console.log(p1.toString())