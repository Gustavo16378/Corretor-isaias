import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Menu } from 'lucide-react'
import Button from '@/components/ui/Button'
import { SITE_CONFIG } from '@/data/site'
import { useScrollDirection } from '@/hooks/useScrollDirection'

const links = [
  { label: 'Sobre', href: '#sobre', id: 'sobre' },
  { label: 'Serviços', href: '#servicos', id: 'servicos' },
  { label: 'Imóveis', href: '#imoveis', id: 'imoveis' },
  { label: 'Processo', href: '#processo', id: 'processo' },
  { label: 'Contato', href: '#contato', id: 'contato' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const scrollDirection = useScrollDirection()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll spy — detecta qual seção está visível
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )

    links.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const whatsappHref = `https://wa.me/${SITE_CONFIG.corretor.whatsapp}?text=${encodeURIComponent('Olá Isaias! Gostaria de conversar.')}`

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled
            ? 'bg-black/92 backdrop-blur-md border-b border-gold/20'
            : 'bg-gradient-to-b from-black/70 to-transparent backdrop-blur-sm'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: scrollDirection === 'down' && scrolled ? '-100%' : 0,
          opacity: 1,
        }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <span className="font-display text-xl font-semibold text-white group-hover:text-gold transition-colors duration-300">
              Isaias de Sousa
            </span>
            <span className="text-gold text-2xl leading-none">·</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => {
              const isActive = activeSection === link.id
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative font-body text-sm font-semibold transition-colors duration-300 py-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] group"
                  style={{ color: isActive ? '#E8B84B' : '#F5F5F5' }}
                >
                  {link.label}

                  {/* Linha indicadora da seção ativa */}
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gold-light"
                    initial={false}
                    animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ transformOrigin: 'left' }}
                  />

                  {/* Linha no hover (quando não está ativo) */}
                  {!isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-white/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  )}
                </a>
              )
            })}
          </nav>

          {/* CTA Desktop */}
          <div className="hidden md:block">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(whatsappHref, '_blank', 'noopener,noreferrer')}
            >
              Falar com Isaias
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="fixed right-0 top-0 bottom-0 w-72 bg-lead border-l border-charcoal z-[70] flex flex-col p-8"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center justify-between mb-10">
                <span className="font-display text-lg text-white">Menu</span>
                <button onClick={() => setMenuOpen(false)} className="text-silver-light hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="gold-divider mb-8" />

              <nav className="flex flex-col gap-6">
                {links.map((link) => {
                  const isActive = activeSection === link.id
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="font-body text-lg transition-colors duration-300 flex items-center gap-3"
                      style={{ color: isActive ? '#E8B84B' : '#C0C8D0' }}
                    >
                      {isActive && <span className="w-2 h-2 rounded-full bg-gold-light flex-shrink-0" />}
                      {link.label}
                    </a>
                  )
                })}
              </nav>

              <div className="mt-auto">
                <div className="gold-divider mb-8" />
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => {
                    setMenuOpen(false)
                    window.open(whatsappHref, '_blank', 'noopener,noreferrer')
                  }}
                >
                  Falar com Isaias
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
