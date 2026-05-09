import { motion } from 'framer-motion'
import { MapPin, Trophy, Handshake, CheckCircle, MessageCircle } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import { SITE_CONFIG } from '@/data/site'
import isaias1 from '@/public/photos/isaias1.jpeg'
import isaias2 from '@/public/photos/isaias2.jpeg'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const valores = [
  { icon: CheckCircle, label: 'Transparência' },
  { icon: CheckCircle, label: 'Comprometimento' },
  { icon: CheckCircle, label: 'Resultado' },
]

const badges = [
  { icon: MapPin, text: 'Palmas – TO' },
  { icon: Trophy, text: `${SITE_CONFIG.corretor.experiencia} anos no mercado` },
  { icon: Handshake, text: SITE_CONFIG.corretor.imobiliaria },
]

export default function SobreSection() {
  const whatsappHref = `https://wa.me/${SITE_CONFIG.corretor.whatsapp}?text=${encodeURIComponent('Olá Isaias! Gostaria de conversar.')}`

  return (
    <section id="sobre" className="py-28 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.9fr_1fr] gap-16 lg:gap-24 items-center">
          {/* Foto + Badges */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative inline-block">
              {/* Borda dourada animada */}
              <motion.div
                className="absolute -inset-3 rounded-2xl border-2 border-gold/30"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
              />
              <motion.div
                className="absolute -inset-1 rounded-2xl border border-gold/15"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              />

              {/* Foto principal */}
              <img
                src={isaias1}
                alt="Isaias de Sousa - Corretor de Imóveis em Palmas TO"
                className="w-full max-w-md rounded-2xl object-cover object-top aspect-[3/4]"
                loading="lazy"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Segunda foto — canto inferior direito */}
            <motion.div
              className="absolute -bottom-8 -right-4 lg:-right-10 w-32 h-40 rounded-xl overflow-hidden border-2 border-gold/30 shadow-gold-md hidden sm:block"
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src={isaias2}
                alt="Isaias de Sousa - Corretor de Imóveis"
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            </motion.div>

            {/* Badges flutuantes */}
            {badges.map((badge, i) => {
              const positions = [
                'top-8 -right-4 lg:-right-8',
                '-bottom-6 left-4',
                'top-1/2 -left-4 lg:-left-8',
              ]
              return (
                <motion.div
                  key={badge.text}
                  className={`absolute ${positions[i]} glass-card px-4 py-3 flex items-center gap-2 animate-float`}
                  style={{ animationDelay: `${i * 0.5}s` }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <badge.icon className="w-4 h-4 text-gold flex-shrink-0" />
                  <span className="text-xs text-silver-light font-body whitespace-nowrap">{badge.text}</span>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Conteúdo textual */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div variants={fadeUp} className="mb-5">
              <SectionLabel>Sobre Mim</SectionLabel>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold text-white leading-[1.2] mb-8"
            >
              Mais do que um corretor,<br />
              um parceiro na{' '}
              <em className="text-gradient-gold not-italic">maior decisão</em>{' '}
              da sua vida.
            </motion.h2>

            <motion.div variants={fadeUp} className="space-y-5 mb-10">
              <p className="font-body text-silver-light leading-relaxed">
                Sou Isaias de Sousa, corretor de imóveis com {SITE_CONFIG.corretor.experiencia} anos de experiência no mercado imobiliário de Palmas – TO. Minha trajetória é marcada por histórias de famílias que realizaram o sonho do imóvel próprio e investidores que multiplicaram seu patrimônio com escolhas assertivas.
              </p>
              <p className="font-body text-silver-light leading-relaxed">
                Associado à <strong className="text-white">{SITE_CONFIG.corretor.imobiliaria}</strong>, ofereço acesso aos melhores lançamentos e imóveis exclusivos da capital tocantinense. Cada cliente recebe atenção personalizada, porque entendo que comprar um imóvel é muito mais do que uma transação — é a conquista de um sonho.
              </p>
            </motion.div>

            {/* Valores */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-6 mb-10">
              {valores.map((v) => (
                <div key={v.label} className="flex items-center gap-2">
                  <v.icon className="w-4 h-4 text-gold" />
                  <span className="font-body text-sm text-silver-light">{v.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp}>
              <Button
                variant="primary"
                size="lg"
                onClick={() => window.open(whatsappHref, '_blank', 'noopener,noreferrer')}
              >
                <MessageCircle className="w-4 h-4" />
                Vamos conversar?
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
