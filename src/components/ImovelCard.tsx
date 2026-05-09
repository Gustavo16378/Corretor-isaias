import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bed, Bath, Car, Maximize2, MapPin } from 'lucide-react'
import type { Imovel } from '@/types'
import Badge from '@/components/ui/Badge'

interface ImovelCardProps {
  imovel: Imovel
  onOpen: (imovel: Imovel) => void
}

const tagVariant: Record<string, 'gold' | 'glass' | 'outline'> = {
  Exclusivo: 'gold',
  Lançamento: 'outline',
  Novo: 'glass',
}

export default function ImovelCard({ imovel, onOpen }: ImovelCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4 }}
      className="glass-card overflow-hidden group cursor-pointer hover:-translate-y-1 transition-transform duration-300 hover:shadow-gold-md"
      onClick={() => onOpen(imovel)}
      data-cursor-hover
    >
      {/* Foto */}
      <div className="relative aspect-[4/3] overflow-hidden bg-charcoal">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-charcoal animate-pulse" />
        )}
        <img
          src={imovel.fotos[0]}
          alt={imovel.titulo}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Overlay hover */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="font-body text-sm font-semibold text-white border border-white/50 px-5 py-2.5 rounded-full backdrop-blur-sm">
            Ver detalhes
          </span>
        </div>

        {/* Tag */}
        {imovel.tag && (
          <div className="absolute top-3 left-3">
            <Badge variant={tagVariant[imovel.tag]}>{imovel.tag}</Badge>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <p className="font-display text-xl font-bold text-gold mb-1">{imovel.preco}</p>
        <h3 className="font-display text-base font-semibold text-white mb-2 line-clamp-2 leading-snug">
          {imovel.titulo}
        </h3>
        <div className="flex items-center gap-1.5 mb-4">
          <MapPin className="w-3.5 h-3.5 text-silver flex-shrink-0" />
          <span className="font-body text-xs text-silver truncate">{imovel.localizacao}</span>
        </div>

        {/* Specs */}
        <div className="border-t border-charcoal pt-4 flex items-center justify-between">
          {[
            { icon: Bed, value: imovel.quartos, label: 'quartos' },
            { icon: Bath, value: imovel.banheiros, label: 'banheiros' },
            { icon: Car, value: imovel.vagas, label: 'vagas' },
            { icon: Maximize2, value: imovel.area, label: '' },
          ].map((spec) => (
            <div key={spec.label || 'area'} className="flex items-center gap-1.5">
              <spec.icon className="w-3.5 h-3.5 text-gold flex-shrink-0" />
              <span className="font-body text-xs text-silver-light">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Borda dourada hover */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </motion.div>
  )
}
