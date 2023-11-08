function Axios(config) {
  this.defaults = config
  this.interceptors = {
    request: {},
    response: {}
  }
}

function dispatchRequest(config) {
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

  let result = promise.then(chains[0], chains[1])

  return result
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

axios({ method: 'get', url: 'https://dog.ceo/api/breeds/image/random' }).then(
  (res) => {
    console.log('this is response', res)
  }
)
