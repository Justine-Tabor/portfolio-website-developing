import { motion as Motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import SkillBadge from '../ui/SkillBadge'

export default function Skills({ categories }) {
  return (
    <section id="skills" className="scroll-mt-28 px-6 py-20">
      <div className="mx-auto w-full max-w-6xl space-y-10">
        <SectionHeading
          eyebrow="Tech Stack"
          title="Engineering tools I use to ship dependable systems."
          description="A practical stack covering frontend, backend, automation, and system-level implementation."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {categories.map((category, categoryIndex) => (
            <Motion.div
              key={category.category}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: categoryIndex * 0.05 }}
            >
              <h3 className="mb-5 text-lg font-semibold text-zinc-100">
                {category.category}
              </h3>
              <div className="space-y-3">
                {category.items.map((skill, skillIndex) => (
                  <SkillBadge
                    key={skill.name}
                    skill={skill}
                    delay={categoryIndex * 0.07 + skillIndex * 0.05}
                  />
                ))}
              </div>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

