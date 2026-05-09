import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Ponto: mola muito rígida = quase instantâneo
  const dotX = useSpring(mouseX, { stiffness: 3000, damping: 100, mass: 0.1 })
  const dotY = useSpring(mouseY, { stiffness: 3000, damping: 100, mass: 0.1 })

  // Anel: mola suave = leve efeito de perseguição
  const ringX = useSpring(mouseX, { stiffness: 300, damping: 30, mass: 0.3 })
  const ringY = useSpring(mouseY, { stiffness: 300, damping: 30, mass: 0.3 })

  // Centraliza o ponto (tamanho muda com hover)
  const dotSize = isHovering ? 40 : 12
  const dotOffsetX = useTransform(dotX, (v) => v - dotSize / 2)
  const dotOffsetY = useTransform(dotY, (v) => v - dotSize / 2)

  // Centraliza o anel (fixo 40px)
  const ringOffsetX = useTransform(ringX, (v) => v - 20)
  const ringOffsetY = useTransform(ringY, (v) => v - 20)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY, isVisible])

  useEffect(() => {
    const onEnter = () => setIsHovering(true)
    const onLeave = () => setIsHovering(false)

    const attach = () => {
      document.querySelectorAll('a, button, [data-cursor-hover]').forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    attach()
    const obs = new MutationObserver(attach)
    obs.observe(document.body, { childList: true, subtree: true })
    return () => obs.disconnect()
  }, [])

  if (!isVisible) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-gold"
        style={{ x: dotOffsetX, y: dotOffsetY }}
        animate={{ width: dotSize, height: dotSize, opacity: isHovering ? 0.45 : 0.85 }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-gold/50 w-10 h-10"
        style={{ x: ringOffsetX, y: ringOffsetY }}
        animate={{ opacity: isHovering ? 0 : 0.4 }}
        transition={{ duration: 0.2 }}
      />
    </>
  )
}
