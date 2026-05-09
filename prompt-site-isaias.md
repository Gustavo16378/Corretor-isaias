# 🏠 PROMPT — Site Profissional: Isaias de Sousa | Corretor de Imóveis

---

## 🎯 CONTEXTO GERAL

Você é um desenvolvedor front-end sênior especializado em sites de alto padrão e experiências digitais únicas. Sua missão é construir o site profissional do corretor de imóveis **Isaias de Sousa**, associado à **Imobiliária Ricanato**, em **Palmas – TO**.

Este site **não pode ser genérico**. Nada de templates prontos, layouts copiados ou componentes de biblioteca visual padrão. Cada detalhe visual deve ser pensado exclusivamente para a identidade deste profissional. O resultado deve parecer um produto de agência de alto nível — algo que o cliente jamais viu em outro corretor.

---

## 🛠️ STACK TÉCNICA

```
React 19 + TypeScript + Vite + Tailwind CSS v3 + Lucide React
```

- Componentes funcionais com hooks (sem class components)
- Tipagem TypeScript estrita em tudo
- Tailwind para estilização (sem CSS-in-JS externo)
- Animações: **Framer Motion** (instale como dependência)
- Ícones: Lucide React
- SEO: `react-helmet-async` (instale como dependência)
- Estrutura de pastas limpa: `src/components/`, `src/sections/`, `src/assets/`, `src/data/`, `src/hooks/`, `src/types/`

---

## 🎨 DESIGN SYSTEM — IDENTIDADE VISUAL EXCLUSIVA

### Paleta de Cores

```
--color-black:     #0A0A0A       /* Preto profundo — fundo principal */
--color-lead:      #141414       /* Preto chumbado — cards, seções alternas */
--color-charcoal:  #1E1E1E       /* Cinza escuro — bordas, separadores */
--color-silver:    #8A9099       /* Prata fria — textos secundários */
--color-silver-light: #C0C8D0   /* Prata clara — subtítulos */
--color-gold:      #C8972A       /* Ouro caramelo — cor principal de destaque */
--color-gold-light:#E8B84B       /* Ouro claro — hover, brilho */
--color-gold-dim:  #9A6E1A       /* Ouro escuro — sombras douradas */
--color-white:     #F5F5F5       /* Branco suave — textos principais */
```

### Tipografia

- **Display / Títulos grandes**: `Playfair Display` (Google Fonts) — serif elegante, transmite luxo e autoridade
- **Body / UI**: `Inter` (Google Fonts) — limpa, legível, moderna
- **Acento decorativo**: use `font-style: italic` em palavras-chave douradas para destaque visual

### Princípios de Design

1. **Tema 100% escuro** — fundo principal `#0A0A0A`, jamais use branco como fundo
2. **Dourado como alma do site** — use `#C8972A` em títulos de seção, CTAs, bordas decorativas, underlines animados e elementos gráficos exclusivos
3. **Espaçamento generoso** — `padding` e `gap` maiores que o convencional. Respira. Luxo é espaço.
4. **Micro-animações obrigatórias** — hover com `scale`, `opacity` e `translateY` suaves. Nada brusco.
5. **Efeito glassmorphism sutil** em cards: `backdrop-blur`, `bg-white/5`, borda `border-white/10`
6. **Gradientes dourados** só em elementos estratégicos (não em tudo — moderação é elegância)
7. **Linha decorativa dourada** (`h-px bg-gradient-to-r from-transparent via-gold to-transparent`) entre seções
8. **Cursor personalizado** — implemente um cursor customizado em forma de ponto dourado que se expande ao hover em links/botões

---

## 📐 ARQUITETURA DO SITE — SEÇÕES

### 0. CONFIG — `src/data/site.ts`

Crie um arquivo central com todos os dados do site (nome, contatos, imóveis, etc.) para fácil edição futura:

