import { useState, useEffect } from 'react'

function useWindowWidth() {
  const [width, setWidth] = useState(0)

  function onWindowChange() {
    setWidth(window.innerWidth)
  }
  useEffect(() => {
    onWindowChange()
    window.addEventListener('resize', onWindowChange)

    return () => {
      window.removeEventListener('resize')
    }
  }, [])
}

export { useWindowWidth }
