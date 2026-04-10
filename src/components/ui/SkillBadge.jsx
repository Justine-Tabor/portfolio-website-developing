import { motion as Motion } from 'framer-motion'

export default function SkillBadge({ skill, delay = 0 }) {
  return (
    <Motion.div
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-[0_10px_30px_-20px_rgba(232,121,249,0.5)] backdrop-blur"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ y: -4, borderColor: 'rgba(232,121,249,0.45)' }}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-zinc-100">{skill.name}</p>
        <span className="text-xs text-zinc-400">{skill.level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
        <Motion.div
          className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-400 to-violet-400"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: delay + 0.12 }}
        />
      </div>
    </Motion.div>
  )
}

