const source = [
  {
    id: 1,
    pid: 0,
    name: 'body'
  },
  {
    id: 2,
    pid: 1,
    name: 'title'
  },
  {
    id: 3,
    pid: 2,
    name: 'div'
  }
]

function jsonToTree(data) {
  let res = []
  let map = {}

  data.forEach((item) => {
    map[item.id] = item
  })

  data.forEach((item) => {
    let parent = map[item.pid]
    if (parent) {
      ((parent.children) || (parent.children = [])).push(item)
    } else {
      res.push(item)
    }
  })

  return res
}


console.log(jsonToTree(source))