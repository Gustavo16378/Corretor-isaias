import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Instagram, MapPin, Building2, Clock, Send } from 'lucide-react'
import DOMPurify from 'dompurify'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import { SITE_CONFIG } from '@/data/site'
import type { FormContato } from '@/types'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const tiposImovel = [
  'Residencial',
  'Alto Padrão / Luxo',
  'Lançamento',
  'Comercial',
  'Ainda não sei',
]

const initialForm: FormContato = {
  nome: '',
  telefone: '',
  email: '',
  tipoImovel: '',
  mensagem: '',
  website: '',
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return `(${digits}`
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 11) return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
  return value
}

export default function ContatoSection() {
  const [form, setForm] = useState<FormContato>(initialForm)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const lastSubmit = useRef<number>(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (name === 'telefone') {
      setForm((prev) => ({ ...prev, telefone: formatPhone(value) }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Honeypot: rejeitar silenciosamente se campo oculto foi preenchido
    if (form.website) return

    // Rate limit: bloquear por 5s
    const now = Date.now()
    if (now - lastSubmit.current < 5000) return
    lastSubmit.current = now

    // Sanitização
    const safeMensagem = DOMPurify.sanitize(form.mensagem)
    const safeNome = DOMPurify.sanitize(form.nome)

    const msg = `Olá Isaias! Me chamo *${safeNome}*.\n\nTelefone: ${form.telefone}\nE-mail: ${form.email}\nTipo de imóvel: ${form.tipoImovel}\n\nMensagem: ${safeMensagem}`
    const href = `https://wa.me/${SITE_CONFIG.corretor.whatsapp}?text=${encodeURIComponent(msg)}`

    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
      window.open(href, '_blank', 'noopener,noreferrer')
      setTimeout(() => {
        setStatus('idle')
        setForm(initialForm)
      }, 3000)
    }, 800)
  }

  const whatsappHref = `https://wa.me/${SITE_CONFIG.corretor.whatsapp}`
  const instagramHref = SITE_CONFIG.corretor.instagram

  return (
    <section id="contato" className="py-28 bg-lead">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Esquerda — info */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp} className="mb-5">
              <SectionLabel>Contato</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold text-white leading-tight mb-4"
            >
              Pronto para encontrar o imóvel dos seus{' '}
              <em className="text-gradient-gold not-italic">sonhos?</em>
            </motion.h2>
            <motion.p variants={fadeUp} className="font-body text-silver-light mb-10">
              Respondo em até 2 horas. Atendimento personalizado do início ao fim.
            </motion.p>

            <motion.div variants={stagger} className="space-y-4">
              {[
                {
                  icon: MessageCircle,
                  label: 'WhatsApp',
                  value: `+55 (63) 9 9999-9999`,
                  href: whatsappHref,
                },
                {
                  icon: Instagram,
                  label: 'Instagram',
                  value: '@isaiass_ssousa',
                  href: instagramHref,
                },
                { icon: MapPin, label: 'Localização', value: SITE_CONFIG.corretor.cidade, href: null },
                { icon: Building2, label: 'Imobiliária', value: SITE_CONFIG.corretor.imobiliaria, href: null },
                { icon: Clock, label: 'Horário', value: SITE_CONFIG.corretor.horario, href: null },
              ].map((item) => (
                <motion.div key={item.label} variants={fadeUp}>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 glass-card px-5 py-4 hover:border-gold/30 transition-all duration-300 group"
                    >
                      <item.icon className="w-5 h-5 text-gold flex-shrink-0" />
                      <div>
                        <p className="font-body text-xs text-silver mb-0.5">{item.label}</p>
                        <p className="font-body text-sm text-white group-hover:text-gold transition-colors">{item.value}</p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 glass-card px-5 py-4">
                      <item.icon className="w-5 h-5 text-gold flex-shrink-0" />
                      <div>
                        <p className="font-body text-xs text-silver mb-0.5">{item.label}</p>
                        <p className="font-body text-sm text-white">{item.value}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Direita — Formulário */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="glass-card p-8">
              {status === 'success' ? (
                <motion.div
                  className="flex flex-col items-center justify-center py-16 text-center gap-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                    <Send className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="font-display text-xl text-white">Mensagem enviada!</h3>
                  <p className="font-body text-silver-light text-sm">Você será redirecionado para o WhatsApp.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Honeypot */}
                  <input
                    name="website"
                    type="text"
                    value={form.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    aria-hidden="true"
                    style={{ display: 'none' }}
                  />

                  {[
                    { name: 'nome', label: 'Nome completo', type: 'text', placeholder: 'Seu nome' },
                    { name: 'telefone', label: 'Telefone', type: 'tel', placeholder: '(63) 9 9999-9999' },
                    { name: 'email', label: 'E-mail', type: 'email', placeholder: 'seu@email.com' },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="font-body text-xs text-silver-light block mb-2">{field.label}</label>
                      <input
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={form[field.name as keyof FormContato]}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-body text-sm text-white placeholder-silver/50 focus:outline-none focus:border-gold/60 transition-colors duration-300"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="font-body text-xs text-silver-light block mb-2">Tipo de imóvel</label>
                    <select
                      name="tipoImovel"
                      value={form.tipoImovel}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-body text-sm text-white focus:outline-none focus:border-gold/60 transition-colors duration-300 appearance-none"
                    >
                      <option value="" className="bg-lead">Selecione...</option>
                      {tiposImovel.map((t) => (
                        <option key={t} value={t} className="bg-lead">{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-body text-xs text-silver-light block mb-2">Mensagem</label>
                    <textarea
                      name="mensagem"
                      value={form.mensagem}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Conte um pouco sobre o que você está buscando..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-body text-sm text-white placeholder-silver/50 focus:outline-none focus:border-gold/60 transition-colors duration-300 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    isLoading={status === 'loading'}
                    disabled={status === 'loading'}
                  >
                    <Send className="w-4 h-4" />
                    Enviar mensagem
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
