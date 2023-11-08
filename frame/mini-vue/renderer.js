const h = (tag, props, children) => {
  return {
    tag,
    props,
    children
  }
}

const mount = (vnode, container) => {
  const el = (vnode.el = document.createElement(vnode.tag))

  if (vnode.props) {
    for (const key in vnode.props) {
      const value = vnode.props[key]
      if (key.startsWith('on')) {
        el.addEventListener(key.slice(2).toLowerCase(), value)
      } else {
        el.setAttribute(key, value)
      }
    }
  }

  if (vnode.children) {
    if (typeof vnode.children === 'string') {
      el.textContent = vnode.children
    } else {
      vnode.children.forEach((child) => {
        mount(child, el)
      })
    }
  }

  container.appendChild(el)
}

const patch = (n1, n2) => {
  if (n1.tag !== n2.tag) {
    const parent = n1.el.parentElement
    parent.removeChild(n1.el)
    mount(n2, parent)
  } else {
    const el = (n2.el = n1.el)

    const oldProps = n1.props || {}
    const newProps = n2.props || {}

    for (let key in newProps) {
      const oldValue = oldProps[key]
      const newValue = newProps[key]
      if (newValue !== oldValue) {
        if (key.startsWith('on'))
          el.addEventListener(key.slice(2).toLowerCase(), newValue)
        else el.setAttribute(key, newValue)
      }
    }

    for (let key in oldProps) {
      if (key.startsWith('on')) {
        el.removeEventListener(key.slice(2).toLowerCase(), oldProps[key])
      }
      if (!key in newProps) {
        el.removeAttribute(key)
      }
    }

    const oldChildren = n1.children || []
    const newChildren = n2.children || []

    if (typeof newChildren === 'string') {
      if (typeof oldChildren === 'string') {
        // 都是字符串
        if (newChildren !== oldChildren) {
          el.textContent = newChildren
        }
      } else {
        el.innerHTML = newChildren
      }
    } else {
      if (typeof oldChildren === 'string') {
        el.innerHTML = ''
        newChildren.forEach((item) => mount(item, el))
      } else {
        // 都是数组
        const MinLength = Math.min(newChildren.length, oldChildren.length)
        for (let i = 0; i < MinLength; i++) {
          patch(oldChildren[i], newChildren[i])
        }

        if (newChildren.length < oldChildren.length) {
          oldChildren
            .slice(newChildren.length)
            .forEach((item) => el.removeChild(item.el))
        }
        if (newChildren.length > oldChildren.length) {
          newChildren
            .slice(oldChildren.length)
            .forEach((item) => mount(item, el))
        }
      }
    }
  }
}
