function typeoof(target) {
  let res = Object.prototype.toString.call(target)
  console.log(res)
  res = res.split(' ')[1]
  return res.slice(0, res.length - 1)
}

console.log(typeoof(1))
