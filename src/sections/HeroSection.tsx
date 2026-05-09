import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, CheckCircle2, Shield } from 'lucide-react'
import Button from '@/components/ui/Button'
import { SITE_CONFIG } from '@/data/site'
import isaias3 from '@/public/photos/isaias3.jpeg'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <section ref={containerRef} className="relative h-screen min-h-[700px] overflow-hidden flex items-center">
      {/* Background com parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <img
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&q=90"
          alt="Imóvel de alto padrão em Palmas TO"
          className="w-full h-full object-cover object-center scale-110"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </motion.div>

      {/* Linha vertical dourada animada */}
      <div className="absolute left-[calc(50%-580px)] top-1/2 -translate-y-1/2 hidden lg:block">
        <motion.div
          className="w-0.5 bg-gradient-to-b from-transparent via-gold to-transparent"
          initial={{ height: 0 }}
          animate={{ height: 120 }}
          transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
        />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <motion.div className="max-w-2xl" variants={stagger} initial="hidden" animate="visible">

          {/* Localização */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-gold-light block" />
            <span className="font-body text-xs text-gold-light font-semibold tracking-[0.2em] uppercase drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
              Corretor de Imóveis · {SITE_CONFIG.corretor.creci} · {SITE_CONFIG.corretor.cidade}
            </span>
          </motion.div>

          {/* Título principal */}
          <motion.h1
            variants={fadeUp}
            className="font-display text-[clamp(2.4rem,6vw,4.5rem)] font-bold text-white leading-[1.1] mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
          >
            O imóvel certo<br />
            começa com o<br />
            corretor{' '}
            <em
              className="not-italic"
              style={{ color: '#E8B84B', textShadow: '0 0 20px rgba(232,184,75,0.5), 0 2px 8px rgba(0,0,0,0.9)' }}
            >
              certo.
            </em>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            variants={fadeUp}
            className="font-body text-lg text-white/90 leading-relaxed mb-10 max-w-lg drop-shadow-[0_1px_6px_rgba(0,0,0,0.95)]"
          >
            Especialista em imóveis residenciais, alto padrão e lançamentos em Palmas – TO. Atendimento personalizado do início ao fim.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => document.getElementById('imoveis')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver imóveis disponíveis
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Conheça minha história →
            </Button>
          </motion.div>

        </motion.div>
      </div>

      {/* Retrato do corretor — direita do hero, desktop */}
      <motion.div
        className="absolute right-12 xl:right-24 top-1/2 -translate-y-1/2 z-10 hidden lg:block"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.8 }}
      >
        <div className="relative w-72 h-96 xl:w-80 xl:h-[440px]">
          <div className="absolute inset-0 rounded-2xl border border-gold/25 translate-x-3 translate-y-3" />
          <img
            src={isaias3}
            alt="Isaias de Sousa, Corretor de Imóveis em Palmas TO"
            className="w-full h-full object-cover object-top rounded-2xl relative z-10"
            loading="eager"
          />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <p className="font-display text-white font-semibold text-base">{SITE_CONFIG.corretor.nome}</p>
            <p className="font-body text-gold text-xs tracking-wide">{SITE_CONFIG.corretor.imobiliaria}</p>
          </div>
        </div>
      </motion.div>

      {/* Badge flutuante — tablet */}
      <motion.div
        className="absolute bottom-12 right-8 z-10 glass-card px-5 py-4 hidden sm:block lg:hidden"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-4 h-4 text-gold" />
          <span className="text-xs text-gold font-semibold tracking-wide">{SITE_CONFIG.corretor.creci}</span>
        </div>
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-4 h-4 text-gold" />
          <span className="text-xs text-silver-light">{SITE_CONFIG.corretor.experiencia} anos de experiência</span>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <span className="font-body text-xs text-silver tracking-widest uppercase">role para conhecer</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-gold" />
        </motion.div>
      </motion.div>
    </section>
  )
}
