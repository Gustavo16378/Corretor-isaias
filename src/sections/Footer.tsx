import { Instagram, MessageCircle } from 'lucide-react'
import { SITE_CONFIG } from '@/data/site'

export default function Footer() {
  return (
    <footer className="bg-lead border-t border-charcoal">
      <div className="gold-divider" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-2 gap-10 mb-10 max-w-2xl mx-auto">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-display text-xl font-semibold text-white">Isaias de Sousa</span>
              <span className="text-gold text-2xl leading-none">·</span>
            </div>
            <p className="font-body text-sm text-silver leading-relaxed">
              Realizando sonhos em Palmas, um imóvel por vez.
            </p>
          </div>

          {/* Redes sociais */}
          <div>
            <h3 className="font-display text-sm font-semibold text-gold mb-4 uppercase tracking-wider">Redes sociais</h3>
            <div className="flex gap-3 mb-4">
              <a
                href={SITE_CONFIG.corretor.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass-card flex items-center justify-center text-silver-light hover:text-gold hover:border-gold/30 transition-all duration-300"
                aria-label="Instagram de Isaias de Sousa"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${SITE_CONFIG.corretor.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass-card flex items-center justify-center text-silver-light hover:text-gold hover:border-gold/30 transition-all duration-300"
                aria-label="WhatsApp de Isaias de Sousa"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
            <p className="font-body text-xs text-silver">
              {SITE_CONFIG.corretor.imobiliaria}<br />
              {SITE_CONFIG.corretor.cidade}
            </p>
          </div>
        </div>

        <div className="gold-divider mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-body text-xs text-silver text-center sm:text-left">
            © {new Date().getFullYear()} Isaias de Sousa · Todos os direitos reservados
          </p>
          <p className="font-body text-xs text-silver">
            Desenvolvido com ✦ em Palmas – TO
          </p>
        </div>
      </div>
    </footer>
  )
}
