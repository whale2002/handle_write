const obj = {
  a: 100,
  b: 200
}

with (obj) {
  console.log(a)
  console.log(b)
}

const compiler = require('vue-template-compiler')

// 插值
const template = `<p>{{message}}</p>`
// h -> vnode
// createElement -> vnode

// 编译
const res = compiler.compile(template)
// with(this){return createElement('p',[createTextVNode(toString(message))])}

console.log(res.render)
