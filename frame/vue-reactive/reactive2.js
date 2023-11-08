// vue2 -> Object.defineProperty
// vue3 -> proxy

// 全局变量，当前需要添加的依赖
let activeReactiveFn = null
// 依赖图谱
const wm = new WeakMap()

// 依赖收集类
class Depend {
  constructor() {
    // 收集依赖的集合，为避免同一依赖被反复添加而多次执行
    this.reactiveFns = new Set()
  }
  addDepend() {
    // 当真正执行依赖的时候(而不是收集依赖的时候执行)，需要进行get，此时就不会再次添加，因为activeReactiveFn为null
    if (activeReactiveFn) {
      this.reactiveFns.add(activeReactiveFn)
    }
  }
  notify() {
    // 数据变化时，依次执行其对应的依赖即可
    this.reactiveFns.forEach((fn) => fn())
  }
}

function wacthFn(fn) {
  activeReactiveFn = fn
  fn()
  // 添加到依赖里面以后，马上变成null
  activeReactiveFn = null
}

// 获取属性对应的依赖
function getDepend(target, key) {
  // 获取map
  let map = wm.get(target)
  if (!map) {
    map = new Map()
    wm.set(target, map)
  }

  // 获取depend
  let depend = map.get(key)
  if (!depend) {
    depend = new Depend()
    map.set(key, depend)
  }

  return depend
}

function reactive(obj) {
  Object.keys(obj).forEach((key) => {
    let value = obj[key]
    Object.defineProperty(obj, key, {
      get: function () {
        const depend = getDepend(obj, key)
        depend.addDepend()
        return value
      },
      set: function (newValue) {
        value = newValue
        const depend = getDepend(obj, key)
        // 当属性被更改时，自动执行依赖函数
        depend.notify()
      }
    })
  })

  return obj
}

const obj = {
  title: 'fe',
  language: 'javascript'
}

const objProxy = reactive(obj)

wacthFn(() => {
  console.log('我是依赖函数1', objProxy.title)
})

wacthFn(() => {
  console.log('我是依赖函数2', objProxy.language)
})

objProxy.title = 'qietuzai'
objProxy.language = 'js'
