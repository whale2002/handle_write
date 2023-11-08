function isObject(value) {
  const type = typeof value
  return value != null && (type === 'object' || type === 'function')
}

const reactive = (target) => {
  return new Proxy(target, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver)

      // 执行effect()，触发get，收集一下依赖
      track(target, key)

      if (isObject(res)) {
        // 如果是对象，返回此对象的代理对象
        return reactive(res)
      }

      return res
    },
    set(target, key, value, receiver) {
      Reflect.set(target, key, value, receiver)
      trigger(target, key)
    }
  })
}

let activeEffect = null
const effect = (fn) => {
  const _effect = function () {
    activeEffect = _effect
    fn()
  }
  _effect()
}

const targetMap = new WeakMap()
const track = (target, key) => {
  if (!activeEffect) return

  let depsMap = targetMap.get(target)

  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }

  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }

  if (!dep.has(activeEffect)) {
    dep.add(activeEffect)
  }
}
const trigger = (target, key) => {
  const depsMap = targetMap.get(target)
  if(!depsMap) return

  const deps = depsMap.get(key)
  deps && deps.forEach(fn => fn())
}

const obj = { a: 1 }
const proxyObj = reactive(obj)

effect(() => {
  console.log(proxyObj.a, 'trigger effect')
})

proxyObj.a = 3
