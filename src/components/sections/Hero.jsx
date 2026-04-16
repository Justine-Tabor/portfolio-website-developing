import { AnimatePresence, motion as Motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  Copy,
  Download,
  Mail,
  Phone,
} from 'lucide-react'

const socialIconMap = {
  linkedin: BriefcaseBusiness,
  mail: Mail,
  phone: Phone,
}

export default function Hero({ profile, socialLinks, tools, ctas }) {
  const [expandedContact, setExpandedContact] = useState(null)
  const [copiedContact, setCopiedContact] = useState(null)

  const photoSrc = profile.photo
    ? profile.photo.startsWith('http') || profile.photo.startsWith('/')
      ? profile.photo
      : `/${profile.photo}`
    : null

  const isPlaceholder = (value) => value?.includes('[PUT')

  const heroContacts = useMemo(() => {
    const linkedIn = socialLinks.find((item) => item.type === 'linkedin')
    const email = socialLinks.find((item) => item.type === 'mail')
    return [
      { label: 'Phone', type: 'phone', href: '', value: profile.phone },
      ...(linkedIn ? [linkedIn] : []),
      ...(email ? [email] : []),
    ]
  }, [profile.phone, socialLinks])

  const toggleContact = (type) => {
    setExpandedContact((prev) => (prev === type ? null : type))
  }

  const handleCopy = async (event, type, value) => {
    event.stopPropagation()
    if (!value || isPlaceholder(value)) {
      return
    }
    try {
      await navigator.clipboard.writeText(value)
      setCopiedContact(type)
      window.setTimeout(() => {
        setCopiedContact((current) => (current === type ? null : current))
      }, 1200)
    } catch {
      setCopiedContact(null)
    }
  }

  return (
    <section id="home" className="relative scroll-mt-28 px-6 pt-32 pb-20 sm:pt-36">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-zinc-100 sm:text-6xl">
              Hi, I&apos;m{' '}
              <span className="bg-gradient-to-r from-fuchsia-400 via-pink-300 to-violet-300 bg-clip-text text-transparent">
                Justine Michael Tabor
              </span>{' '}
              a Computer Engineer.
            </h1>
            <p className="max-w-2xl text-base text-zinc-300 sm:text-lg">
              {profile.subheadline}
            </p>
            <p className="max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
              {profile.summary}
            </p>
            <p className="max-w-2xl text-sm font-medium text-fuchsia-100/90 sm:text-base">
              {profile.tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {ctas.map((cta) => (
              <a
                key={cta.label}
                href={cta.href}
                target={cta.label.toLowerCase().includes('resume') ? '_blank' : undefined}
                rel={cta.label.toLowerCase().includes('resume') ? 'noreferrer' : undefined}
                className={cta.type === 'primary' ? 'btn-primary' : 'btn-secondary'}
              >
                {cta.label}
                {cta.label.toLowerCase().includes('project') ? (
                  <ArrowRight className="h-4 w-4" />
                ) : null}
                {cta.label.toLowerCase().includes('resume') ? (
                  <Download className="h-4 w-4" />
                ) : null}
              </a>
            ))}
          </div>

          <Motion.div layout className="flex flex-wrap items-center gap-3">
            {heroContacts.map((item) => {
              const Icon = socialIconMap[item.type] ?? Mail
              const isPhone = item.type === 'phone'
              const isEmail = item.type === 'mail'
              const isExpandable = isPhone || isEmail
              const isExpanded = isExpandable ? expandedContact === item.type : false
              const displayValue = isPhone ? profile.phone : item.href?.replace(/^mailto:/, '')

              if (item.type === 'linkedin') {
                return (
                  <Motion.a
                    layout
                    transition={{ type: 'spring', stiffness: 340, damping: 30 }}
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-zinc-200 transition hover:border-fuchsia-400/45 hover:text-zinc-100"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Motion.a>
                )
              }

              return (
                <Motion.button
                  layout
                  transition={{ type: 'spring', stiffness: 340, damping: 30 }}
                  type="button"
                  key={item.label}
                  onClick={() => toggleContact(item.type)}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] px-3 py-2 text-sm text-zinc-200 transition hover:border-fuchsia-400/45 hover:text-zinc-100"
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="whitespace-nowrap">{item.label}</span>
                  <AnimatePresence initial={false}>
                    {isExpanded && displayValue && !isPlaceholder(displayValue) ? (
                      <Motion.span
                        key={`${item.type}-value`}
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 'auto', opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="overflow-hidden whitespace-nowrap text-zinc-100/90"
                      >
                        <span className="ml-2 inline-flex items-center gap-2">
                          {displayValue}
                          <button
                            type="button"
                            onClick={(event) => handleCopy(event, item.type, displayValue)}
                            aria-label={`Copy ${item.label}`}
                            className="inline-flex rounded-md border border-white/15 bg-white/5 p-1 text-zinc-200 transition hover:border-fuchsia-400/45 hover:text-zinc-100"
                          >
                            {copiedContact === item.type ? (
                              <Check className="h-3.5 w-3.5" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                          </button>
                        </span>
                      </Motion.span>
                    ) : null}
                  </AnimatePresence>
                </Motion.button>
              )
            })}
          </Motion.div>

          <div className="flex flex-wrap gap-2">
            {tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-white/12 bg-zinc-900/65 px-3 py-1.5 text-xs text-zinc-300"
              >
                {tool}
              </span>
            ))}
          </div>
        </Motion.div>

        <Motion.div
          className="relative mx-auto w-full max-w-[420px]"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          whileHover={{ scale: 1.01 }}
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] p-3 shadow-[0_24px_60px_-32px_rgba(0,0,0,0.75)] backdrop-blur-md">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-900/45">
              {photoSrc ? (
                <img
                  src={photoSrc}
                  alt={`${profile.name} portrait`}
                  className="h-full w-full object-cover object-center transition duration-300 hover:brightness-105"
                />
              ) : (
                <div className="relative grid h-full w-full place-items-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
                  <div className="text-center">
                    <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Engineer</p>
                    <p className="mt-2 text-2xl font-semibold text-zinc-100">{profile.name}</p>
                    <p className="mt-2 text-sm text-zinc-300">Systems | Software | Automation</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Motion.div>
      </div>
    </section>
  )
}
