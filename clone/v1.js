const s1 = Symbol()
const s2 = Symbol()

const obj = {
  name: 'qhy',
  age: 18,
  skills: {
    item: 'coding'
  },
  foo: function () {
    console.log(666)
  },
  [s1]: 'abc'
}

// 不能拷贝函数和Symbol, 不支持循环引用
const obj2 = JSON.parse(JSON.stringify(obj))

obj.skills.item = 'programing'
console.log(obj)
console.log(obj2)
