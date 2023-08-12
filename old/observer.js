// key: 观察者模式
class Subject {
  constructor() {
    this.observers = []
  }
  addObserver(observer) {
    this.observers.push(observer)
  }
  deleteObserver(observer) {
    this.observers.splice(this.observers.indexOf(observer), 1)
  }
  notify() {
    this.observers.forEach((observer) => {
      observer.update()
    })
  }
}

class Observer {
  constructor() {
    this.update = function () {}
  }
}

let subject = new Subject()
let observer1 = new Observer()
observer1.update = function () {
  console.log('observer1 update')
}
subject.addObserver(observer1)

let observer2 = new Observer('valley')
observer2.update = function () {
  console.log('observer2 update')
}
subject.addObserver(observer2)

subject.notify()

subject.deleteObserver(observer1)

subject.notify()
