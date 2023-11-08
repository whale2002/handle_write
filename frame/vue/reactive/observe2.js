function observe(target) {
  if (typeof target !== 'object' || target === null) return

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
data.nums[1] = 999
