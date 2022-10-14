function isObject(value) {
  if(typeof value === 'object' && value !== null) return true

  return false
}
function isEqual(obj1, obj2) {
  
}

const obj1 = {
  a: 100,
  b: {
    x: 200,
    y: 200
  }
}

const obj2 = {
  a: 100,
  b: {
    x: 100,
    y: 200
  }
}

isEqual(obj1, obj2)