function createApp(rootComponent) {
  return {
    mount(tag) {
      const el = document.querySelector(tag)
      let isMounted = false
      let oldVNodes = null

      watchFn(function () {
        if (!isMounted) {
          oldVNodes = rootComponent.render()
          mount(oldVNodes, el)
          isMounted = true
        } else {
          const newVNodes = rootComponent.render()
          patch(oldVNodes, newVNodes)
          oldVNodes = newVNodes
        }
      })
    }
  }
}
