import { useEffect, useRef, useState } from 'react'

type ScrollDirection = 'up' | 'down'

export function useScrollDirection(threshold = 8): ScrollDirection {
  const [direction, setDirection] = useState<ScrollDirection>('up')
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY

      // Ignora pequenas variações para evitar flicker
      if (Math.abs(currentY - lastY.current) < threshold) return

      setDirection(currentY > lastY.current ? 'down' : 'up')
      lastY.current = currentY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return direction
}
