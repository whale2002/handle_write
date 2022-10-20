import { useState, useEffect, useCallback } from 'react'

function useWindowWidth() {
  const [width, setWidth] = useState(0)

  const onWindowChange = useCallback(() => {
    setWidth(window.innerWidth)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', onWindowChange)

    return () => {
      window.removeEventListener('resize')
    }
  }, [])

  return width
}

export { useWindowWidth }
