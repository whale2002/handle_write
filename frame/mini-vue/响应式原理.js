// Test
let obj = {
  age: 20
}

// Object.defineProperty(obj, 'age', {
//   set(newValue) {
//     console.log(233)
//     age = newValue
//   },
//   get() {
//     return age
//   }
// })

let objProxy = new Proxy(obj, {
  get(target, key, receiver) {
    console.log('proxy里面的代理')
    // target 就是原对象
    return Reflect.get(target, key, receiver)
  },
  set(target, key, newValue, receiver) {
    console.log(2333)
    Reflect.set(target, key, newValue, receiver)
  }
})

objProxy.age = 18
console.log(obj.age)
