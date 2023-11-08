function _completeDeepClone(target, map = new WeakMap()) {
  if (typeof target !== 'object' || target === null) return target
  if (target instanceof Date) return new Date(target)
  if (target instanceof RegExp) return new RegExp(target)

  if (map.has(target)) return map.get(target)
  let newTarget = new target.constructor()
  map.set(target, newTarget)

  for (let key in target) {
    newTarget[key] = _completeDeepClone(target[key], map)
  }

  return newTarget
}

const o1 = {
  name: 'g',
  age: 18,
  o: { name: 'o' },
  a: [1, 2],
  r: new RegExp(),
  d: new Date()
}
o1.self = o1

const o2 = _completeDeepClone(o1)
o1.name = 'z'
o1.age = 1

const judge =
  o1.name !== o2.name &&
  o1.age !== o2.age &&
  o1.o !== o2.o &&
  o1.a !== o2.a &&
  o1.r !== o2.r &&
  o1.d !== o2.d &&
  o1.self.self.self.self.self.self.self.self.self === o1.self &&
  o1.self !== o2.self

console.log(judge)

// let o1 = {
//   name: 'g',
//   age: 18,
//   fn: function () {},
//   a: [1, 2],
//   o: { name: 'o' }
// }
// o1.self = o1

// const o2 = deepClone(o1)

// o1.name = 'z'
// o2.a.push(999)

// console.log(o1)
// console.log(o2)