```typescript
export const SITE_CONFIG = {
  corretor: {
    nome: "Isaias de Sousa",
    titulo: "Corretor de Imóveis",
    creci: "CRECI-TO XXXXXX", // placeholder
    instagram: "https://instagram.com/isaiass_ssousa",
    whatsapp: "55XXXXXXXXXXX", // placeholder para o número
    email: "isaias@ricanato.com.br", // placeholder
    imobiliaria: "Imobiliária Ricanato",
    cidade: "Palmas – TO",
  },
  seo: {
    title: "Isaias de Sousa | Corretor de Imóveis de Alto Padrão em Palmas – TO",
    description: "Especialista em imóveis residenciais, de alto padrão e lançamentos em Palmas – TO. Atendimento personalizado com a Imobiliária Ricanato.",
    keywords: ["corretor de imóveis Palmas", "imóveis alto padrão Palmas TO", "Imobiliária Ricanato", "comprar imóvel Palmas", "lançamentos Palmas TO"],
    ogImage: "/og-image.jpg",
  }
}
```

---

### 1. NAVBAR — Componente `<Navbar />`

**Comportamento:**
- Inicia **transparente** sobre o hero (sem background)
- Ao rolar 80px, transiciona suavemente para `bg-black/90 backdrop-blur-md` com borda inferior dourada `border-b border-gold/20`
- Logo à esquerda: nome "**Isaias de Sousa**" em Playfair Display com um ponto dourado `·` decorativo
- Menu central (desktop): links âncora para `#sobre`, `#servicos`, `#imoveis`, `#processo`, `#contato`
- Cada link com underline animado dourado no hover (pseudo-elemento CSS com `scaleX`)
- Botão CTA à direita: "Falar com Isaias" — outlined dourado que ao hover preenche com gradiente dourado
- **Mobile**: hamburger menu que abre um drawer lateral escuro com animação suave (Framer Motion)
- `position: fixed`, `z-index: 50`

---

### 2. HERO SECTION — `<HeroSection />`

**Conceito visual**: Tela cheia imersiva. O visitante deve sentir imediatamente que está diante de um profissional de alto padrão.

**Layout (desktop)**:
- Fundo: foto de hero do corretor ocupando 100vh, com overlay `bg-gradient-to-r from-black/90 via-black/60 to-transparent`
- Conteúdo posicionado à esquerda, centralizado verticalmente
- Elemento decorativo: linha vertical dourada animada à esquerda do texto (2px de largura, altura animada de 0 → 120px na entrada)

**Texto hierárquico com animação de entrada (stagger com Framer Motion)**:
```
[linha pequena dourada + texto]  "Palmas – TO · Imobiliária Ricanato"
[título principal]               "O imóvel certo
                                  começa com o
                                  corretor certo."
[subtítulo]                      "Especialista em imóveis residenciais,
                                  alto padrão e lançamentos."
[CTAs]                           [Botão primário: "Ver imóveis disponíveis"]
                                 [Botão secundário: "Conheça minha história →"]
```

- Título em Playfair Display, ~72px desktop / ~40px mobile, com a palavra "certo" em itálico dourado
- **Efeito parallax sutil** na imagem de fundo ao rolar (usando `useScroll` do Framer Motion)
- **Indicador de scroll** no rodapé do hero: ícone de seta animada + texto "role para conhecer"
- **Badge flutuante** no canto inferior direito com efeito glassmorphism: "✓ CRECI-TO Ativo" + "X anos de experiência"

**Mobile**: Foto centralizada com overlay mais forte, texto menor mas mantendo a hierarquia

---

### 3. SOBRE — `<SobreSection />` id="sobre"

**Conceito**: Humanizar o corretor. Não é só currículo — é personalidade e propósito.

**Layout (desktop)**: Dois blocos lado a lado (60/40)
- **Esquerda**: Foto profissional do Isaias com tratamento visual exclusivo:
  - Borda dourada animada ao redor da foto (pseudo-elemento que "desenha" a borda no scroll com `pathLength` do Framer Motion)
  - Stat badges flutuantes ao redor da foto com glassmorphism:
    - "📍 Palmas – TO"
    - "🏆 X anos no mercado"
    - "🤝 Imobiliária Ricanato"
- **Direita**: Conteúdo textual
  - Label: "SOBRE MIM" com linha dourada decorativa
  - Título: "Mais do que um corretor, um parceiro na maior decisão da sua vida."
  - Parágrafos com texto sobre o Isaias (use placeholders realistas que ele pode substituir depois)
  - Valores pessoais em lista estilizada com ícone dourado: Transparência · Comprometimento · Resultado
  - CTA: "Vamos conversar?" com ícone do WhatsApp

