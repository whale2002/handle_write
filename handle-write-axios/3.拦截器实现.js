function Axios(config) {
  this.defaults = config
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  }
}

function dispatchRequest(config) {
  console.log('发送请求，调用dispatchRequest')
  return xhrAdapter(config)
}
function xhrAdapter(config) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()

    xhr.open(config.method, config.url)
    xhr.send()

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status <= 300) {
          resolve({
            config: config,
            data: xhr.response,
            headers: xhr.getAllResponseHeaders(),
            request: xhr,
            statue: xhr.status,
            statusText: xhr.statusText
          })
        } else {
          reject(new Error(`请求失败,状态码为${xhr.status}`))
        }
      }
    }
  })
}

Axios.prototype.request = function (config) {
  let promise = Promise.resolve(config)
  let chains = [dispatchRequest, undefined]

  this.interceptors.request.hendlers.forEach((item) => {
    chains.unshift(item.fulfilled, item.rejected)
  })
  this.interceptors.response.hendlers.forEach((item) => {
    chains.push(item.fulfilled, item.rejected)
  })

  while (chains.length) {
    promise = promise.then(chains.shift(), chains.shift())
  }

  return promise
}

Axios.prototype.get = function () {
  return this.request({ method: 'GET' })
}

Axios.prototype.post = function () {
  return this.request({ method: 'POST' })
}

function InterceptorManager() {
  this.hendlers = []
}
InterceptorManager.prototype.use = function (fulfilled, rejected) {
  this.hendlers.push({
    fulfilled,
    rejected
  })
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

// 请求拦截器1
axios.interceptors.request.use(
  function one(config) {
    console.log('请求拦截器成功---1')
    return config
  },
  function one() {
    console.log('请求拦截器失败---2')
  }
)
// 请求拦截器2
axios.interceptors.request.use(
  function two(config) {
    console.log('请求拦截器成功---2')
    return config
  },
  function two() {
    console.log('请求拦截器失败---2')
  }
)
// 响应拦截器1
axios.interceptors.response.use(
  function one(response) {
    console.log('响应拦截器成功---1')
    response.qhy = 'chin'
    return response
  },
  function one() {
    console.log('响应拦截器失败---2')
  }
)
// 响应拦截器2
axios.interceptors.response.use(
  function two(response) {
    console.log('响应拦截器成功---2')
    response.age = 21
    return response
  },
  function two() {
    console.log('响应拦截器失败---2')
  }
)

console.dir(axios)

axios({ method: 'get', url: 'https://dog.ceo/api/breeds/image/random' }).then(
  (res) => {
    console.log('this is response', res)
  }
)
