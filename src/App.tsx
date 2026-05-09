import { useState, useEffect } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { AnimatePresence, motion } from 'framer-motion'

import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'

import Navbar from '@/sections/Navbar'
import HeroSection from '@/sections/HeroSection'
import SobreSection from '@/sections/SobreSection'
import ServicosSection from '@/sections/ServicosSection'
import ImoveisSection from '@/sections/ImoveisSection'
import ProcessoSection from '@/sections/ProcessoSection'
import ContatoSection from '@/sections/ContatoSection'
import Footer from '@/sections/Footer'

import { SITE_CONFIG } from '@/data/site'

function LoadingScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1800)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center gap-6"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="font-body text-xs text-gold tracking-[0.3em] uppercase mb-3">
          {SITE_CONFIG.corretor.imobiliaria}
        </p>
        <h1 className="font-display text-4xl font-bold text-white">
          {SITE_CONFIG.corretor.nome}
        </h1>
        <p className="font-body text-sm text-silver mt-2">{SITE_CONFIG.corretor.titulo}</p>
      </motion.div>

      <motion.div
        className="w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      />

      <motion.div
        className="flex gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-gold"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const { seo } = SITE_CONFIG

  return (
    <HelmetProvider>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords.join(', ')} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content={SITE_CONFIG.corretor.nome} />
        <meta name="geo.region" content="BR-TO" />
        <meta name="geo.placename" content="Palmas" />
        <link rel="canonical" href={seo.siteUrl} />

        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:image" content={seo.ogImage} />
        <meta property="og:url" content={seo.siteUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pt_BR" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={seo.ogImage} />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'RealEstateAgent',
            name: SITE_CONFIG.corretor.nome,
            description: seo.description,
            url: seo.siteUrl,
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Palmas',
              addressRegion: 'TO',
              addressCountry: 'BR',
            },
            sameAs: [SITE_CONFIG.corretor.instagram],
          })}
        </script>
      </Helmet>

      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loading" onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          <main>
            <HeroSection />
            <div className="gold-divider" />
            <SobreSection />
            <div className="gold-divider" />
            <ServicosSection />
            <div className="gold-divider" />
            <ImoveisSection />
            <div className="gold-divider" />
            <ProcessoSection />
            <div className="gold-divider" />
            <ContatoSection />
          </main>
          <Footer />
        </motion.div>
      )}
    </HelmetProvider>
  )
}
