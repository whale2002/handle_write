// 类的声明
class Person {
  // 每个类只能有一个构造函数，多写会报错  没有重载
  constructor(_name) {
    this._name = _name
  }
  set name(newName) {
    console.log('set')
    this._name = newName
  }
  get name() {
    console.log('get')
    return this._name
  }
  study() {
    console.log('qhy && wjw is studying')
  }
  // 类的静态方法
  static createPerson() {
    return new Person(Math.floor(Math.random() * 100))
  }
}
// typeof Person  返回的是 function  因为typeof 返回的就是固定那几个
let p = new Person('wjw')
p.name = 'qhy'
console.log(p.name)

// console.log(Person.prototype)

// 类的表达式
// let Animal = class {}
