import { motion as Motion } from 'framer-motion'
import { BriefcaseBusiness, FolderGit2, Mail, MapPin, Phone } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'

const iconMap = {
  mail: Mail,
  phone: Phone,
  map: MapPin,
  github: FolderGit2,
  linkedin: BriefcaseBusiness,
}

export default function Contact({ cards }) {
  return (
    <section id="contact" className="scroll-mt-28 px-6 pt-20 pb-24">
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-8">
          <SectionHeading
            eyebrow="Contact"
            title="Let’s build dependable systems together."
            description="Open to internships, junior engineering roles, and technical collaborations where reliability and quality matter."
          />

          <div className="grid gap-3">
            {cards.map((card, index) => {
              const Icon = iconMap[card.type] ?? Mail
              return (
                <Motion.div
                  key={`${card.label}-${card.value}`}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                >
                  <span className="rounded-xl border border-fuchsia-300/35 bg-fuchsia-500/15 p-2 text-fuchsia-100">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-zinc-400">{card.label}</p>
                    <p className="text-sm text-zinc-100">{card.value}</p>
                  </div>
                </Motion.div>
              )
            })}
          </div>
        </div>

        <Motion.form
          onSubmit={(event) => event.preventDefault()}
          className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
        >
          <div className="space-y-4">
            <label className="block text-sm text-zinc-200">
              Name
              <input
                type="text"
                className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-900/70 px-4 py-3 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-fuchsia-400/50 focus:ring-2 focus:ring-fuchsia-500/20"
                placeholder="Your name"
              />
            </label>
            <label className="block text-sm text-zinc-200">
              Email
              <input
                type="email"
                className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-900/70 px-4 py-3 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-fuchsia-400/50 focus:ring-2 focus:ring-fuchsia-500/20"
                placeholder="you@example.com"
              />
            </label>
            <label className="block text-sm text-zinc-200">
              Message
              <textarea
                rows="5"
                className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-zinc-900/70 px-4 py-3 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-fuchsia-400/50 focus:ring-2 focus:ring-fuchsia-500/20"
                placeholder="Share project scope, role details, or collaboration goals."
              />
            </label>
            <button type="submit" className="btn-primary w-full justify-center">
              Send Message
            </button>
          </div>
        </Motion.form>
      </div>
    </section>
  )
}

