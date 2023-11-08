// 简易深拷贝
function deepClone(target) {
  if (typeof target !== 'object' || target === null) return target

  let newTarget

  if (Array.isArray(target)) {
    newTarget = []
  } else {
    newTarget = {}
  }

  for (let key in target) {
    newTarget[key] = deepClone(target[key])
  }

  return newTarget
}

const o1 = {
  name: 'g',
  age: 18,
  fn: function () {},
  a: [1, 2],
  o: { name: 'o' }
}

const o2 = deepClone(o1)

o1.name = 'z'
o2.a.push(999)

console.log(o1)
console.log(o2)
