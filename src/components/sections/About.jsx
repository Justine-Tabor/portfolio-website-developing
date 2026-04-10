import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

export default function About({ stats, aboutContent }) {
  return (
    <section id="about" className="scroll-mt-28 px-6 py-20">
      <div className="mx-auto w-full max-w-6xl space-y-10">
        <SectionHeading
          eyebrow="About"
          title="Engineering mindset with practical execution."
          description={aboutContent.paragraph}
          fullWidthDescription
        />

        <Reveal>
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-lg font-semibold text-zinc-100">Education</h3>
              <div className="mt-3 space-y-2 text-sm text-zinc-300">
                {aboutContent.education.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-lg font-semibold text-zinc-100">Specializations</h3>
              <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                {aboutContent.specializations.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </article>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_20px_45px_-30px_rgba(59,130,246,0.5)]"
              >
                <p className="text-3xl font-semibold text-zinc-100">{stat.value}</p>
                <p className="mt-2 text-sm text-zinc-300">{stat.label}</p>
                <p className="mt-1 text-xs text-zinc-400">{stat.detail}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

