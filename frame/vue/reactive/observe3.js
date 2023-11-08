const oldArrayProperty = Array.prototype
const arrProto = Object.create(oldArrayProperty)
;['push', 'pop', 'shift', 'unshift', 'splice'].forEach((methodName) => {
  arrProto[methodName] = function () {
    oldArrayProperty[methodName].call(this, ...arguments)
    console.log('数组方法拦截')
  }
})

function observe(target) {
  if (typeof target !== 'object' || target === null) return

  if (Array.isArray(target)) {
    target.__proto__ = arrProto
  }

  for (let key in target) {
    defineProperty(target, key, target[key])
  }
}

function defineProperty(target, key, value) {
  // 深度监听
  observe(value)

  Object.defineProperty(target, key, {
    get() {
      return value
    },
    set(newValue) {
      if (newValue !== value) {
        // 深度监听
        observe(newValue)
        value = newValue
        updateView()
      }
    }
  })
}

function updateView() {
  console.log('更新视图')
}
const data = {
  name: 'qhy',
  age: 20,
  info: {
    major: 'computer'
  },
  nums: [1, 2, 3]
}

observe(data)
data.name = 'chin'
data.age = 18
data.info.major = 'cs'
data.nums.push(5)
