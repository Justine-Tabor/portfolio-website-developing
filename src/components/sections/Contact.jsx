import { motion as Motion } from 'framer-motion'
import { BriefcaseBusiness, FolderGit2, Mail, MapPin, Phone } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'

const iconMap = {
  mail: Mail,
  phone: Phone,
  github: FolderGit2,
  linkedin: BriefcaseBusiness,
  map: MapPin,
}

const getHref = (card) => {
  if (card.type === 'mail') {
    return `mailto:${card.value}`
  }
  if (card.type === 'phone') {
    return `tel:${card.value}`
  }
  if (card.type === 'linkedin') {
    const normalized = card.value.replace(/\s+/g, '')
    if (!normalized) {
      return ''
    }
    return normalized.startsWith('http://') || normalized.startsWith('https://')
      ? normalized
      : `https://${normalized}`
  }
  return ''
}

export default function Contact({ cards }) {
  return (
    <section id="contact" className="scroll-mt-28 px-6 pt-20 pb-24">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build dependable systems together."
          description="Open to full-time roles and meaningful collaborations where reliability and quality matter."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = iconMap[card.type] ?? Mail
            const href = getHref(card)
            const isLink = Boolean(href && !card.value.includes('[PUT'))

            return (
              <Motion.div
                key={`${card.label}-${card.value}`}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 rounded-xl border border-fuchsia-300/35 bg-fuchsia-500/15 p-2 text-fuchsia-100">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-zinc-400">{card.label}</p>
                    {isLink ? (
                      <a
                        href={href}
                        target={card.type === 'linkedin' ? '_blank' : undefined}
                        rel={card.type === 'linkedin' ? 'noreferrer' : undefined}
                        className="text-sm text-zinc-100 underline-offset-4 hover:underline"
                      >
                        {card.value}
                      </a>
                    ) : (
                      <p className="text-sm text-zinc-100">{card.value}</p>
                    )}
                  </div>
                </div>
              </Motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