**Animação**: seção entra com `fadeInUp` ao entrar no viewport (Intersection Observer via Framer Motion `whileInView`)

---

### 4. SERVIÇOS — `<ServicosSection />` id="servicos"

**Conceito**: Mostrar as especialidades de forma visual e impactante. Não é uma lista — é uma vitrine.

**Layout**: 3 cards em grid (desktop) / carrossel touch (mobile)

**Cards** com glassmorphism e borda dourada sutil:
- Ícone Lucide dourado grande (64px)
- Número decorativo em background: "01", "02", "03" em fonte enorme, cor `gold/5` (quase invisível, efeito decorativo)
- Título do serviço
- Descrição

**Serviços**:
1. **Imóveis Residenciais** — Casas e apartamentos para quem busca qualidade de vida em Palmas
2. **Alto Padrão & Luxo** — Imóveis exclusivos para clientes que exigem o melhor
3. **Lançamentos** — Acesso antecipado aos melhores empreendimentos da cidade

**Efeito hover nos cards**: leve `translateY(-8px)`, borda dourada mais visível, sombra dourada difusa `box-shadow: 0 20px 60px rgba(200, 151, 42, 0.15)`

**Fundo da seção**: `#141414` (ligeiramente diferente do preto puro para criar ritmo visual)

---

### 5. CATÁLOGO DE IMÓVEIS — `<ImoveisSection />` id="imoveis"

**Conceito**: Elegante e funcional. Filtros simples, cards ricos.

**Filtros no topo** (pills/tabs estilizadas):
- Todos · Residencial · Alto Padrão · Lançamentos
- Tab ativa: fundo dourado, texto preto
- Tabs inativas: borda `border-gold/30`, texto prata

**Cards de Imóvel** (`<ImovelCard />`):
```typescript
type Imovel = {
  id: string
  titulo: string
  tipo: "residencial" | "alto-padrao" | "lancamento"
  preco: string
  localizacao: string
  area: string
  quartos: number
  banheiros: number
  vagas: number
  fotos: string[]
  destaque: boolean
  tag?: "Novo" | "Exclusivo" | "Lançamento"
}
```

**Design do card**:
- Foto com aspect-ratio 4/3, com overlay gradiente no hover revelando botão "Ver detalhes"
- Tag no canto superior esquerdo (badge dourado/prata)
- Preço em dourado, bold, Playfair Display
- Ícones Lucide (bed, bath, car, maximize) com especificações
- Borda inferior dourada de 2px no hover
- Ao clicar: abre um **modal elegante** com galeria de fotos (lightbox customizado), especificações completas e botão de WhatsApp direto

**Filtros com animação**: `AnimatePresence` + `layout` do Framer Motion para transição suave dos cards ao filtrar

**Placeholder de dados**: crie 6 imóveis fictícios realistas com dados de Palmas-TO para demonstração

---

### 6. PROCESSO — `<ProcessoSection />` id="processo"

**Conceito** *(seção exclusiva sugerida)*: Mostrar como é trabalhar com o Isaias — reduz objeções e gera confiança. Diferenciar pela transparência do processo.

**Layout**: Linha do tempo horizontal (desktop) / vertical (mobile) com 4 etapas

**Título**: "Como funciona trabalhar comigo"
**Subtítulo**: "Do primeiro contato até a chave na sua mão — sem surpresas."

**Etapas**:
1. **Conversa inicial** — "Entendo suas necessidades, orçamento e sonhos. Sem pressão, sem pressa."
2. **Curadoria personalizada** — "Seleciono apenas imóveis que fazem sentido pra você. Zero perda de tempo."
3. **Visitas e negociação** — "Acompanho você em cada visita e negocio as melhores condições."
4. **Fechamento seguro** — "Cuido de toda a documentação. Você só assina quando tudo estiver perfeito."

**Design da linha do tempo**:
- Círculo numerado dourado conectado por linha dourada (`h-px` no desktop, `w-px` no mobile)
- Círculo "pulsa" com animação quando entra no viewport
- Card de cada etapa com glassmorphism
- Número grande decorativo em background (como nos cards de serviços)

