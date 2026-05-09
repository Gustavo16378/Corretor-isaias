import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Bed, Bath, Car, Maximize2, MapPin, MessageCircle } from 'lucide-react'
import type { Imovel } from '@/types'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { SITE_CONFIG } from '@/data/site'

interface ImovelModalProps {
  imovel: Imovel | null
  onClose: () => void
}

const tagVariant: Record<string, 'gold' | 'glass' | 'outline'> = {
  Exclusivo: 'gold',
  Lançamento: 'outline',
  Novo: 'glass',
}

export default function ImovelModal({ imovel, onClose }: ImovelModalProps) {
  const [currentPhoto, setCurrentPhoto] = useState(0)

  useEffect(() => {
    if (imovel) {
      setCurrentPhoto(0)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [imovel])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (!imovel) return
      if (e.key === 'ArrowRight') setCurrentPhoto((p) => (p + 1) % imovel.fotos.length)
      if (e.key === 'ArrowLeft') setCurrentPhoto((p) => (p - 1 + imovel.fotos.length) % imovel.fotos.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [imovel, onClose])

  const whatsappMessage = imovel
    ? `Olá Isaias! Tenho interesse no imóvel: ${imovel.titulo} (${imovel.preco}). Poderia me dar mais informações?`
    : ''
  const whatsappHref = `https://wa.me/${SITE_CONFIG.corretor.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <AnimatePresence>
      {imovel && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 lg:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-4xl bg-lead border border-charcoal rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Fechar */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 glass-card flex items-center justify-center text-silver-light hover:text-white transition-colors"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Galeria */}
            <div className="relative aspect-[16/9] bg-charcoal overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentPhoto}
                  src={imovel.fotos[currentPhoto]}
                  alt={`${imovel.titulo} - foto ${currentPhoto + 1}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  loading="lazy"
                />
              </AnimatePresence>

              {/* Navegação */}
              {imovel.fotos.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentPhoto((p) => (p - 1 + imovel.fotos.length) % imovel.fotos.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 glass-card w-10 h-10 flex items-center justify-center text-white hover:text-gold transition-colors"
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentPhoto((p) => (p + 1) % imovel.fotos.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 glass-card w-10 h-10 flex items-center justify-center text-white hover:text-gold transition-colors"
                    aria-label="Próxima foto"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {imovel.fotos.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentPhoto(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${idx === currentPhoto ? 'bg-gold w-5' : 'bg-white/40'}`}
                        aria-label={`Foto ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}

              {imovel.tag && (
                <div className="absolute top-3 left-3">
                  <Badge variant={tagVariant[imovel.tag]}>{imovel.tag}</Badge>
                </div>
              )}
            </div>

            {/* Conteúdo */}
            <div className="p-6 lg:p-8">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-display text-2xl font-bold text-white mb-1">{imovel.titulo}</h3>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-silver" />
                    <span className="font-body text-sm text-silver">{imovel.localizacao}</span>
                  </div>
                </div>
                <p className="font-display text-2xl font-bold text-gold flex-shrink-0">{imovel.preco}</p>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-4 gap-4 p-4 bg-charcoal/50 rounded-xl mb-6">
                {[
                  { icon: Bed, value: `${imovel.quartos} quartos` },
                  { icon: Bath, value: `${imovel.banheiros} banheiros` },
                  { icon: Car, value: `${imovel.vagas} vagas` },
                  { icon: Maximize2, value: imovel.area },
                ].map((s) => (
                  <div key={s.value} className="flex flex-col items-center gap-1.5 text-center">
                    <s.icon className="w-5 h-5 text-gold" />
                    <span className="font-body text-xs text-silver-light">{s.value}</span>
                  </div>
                ))}
              </div>

              <p className="font-body text-silver leading-relaxed mb-6">{imovel.descricao}</p>

              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => window.open(whatsappHref, '_blank', 'noopener,noreferrer')}
              >
                <MessageCircle className="w-5 h-5" />
                Tenho interesse — falar com Isaias
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
