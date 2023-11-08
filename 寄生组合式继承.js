function Human(name) {
  this.name = name
  this.kingdom = 'animal'
  this.color = ['yellow', 'white', 'brown', 'black']
}

Human.prototype.getName = function () {
  return this.name
}

function Chinese(name, age) {
  Human.call(this, name)
  this.color = 'yellow'
  this.age = age
}

Chinese.prototype = Object.create(Human.prototype)
Chinese.prototype.constructor = Chinese

Chinese.prototype.getAge = function () {
  return this.age
}