**Fundo**: `#0A0A0A` com textura sutil (padrão SVG geométrico de baixíssima opacidade — tipo linhas diagonais ou grid em `gold/3`)

---

### 7. CONTATO — `<ContatoSection />` id="contato"

**Conceito**: Conversão final. Fácil, elegante, direto.

**Layout (desktop)**: Dois blocos (50/50)

**Esquerda — Informações**:
- Título: "Pronto para encontrar o imóvel dos seus sonhos?"
- Subtítulo: "Respondo em até 2 horas. Atendimento personalizado do início ao fim."
- Cards de contato com ícone dourado:
  - WhatsApp: número com link direto `https://wa.me/...`
  - Instagram: `@isaiass_ssousa` com link
  - Localização: Palmas – TO
  - Imobiliária: Ricanato
- Horário de atendimento (placeholder)

**Direita — Formulário**:
- Campos: Nome, Telefone (com máscara), E-mail, Tipo de imóvel (select), Mensagem
- Estilo dos inputs: `bg-white/5 border border-white/10 focus:border-gold` — sem caixa tradicional, aparência premium
- Botão submit: gradiente dourado, texto "Enviar mensagem" com ícone send do Lucide
- Feedback visual ao enviar (estado de loading + success com animação)
- **Segurança do formulário**: sanitização de inputs, rate limiting básico no front (desabilitar botão por 3s após envio), honeypot field oculto para bots

---

### 8. FOOTER — `<Footer />`

- Logo/nome + tagline: "Realizando sonhos em Palmas, um imóvel por vez."
- Links rápidos para as seções
- Ícones sociais (Instagram, WhatsApp)
- CRECI-TO
- Copyright © 2025 Isaias de Sousa · Todos os direitos reservados
- Linha dourada decorativa no topo do footer
- Texto: "Desenvolvido com ✦ em Palmas – TO"

---

## 🔍 SEO — REQUISITOS OBRIGATÓRIOS

Use `react-helmet-async` com `HelmetProvider` no root:

```typescript
// Em cada página/seção relevante
<Helmet>
  <title>Isaias de Sousa | Corretor de Imóveis de Alto Padrão em Palmas – TO</title>
  <meta name="description" content="..." />
  <meta name="keywords" content="..." />

  {/* Open Graph */}
  <meta property="og:title" content="..." />
  <meta property="og:description" content="..." />
  <meta property="og:image" content="/og-image.jpg" />
  <meta property="og:url" content="https://isaiassousa.com.br" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="pt_BR" />

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="..." />
  <meta name="twitter:description" content="..." />
  <meta name="twitter:image" content="/og-image.jpg" />

  {/* Técnico */}
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://isaiassousa.com.br" />
  <meta name="author" content="Isaias de Sousa" />
  <meta name="geo.region" content="BR-TO" />
  <meta name="geo.placename" content="Palmas" />
</Helmet>
```

**Schema.org JSON-LD** (adicione no `<head>` via Helmet):
```json
{
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "Isaias de Sousa",
  "description": "Corretor de imóveis especialista em alto padrão e lançamentos em Palmas – TO",
  "url": "https://isaiassousa.com.br",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Palmas",
    "addressRegion": "TO",
    "addressCountry": "BR"
  },
  "sameAs": [
    "https://instagram.com/isaiass_ssousa"
  ]
}
```

**Performance SEO**:
- Todas as imagens com `alt` descritivo e relevante
- Hierarquia de headings correta: um único `<h1>` no hero, `<h2>` por seção, `<h3>` em cards
- Lazy loading em imagens (`loading="lazy"`)
- `<a>` externos com `rel="noopener noreferrer"`
- Fonte carregada com `font-display: swap`

---

## 🔒 SEGURANÇA — REQUISITOS

