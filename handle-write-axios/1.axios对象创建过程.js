function Axios(config) {
  this.defaults = config
  this.interceptors = {
    request: function () {},
    response: function () {}
  }
}

Axios.prototype.request = function (config) {
  console.log(`请求类型为${config.method}`)
}

Axios.prototype.get = function () {
  return this.request({ method: 'GET' })
}

Axios.prototype.post = function () {
  return this.request({ method: 'POST' })
}

function createInstance(config) {
  // context是对象，不能当函数使用
  const context = new Axios(config)
  // instance是函数，不能当对象使用
  const instance = Axios.prototype.request.bind(context)

  // 添加方法
  Object.keys(Axios.prototype).forEach((key) => {
    instance[key] = Axios.prototype[key].bind(context)
  })
  // 添加属性
  Object.keys(context).forEach((key) => {
    instance[key] = context[key]
  })
  return instance
}

const axios = createInstance({ text: '基本配置' })
console.dir(axios)

axios({ method: 'head' })
axios.get({ method: 'GET' })
axios.post({ method: 'POST' })
