const _shallowClone = (target) => {
  // 补全代码

  // 1
  // return Object.assign({}, target)

  // 2
  // let newObj = {}
  // for (let key in target) {
  //   newObj[key] = target[key]
  // }

  // return newObj

  return {...target}
}

const o1 = {
  name: 'g',
  age: 18,
  fn: function () {},
  a: [1, 2],
  o: { name: 'o' }
}

const o2 = _shallowClone(o1)

o1.name = 'z'

const result =
  o2.name === 'g' && o1.fn === o2.fn && o1.a === o2.a && o1.o === o2.o

console.log(result)
