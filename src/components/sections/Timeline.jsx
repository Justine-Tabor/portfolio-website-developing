import { motion as Motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'

export default function Timeline({ items }) {
  return (
    <section id="experience" className="scroll-mt-28 px-6 py-20">
      <div className="mx-auto w-full max-w-6xl space-y-10">
        <SectionHeading
          eyebrow="Experience"
          title="Timeline of technical growth."
          description="Key milestones across internship experience, certifications, and systems-focused projects."
        />

        <div className="relative space-y-6 border-l border-white/15 pl-7 sm:pl-10">
          {items.map((item, index) => (
            <Motion.article
              key={item.title}
              className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
            >
              <span className="absolute -left-[37px] top-6 h-3 w-3 rounded-full border border-fuchsia-300/50 bg-fuchsia-500 shadow-[0_0_0_6px_rgba(232,121,249,0.15)] sm:-left-[53px]" />
              <p className="text-xs uppercase tracking-[0.18em] text-fuchsia-200/90">{item.period}</p>
              <h3 className="mt-2 text-lg font-semibold text-zinc-100">{item.title}</h3>
              <p className="mt-1 text-sm text-zinc-400">{item.subtitle}</p>
              <ul className="mt-3 space-y-1 text-sm leading-relaxed text-zinc-300">
                {item.impacts.map((impact) => (
                  <li key={impact}>• {impact}</li>
                ))}
              </ul>
              <p className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-zinc-300">
                {item.metric}
              </p>
            </Motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

