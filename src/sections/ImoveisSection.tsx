import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { FiltroTipo, Imovel } from '@/types'
import { imoveis } from '@/data/imoveis'
import SectionLabel from '@/components/ui/SectionLabel'
import ImovelCard from '@/components/ImovelCard'
import ImovelModal from '@/components/ImovelModal'

const filtros: { label: string; value: FiltroTipo }[] = [
  { label: 'Todos', value: 'todos' },
  { label: 'Residencial', value: 'residencial' },
  { label: 'Alto Padrão', value: 'alto-padrao' },
  { label: 'Lançamentos', value: 'lancamento' },
]

export default function ImoveisSection() {
  const [filtro, setFiltro] = useState<FiltroTipo>('todos')
  const [modalImovel, setModalImovel] = useState<Imovel | null>(null)

  const filtered = filtro === 'todos' ? imoveis : imoveis.filter((i) => i.tipo === filtro)

  return (
    <>
      <section id="imoveis" className="py-28 bg-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SectionLabel className="justify-center mb-4">Portfólio</SectionLabel>
            <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold text-white">
              Imóveis{' '}
              <em className="text-gradient-gold not-italic">disponíveis</em>
            </h2>
          </motion.div>

          {/* Filtros */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {filtros.map((f) => (
              <button
                key={f.value}
                onClick={() => setFiltro(f.value)}
                className={`font-body text-sm px-6 py-2.5 rounded-full border transition-all duration-300 ${
                  filtro === f.value
                    ? 'bg-gold text-black border-gold font-semibold'
                    : 'border-gold/30 text-silver-light hover:border-gold/60 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </motion.div>

          {/* Grid de imóveis */}
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filtered.map((imovel) => (
                <ImovelCard
                  key={imovel.id}
                  imovel={imovel}
                  onOpen={setModalImovel}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <motion.p
              className="text-center text-silver font-body py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Nenhum imóvel encontrado nesta categoria.
            </motion.p>
          )}
        </div>
      </section>

      <ImovelModal imovel={modalImovel} onClose={() => setModalImovel(null)} />
    </>
  )
}
