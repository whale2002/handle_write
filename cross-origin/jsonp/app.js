let express = require('express')

const app = express()

app.get('/say', (req, res) => {
  let { wd, cb } = req.query
  console.log(wd, cb)
  res.send(`${cb}('hello')`)
})

app.listen(3000, () => {
  console.log('run at http:localhost:3000')
})