1. **Sanitização de inputs**: use `DOMPurify` ou sanitização manual nos campos do formulário antes de qualquer processamento
2. **Links externos seguros**: todo `<a target="_blank">` deve ter `rel="noopener noreferrer"`
3. **Sem exposição de dados sensíveis**: número de WhatsApp e e-mail em variáveis de ambiente (`import.meta.env.VITE_WHATSAPP`, etc.) — nunca hardcoded no código
4. **Content Security Policy**: configure no `vite.config.ts` headers básicos de segurança
5. **Honeypot anti-spam** no formulário: campo oculto `<input name="website" style="display:none" tabIndex={-1} />` — se preenchido, rejeitar silenciosamente
6. **Rate limit de formulário**: disable o botão por 5 segundos após cada envio para evitar spam
7. **HTTPS**: garantir que todos os recursos externos (Google Fonts, etc.) sejam carregados via HTTPS
8. **Sem `dangerouslySetInnerHTML`** a menos que absolutamente necessário e com sanitização prévia

---

## ✨ ANIMAÇÕES E UX — REQUISITOS DE QUALIDADE

- **Scroll suave** (`scroll-behavior: smooth` no `html`)
- **Framer Motion `whileInView`** em todas as seções para entrada elegante
- **Stagger animations**: quando múltiplos elementos entram juntos (cards, stats), usar `staggerChildren: 0.1`
- **Cursor customizado**: ponto dourado 12px que cresce para 40px ao hover em elementos interativos (implemente em `src/components/CustomCursor.tsx`)
- **Scroll progress bar**: linha dourada no topo da página que cresce conforme o usuário rola (use `useScroll` + `useTransform` do Framer Motion)
- **Loading state**: tela de loading inicial (~1.5s) com logo/nome animado antes do site aparecer (`AnimatePresence`)
- **Transições de seção suaves**: divisores com linha `via-gold` gradiente
- **Botão flutuante de WhatsApp**: fixo no canto inferior direito, aparece após 3s, com animação de pulso dourado

---

## 📁 ESTRUTURA DE ARQUIVOS ESPERADA

```
src/
├── assets/
│   ├── images/          # fotos do hero, seções, imóveis
│   └── fonts/           # se necessário
├── components/
│   ├── CustomCursor.tsx
│   ├── ScrollProgress.tsx
│   ├── WhatsAppButton.tsx
│   ├── ImovelCard.tsx
│   ├── ImovelModal.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Badge.tsx
│       └── SectionLabel.tsx
├── sections/
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── SobreSection.tsx
│   ├── ServicosSection.tsx
│   ├── ImoveisSection.tsx
│   ├── ProcessoSection.tsx
│   ├── ContatoSection.tsx
│   └── Footer.tsx
├── data/
│   ├── site.ts          # configurações centrais
│   └── imoveis.ts       # dados dos imóveis
├── hooks/
│   ├── useScrollProgress.ts
│   └── useInView.ts
├── types/
│   └── index.ts         # tipos TypeScript globais
├── App.tsx
├── main.tsx
└── index.css            # variáveis CSS + Tailwind base
```

---

## 🚀 ENTREGÁVEIS FINAIS

1. **Todos os componentes** implementados conforme spec acima
2. **`tailwind.config.ts`** com as cores customizadas, fontes e extensões do design system
3. **`vite.config.ts`** configurado com alias `@/` para `src/`
4. **`index.css`** com variáveis CSS, imports do Google Fonts e reset customizado
5. **`.env.example`** com as variáveis de ambiente necessárias
6. **Responsividade completa**: mobile-first, breakpoints `sm/md/lg/xl` do Tailwind
7. **Placeholders realistas**: textos, dados de imóveis e stats fictícios de alta qualidade para Palmas-TO

---

## ⚠️ REGRAS INVIOLÁVEIS

- ❌ Sem componentes de UI genéricos (Shadcn, MUI, Bootstrap, etc.)
- ❌ Sem templates prontos ou layouts copiados
- ❌ Sem cores claras como fundo (o site é 100% dark)
- ❌ Sem animações bruscas ou exageradas
- ✅ Tudo deve ser único, pensado para o Isaias de Sousa especificamente
- ✅ Cada pixel deve comunicar: luxo, confiança, profissionalismo e modernidade
- ✅ O site deve parecer caro — porque o cliente dele compra imóveis caros

---

*Prompt criado para o projeto iepes-site · Isaias de Sousa Corretor · Palmas – TO*
