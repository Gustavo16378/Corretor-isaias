import { motion } from 'framer-motion'
import { MessageSquare, Search, Home, FileCheck } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'

const etapas = [
  {
    num: '01',
    icon: MessageSquare,
    titulo: 'Conversa inicial',
    descricao: 'Entendo suas necessidades, orçamento e sonhos. Sem pressão, sem pressa. Você fala, eu escuto com atenção.',
  },
  {
    num: '02',
    icon: Search,
    titulo: 'Curadoria personalizada',
    descricao: 'Seleciono apenas imóveis que fazem sentido pra você. Zero perda de tempo com opções que não se encaixam no seu perfil.',
  },
  {
    num: '03',
    icon: Home,
    titulo: 'Visitas e negociação',
    descricao: 'Acompanho você em cada visita e negocio as melhores condições. Minha experiência trabalha a seu favor.',
  },
  {
    num: '04',
    icon: FileCheck,
    titulo: 'Fechamento seguro',
    descricao: 'Cuido de toda a documentação. Você só assina quando tudo estiver perfeito e aprovado por você.',
  },
]

export default function ProcessoSection() {
  return (
    <section id="processo" className="py-28 bg-black bg-texture-pattern overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <SectionLabel className="justify-center mb-4">Como funciona</SectionLabel>
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold text-white mb-4">
            Como funciona trabalhar comigo
          </h2>
          <p className="font-body text-silver-light max-w-lg mx-auto">
            Do primeiro contato até a chave na sua mão —{' '}
            <em className="text-gold not-italic">sem surpresas.</em>
          </p>
        </motion.div>

        {/* Desktop: linha do tempo horizontal */}
        <div className="hidden lg:block relative">
          {/* Linha de conexão */}
          <div className="absolute top-8 left-[calc(12.5%)] right-[calc(12.5%)] h-px">
            <motion.div
              className="h-full bg-gradient-to-r from-gold/20 via-gold/60 to-gold/20"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
              style={{ transformOrigin: 'left' }}
            />
          </div>

          <div className="grid grid-cols-4 gap-8">
            {etapas.map((etapa, i) => (
              <motion.div
                key={etapa.num}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
              >
                {/* Círculo */}
                <motion.div
                  className="relative w-16 h-16 rounded-full border-2 border-gold bg-black flex items-center justify-center mb-6 z-10"
                  whileInView={{ boxShadow: ['0 0 0 0 rgba(200,151,42,0.4)', '0 0 0 12px rgba(200,151,42,0)', '0 0 0 0 rgba(200,151,42,0)'] }}
                  transition={{ delay: i * 0.15 + 0.5, duration: 1.2 }}
                  viewport={{ once: true }}
                >
                  <etapa.icon className="w-7 h-7 text-gold" />
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gold text-black text-[10px] font-bold flex items-center justify-center font-body">
                    {i + 1}
                  </span>
                </motion.div>

                {/* Card */}
                <div className="glass-card p-5 relative overflow-hidden">
                  <span className="absolute top-2 right-3 font-display text-5xl font-bold text-gold/5 select-none">
                    {etapa.num}
                  </span>
                  <h3 className="font-display text-base font-semibold text-white mb-2">{etapa.titulo}</h3>
                  <p className="font-body text-sm text-silver leading-relaxed">{etapa.descricao}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: linha do tempo vertical */}
        <div className="lg:hidden space-y-6">
          {etapas.map((etapa, i) => (
            <motion.div
              key={etapa.num}
              className="flex gap-5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              viewport={{ once: true }}
            >
              {/* Linha vertical + círculo */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border-2 border-gold bg-black flex items-center justify-center flex-shrink-0">
                  <etapa.icon className="w-5 h-5 text-gold" />
                </div>
                {i < etapas.length - 1 && (
                  <div className="w-px flex-1 mt-2 bg-gradient-to-b from-gold/40 to-transparent min-h-[40px]" />
                )}
              </div>
              <div className="glass-card p-5 flex-1 mb-2">
                <h3 className="font-display text-base font-semibold text-white mb-2">{etapa.titulo}</h3>
                <p className="font-body text-sm text-silver leading-relaxed">{etapa.descricao}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
