const _isUrl = (url) => {
  // 补全代码
  return url.startsWith('https')
}

const judge1 = _isUrl('http://.com:80?name=?&age=1')
const judge2 = _isUrl('https://a.b.c.com:8080/get?name=?&age=1')
const result = !judge1 && judge2

console.log(result)

export const name = 111
