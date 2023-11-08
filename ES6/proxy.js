const obj = {
  name: 'chin',
  age: 18
}

let objProxy = new Proxy(obj, {})

console.log(objProxy.name)
console.log(objProxy.age)

objProxy.name = 'lisi'
objProxy.age = 20

console.log(obj.name)
console.log(obj.age)
