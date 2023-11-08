function Axios(config) {
  this.defaults = config
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  }
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

    if (config.cancelToken) {
      config.cancelToken.promise.then((value) => {
        xhr.abort()
      })
    }
  })
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

function CancelToken(executor) {
  let resolvePromise

  this.promise = new Promise((resolve, reject) => {
    resolvePromise = resolve
  })

  executor(() => {
    resolvePromise()
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

  instance.CancelToken = CancelToken

  return instance
}

const axios = createInstance({ text: '基本配置' })

console.dir(axios)

let cancel = null

const handleRequest = () => {
  // 执行CancelToken改变promise状态
  const cancelToken = new axios.CancelToken(function (c) {
    cancel = c
  })

  axios({
    method: 'GET',
    url: 'https://dog.ceo/api/breeds/image/random',
    cancelToken: cancelToken
  }).then((res) => {
    console.log(res)
    cancel = null
  })
}

const cancelRequest = () => {
  console.log('取消请求')
  if (cancel !== null) {
    cancel()
  }
}
