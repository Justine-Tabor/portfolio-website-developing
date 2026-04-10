import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Expertise from './components/sections/Expertise'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Timeline from './components/sections/Timeline'
import Resume from './components/sections/Resume'
import Contact from './components/sections/Contact'
import AnimatedBackground from './components/ui/AnimatedBackground'
import GalaxyParticles from './components/ui/GalaxyParticles'
import { useActiveSection } from './hooks/useActiveSection'
import {
  getPortfolioDataWithOverrides,
  loadAdminOverrides,
} from './data/portfolioOverrides'

const sectionIds = ['home', 'about', 'expertise', 'skills', 'projects', 'experience', 'resume', 'contact']

function App() {
  const activeSection = useActiveSection(sectionIds)
  const [loading, setLoading] = useState(true)
  const data = useMemo(
    () => getPortfolioDataWithOverrides(loadAdminOverrides()),
    [],
  )

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 650)
    return () => window.clearTimeout(timer)
  }, [])

  const {
    aboutStats,
    aboutContent,
    certifications,
    contactCards,
    expertiseItems,
    footerLinks,
    heroTools,
    heroCtas,
    navConfig,
    navLinks,
    profile,
    projects,
    skillCategories,
    socialLinks,
    timelineItems,
  } = data

  return (
    <div className="relative isolate min-h-screen bg-zinc-950 text-zinc-100">
      <AnimatedBackground />
      <GalaxyParticles />
      <div className="relative z-10">
        <Navbar
          links={navLinks}
          activeSection={activeSection}
          logo={navConfig.logo}
          ctaText={navConfig.ctaText}
          ctaTarget={navConfig.ctaTarget}
        />

        <AnimatePresence>
          {loading ? (
            <Motion.div
              className="fixed inset-0 z-[60] grid place-items-center bg-zinc-950"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Motion.div
                className="h-14 w-14 rounded-2xl border border-fuchsia-300/40 bg-fuchsia-500/20"
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
              />
            </Motion.div>
          ) : null}
        </AnimatePresence>

        <main>
          <Hero profile={profile} socialLinks={socialLinks} tools={heroTools} ctas={heroCtas} />
          <About stats={aboutStats} aboutContent={aboutContent} />
          <Expertise items={expertiseItems} />
          <Skills categories={skillCategories} />
          <Projects projectItems={projects} />
          <Timeline items={timelineItems} />
          <Resume resumeLink={profile.resumeLink} certifications={certifications} />
          <Contact cards={contactCards} />
        </main>

        <Footer name={profile.name} socialLinks={socialLinks} quickLinks={footerLinks} />
      </div>
    </div>
  )
}

export default App

