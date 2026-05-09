import { motion } from 'framer-motion'
import { Home, Star, Rocket } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'

const servicos = [
  {
    num: '01',
    icon: Home,
    titulo: 'Imóveis Residenciais',
    descricao:
      'Casas e apartamentos para quem busca qualidade de vida em Palmas. Seleção criteriosa em bairros valorizados, com atenção a cada detalhe que faz uma casa virar um lar.',
  },
  {
    num: '02',
    icon: Star,
    titulo: 'Alto Padrão & Luxo',
    descricao:
      'Imóveis exclusivos para clientes que exigem o melhor. Residências diferenciadas, com acabamento nobre, localização privilegiada e arquitetura que impressiona.',
  },
  {
    num: '03',
    icon: Rocket,
    titulo: 'Lançamentos',
    descricao:
      'Acesso antecipado aos melhores empreendimentos de Palmas. Oportunidades únicas de comprar na planta com condições especiais e valorização garantida.',
  },
]

export default function ServicosSection() {
  return (
    <section id="servicos" className="py-28 bg-lead">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <SectionLabel className="justify-center mb-4">Especialidades</SectionLabel>
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold text-white">
            O que posso fazer por{' '}
            <em className="text-gradient-gold not-italic">você</em>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {servicos.map((s, i) => (
            <motion.div
              key={s.num}
              className="relative glass-card p-8 group overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-gold/30 hover:shadow-gold-lg"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Número decorativo */}
              <span className="absolute top-4 right-6 font-display text-8xl font-bold text-gold/5 select-none pointer-events-none leading-none">
                {s.num}
              </span>

              {/* Ícone */}
              <div className="relative z-10 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:bg-gold/15 transition-colors duration-300">
                  <s.icon className="w-8 h-8 text-gold" />
                </div>
              </div>

              {/* Conteúdo */}
              <h3 className="font-display text-xl font-semibold text-white mb-4 relative z-10">
                {s.titulo}
              </h3>
              <p className="font-body text-silver leading-relaxed relative z-10">
                {s.descricao}
              </p>

              {/* Borda dourada animada no hover */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
