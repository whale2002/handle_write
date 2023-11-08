// 对属性的操作进行一些限制，例如不允许某个属性被修改、被删除、被遍历出来
// 构造函数和对象字面量是不能做这些限制的

// 属性描述符
// 通过属性描述符 Object.defineProperty 可以精准的对属性进行添加或修改对象的属性

var obj = {
  name: 'why',
  age: 18
}

// Object.defineProperty 会直接  
// 语法  Object.defineProperty(obj, prop, descriptor)
Object.defineProperty(obj, 'height', {
  value: 1.8
})

console.log(obj)   //被隐藏了
console.log(obj.height)
console.log(obj.hasOwnProperty('height'))