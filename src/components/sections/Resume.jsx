import { motion as Motion } from 'framer-motion'
import { Download, ShieldCheck } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'

export default function Resume({ resumeLink, certifications }) {
  return (
    <section id="resume" className="scroll-mt-28 px-6 py-20">
      <div className="mx-auto w-full max-w-6xl space-y-10">
        <SectionHeading
          eyebrow="Credentials"
          title="Resume and supporting certifications."
          description="A concise overview of technical capability, backed by projects and verified learning pathways."
        />

        <Motion.div
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 shadow-[0_24px_60px_-35px_rgba(232,121,249,0.6)]"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-xl font-semibold text-zinc-100">Download Resume</h3>
              <p className="mt-2 text-sm text-zinc-300">
                Updated profile including projects, systems experience, and engineering focus.
              </p>
            </div>
            <a href={resumeLink} className="btn-primary">
              <Download className="h-4 w-4" />
              Get PDF
            </a>
          </div>
        </Motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {certifications.map((cert, index) => (
            <Motion.article
              key={cert.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <div className="mb-3 inline-flex rounded-xl border border-cyan-200/30 bg-cyan-500/10 p-2 text-cyan-200">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <h4 className="text-sm font-semibold text-zinc-100">{cert.title}</h4>
              <p className="mt-2 text-xs uppercase tracking-[0.12em] text-zinc-400">
                {cert.issuer} · {cert.year}
              </p>
              <p className="mt-2 text-xs text-zinc-400">{cert.link}</p>
            </Motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

