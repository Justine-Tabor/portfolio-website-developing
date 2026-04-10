import { useEffect, useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Navbar({ links, activeSection, logo, ctaText, ctaTarget }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const closeMenu = () => setOpen(false)
    window.addEventListener('resize', closeMenu)
    return () => window.removeEventListener('resize', closeMenu)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-4 py-3 backdrop-blur-xl transition duration-300 sm:px-6 ${
          scrolled
            ? 'border-white/15 bg-zinc-950/60 shadow-[0_12px_40px_-25px_rgba(232,121,249,0.55)]'
            : 'border-white/10 bg-zinc-950/25'
        }`}
      >
        <a href="#home" className="group flex items-center gap-2">
          <span className="rounded-lg bg-gradient-to-r from-fuchsia-500 to-violet-500 px-2 py-1 text-xs font-bold tracking-[0.2em] text-white">
            {logo}
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`relative rounded-xl px-3 py-2 text-sm transition ${
                activeSection === link.id
                  ? 'text-fuchsia-100'
                  : 'text-zinc-300 hover:text-zinc-100'
              }`}
            >
              {activeSection === link.id ? (
                <Motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 -z-10 rounded-xl border border-fuchsia-300/35 bg-fuchsia-500/20"
                  transition={{ type: 'spring', stiffness: 380, damping: 35 }}
                />
              ) : null}
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={ctaTarget}
            className="hidden rounded-xl border border-fuchsia-300/40 bg-fuchsia-500/20 px-4 py-2 text-sm font-medium text-fuchsia-100 transition hover:bg-fuchsia-500/30 sm:inline-flex"
          >
            {ctaText}
          </a>
          <button
            type="button"
            className="inline-flex rounded-xl border border-white/15 bg-white/5 p-2 text-zinc-100 md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle navigation menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <Motion.div
            className="mx-auto mt-2 max-w-6xl rounded-2xl border border-white/15 bg-zinc-950/95 p-3 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
          >
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                className={`mb-1 block rounded-xl px-3 py-2 text-sm last:mb-0 ${
                  activeSection === link.id
                    ? 'bg-fuchsia-500/20 text-fuchsia-100'
                    : 'text-zinc-300'
                }`}
              >
                {link.label}
              </a>
            ))}
          </Motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

