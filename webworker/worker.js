function f(n) {
  return n <= 2 ? 1 : f(n - 1) + f(n - 2)
}

this.onmessage = function(event) {
  console.log('worker.js')

  postMessage(f(event.data))

  console.log('返回数据给主线程');
}