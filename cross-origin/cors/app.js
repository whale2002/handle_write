let express = require('express')

const app = express()

app.use((req, res, next) => {
  // 允许哪个源访问
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*')
  // 允许携带哪个头访问我
  res.setHeader('Access-Control-Allow-Headers', 'name')
  // 允许哪个方法访问我
  res.setHeader('Access-Control-Allow-Methods', 'PUT')
  // 预检存活时间
  res.setHeader('Access-Control-Max-Age', 6)
  // 允许携带cookie
  res.setHeader('Access-Control-Allow-Credentials', true)
  // 允许前端获取哪个头
  res.setHeader('Access-Control-Allow-Expose-Headers', 'name')
  if (req.method === 'OPTIONS') {
    res.end()
  }
  next()
})

app.put('/getData', (req, res) => {
  console.log('request get')
  res.end('hello')
})
app.get('/getData', (req, res) => {
  console.log('request get')
  res.end('hello')
})

app.listen(3001, () => {
  console.log('run at http://localhost:3001')
})
