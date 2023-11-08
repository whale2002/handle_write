function observe(target) {
  for (let key in target) {
    defineProperty(target, key, target[key])
  }
}

function defineProperty(target, key, value) {
  Object.defineProperty(target, key, {
    get() {
      return value
    },
    set(newValue) {
      value = newValue
      updateView()
    }
  })
}

function updateView() {
  console.log('更新视图')
}
const data = {
  name: 'qhy',
  age: 20
}

observe(data)
data.name = 'chin'
data.age = 18