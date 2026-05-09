export const SITE_CONFIG = {
  corretor: {
    nome: 'Isaias de Sousa',
    titulo: 'Corretor de Imóveis',
    creci: 'CRECI-TO 12345',
    experiencia: '8',
    instagram: import.meta.env.VITE_INSTAGRAM as string || 'https://instagram.com/isaiass_ssousa',
    whatsapp: import.meta.env.VITE_WHATSAPP as string || '5563999999999',
    email: import.meta.env.VITE_EMAIL as string || 'isaias@ricanato.com.br',
    imobiliaria: 'Imobiliária Ricanato',
    cidade: 'Palmas – TO',
    horario: 'Seg a Sex: 8h às 18h | Sáb: 8h às 13h',
  },
  seo: {
    title: 'Isaias de Sousa | Corretor de Imóveis de Alto Padrão em Palmas – TO',
    description:
      'Especialista em imóveis residenciais, de alto padrão e lançamentos em Palmas – TO. Atendimento personalizado com a Imobiliária Ricanato.',
    keywords: [
      'corretor de imóveis Palmas',
      'imóveis alto padrão Palmas TO',
      'Imobiliária Ricanato',
      'comprar imóvel Palmas',
      'lançamentos Palmas TO',
    ],
    ogImage: '/og-image.jpg',
    siteUrl: 'https://isaiassousa.com.br',
  },
}
