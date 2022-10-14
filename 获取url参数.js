function getParams(url) {
  const paramsStr = url.split('?')[1]
  const arr = paramsStr.split('&')

  let res = {}
  arr.forEach((item) => {
    const key = item.split('=')[0]
    const value = item.split('=')[1]
    res[key] = value
  })

  return res
}

let str = 'https://github.com/coder-chin?tab=projects&type=beta'
console.log(getParams(str))
