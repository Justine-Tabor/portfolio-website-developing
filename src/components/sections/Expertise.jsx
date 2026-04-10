import { motion as Motion } from 'framer-motion'
import { Brain, Code2, Cpu, Palette, Workflow, Wrench } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'

const iconMap = {
  ai: Brain,
  embedded: Cpu,
  code: Code2,
  workflow: Workflow,
  palette: Palette,
  wrench: Wrench,
}

export default function Expertise({ items }) {
  return (
    <section id="expertise" className="scroll-mt-28 px-6 py-20">
      <div className="mx-auto w-full max-w-6xl space-y-10">
        <SectionHeading
          eyebrow="What I Do"
          title="Technical capabilities aligned with real engineering delivery."
          description="From full-stack implementations to embedded workflows, I approach every system with a focus on reliability, performance, and clear architecture."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => {
            const Icon = iconMap[item.icon] ?? Brain

            return (
              <Motion.article
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                whileHover={{ y: -8, borderColor: 'rgba(232,121,249,0.35)' }}
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                  <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-fuchsia-500/20 blur-2xl" />
                </div>
                <div className="relative space-y-4">
                  <Motion.span
                    className="inline-flex rounded-xl border border-fuchsia-300/30 bg-fuchsia-500/10 p-3 text-fuchsia-200"
                    whileHover={{ rotate: -8, scale: 1.06 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon className="h-5 w-5" />
                  </Motion.span>
                  <h3 className="text-lg font-semibold text-zinc-100">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-300">{item.description}</p>
                </div>
              </Motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

