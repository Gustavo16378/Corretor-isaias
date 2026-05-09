import { useScroll, useTransform, motion } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-dim via-gold to-gold-light z-[100] origin-left"
      style={{ scaleX }}
    />
  )
}
