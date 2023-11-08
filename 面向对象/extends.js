class Person {
  // 每个类只能有一个构造函数，多写会报错  没有重载
  constructor(name) {
    this.name = name
  }
}

class Student extends Person {
  constructor() {
    // 先通过super调用父类的构造函数
    super(...arguments)
  }
}

let stu = new Student('wjw')
console.log(stu.name);
