import { motion as Motion } from 'framer-motion'
import { Star } from 'lucide-react'

const isRealImagePath = (value) => {
  const path = value?.trim()
  if (!path) {
    return false
  }
  return !path.includes('[PUT') && !path.includes('PLACEHOLDER')
}

const withAlternateProjectsPath = (path) => {
  if (!path?.startsWith('/projects/')) {
    return null
  }
  return path.replace('/projects/', '/')
}

const handleImageError = (event) => {
  const img = event.currentTarget
  if (img.dataset.fallbackTried === 'true') {
    img.style.display = 'none'
    return
  }
  const fallback = withAlternateProjectsPath(img.getAttribute('src') || '')
  if (!fallback) {
    img.style.display = 'none'
    return
  }
  img.dataset.fallbackTried = 'true'
  img.src = fallback
}

export default function ProjectCard({ project, index, onOpen }) {
  return (
    <Motion.article
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_24px_60px_-32px_rgba(232,121,249,0.55)] backdrop-blur-lg"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="w-full text-left"
        aria-label={`Open project details for ${project.title}`}
      >
        <div className="relative mb-5 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-fuchsia-500/20 via-violet-500/15 to-cyan-400/10 p-6">
          {isRealImagePath(project.coverImage) ? (
            <img
              src={project.coverImage}
              alt={`${project.title} cover`}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              onError={handleImageError}
            />
          ) : null}
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 scale-110 bg-[radial-gradient(circle_at_top_right,rgba(232,121,249,0.3),transparent_40%)] transition duration-500 group-hover:scale-125" />
          <div className="relative flex h-32 items-end justify-between">
            <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs uppercase tracking-[0.18em] text-zinc-200">
              {project.category}
            </span>
            {project.featured ? (
              <span className="inline-flex items-center gap-1 rounded-full border border-fuchsia-300/40 bg-fuchsia-400/20 px-3 py-1 text-xs font-medium text-fuchsia-100">
                <Star className="h-3.5 w-3.5" />
                Featured
              </span>
            ) : null}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-zinc-100">{project.title}</h3>
          <p className="text-sm leading-relaxed text-zinc-300">{project.description}</p>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((item, techIndex) => (
              <span
                key={`${item}-${techIndex}`}
                className="rounded-full border border-white/10 bg-zinc-900/70 px-3 py-1 text-xs text-zinc-300 transition group-hover:border-fuchsia-400/45"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="pt-1">
            <span className="inline-flex rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-zinc-100 transition group-hover:border-fuchsia-400/50">
              View Project Details
            </span>
          </div>
        </div>
      </button>
    </Motion.article>
  )
}
