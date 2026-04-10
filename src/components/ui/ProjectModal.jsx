import { useEffect } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { ExternalLink, FolderGit2, X } from 'lucide-react'

const isRealLink = (value) => {
  const link = value?.trim()
  if (!link) {
    return false
  }
  return !link.includes('[PUT') && !link.includes('PLACEHOLDER')
}

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) {
      return undefined
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose, project])

  return (
    <AnimatePresence>
      {project ? (
        <Motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <Motion.article
            className="max-h-[92vh] w-full max-w-3xl overflow-auto rounded-3xl border border-white/15 bg-zinc-950 p-6 shadow-[0_40px_100px_-50px_rgba(232,121,249,0.8)]"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.24 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-fuchsia-200/90">
                  {project.category}
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-zinc-100">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-300">{project.description}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-white/15 bg-white/[0.03] p-2 text-zinc-200 transition hover:border-white/30"
                aria-label="Close project modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/80">
                <div className="grid h-56 place-items-center bg-gradient-to-br from-fuchsia-500/20 via-violet-500/10 to-cyan-500/10 p-4 text-center">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-zinc-300">
                      Cover Image Placeholder
                    </p>
                    <p className="mt-2 text-sm text-zinc-100">{project.coverImage}</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {project.gallery.map((imagePath, index) => (
                  <div
                    key={imagePath}
                    className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900/80"
                  >
                    <div className="grid h-36 place-items-center bg-gradient-to-br from-zinc-800 to-zinc-900 p-3 text-center">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.14em] text-zinc-400">
                          Gallery Placeholder {index + 1}
                        </p>
                        <p className="mt-1 text-xs text-zinc-200">{imagePath}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-4 text-xs text-zinc-400">
                Place your screenshots inside <code className="rounded bg-zinc-800 px-1 py-0.5">public/projects/</code> then update image paths in <code className="rounded bg-zinc-800 px-1 py-0.5">src/data/portfolioData.js</code>.
              </div>

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-200">
                  Project Overview
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">{project.overview}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-200">
                    Challenges
                  </h4>
                  <ul className="mt-2 space-y-1 text-sm text-zinc-300">
                    {project.challenges.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-200">
                    Outcomes
                  </h4>
                  <ul className="mt-2 space-y-1 text-sm text-zinc-300">
                    {project.outcomes.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-zinc-900/70 px-3 py-1 text-xs text-zinc-300"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 pt-1">
                {isRealLink(project.github) ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-zinc-100 transition hover:border-fuchsia-400/50 hover:bg-fuchsia-500/10"
                  >
                    <FolderGit2 className="h-4 w-4" />
                    GitHub
                  </a>
                ) : null}
                {isRealLink(project.demo) ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-zinc-100 transition hover:border-cyan-400/45 hover:bg-cyan-500/10"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                ) : null}
              </div>
            </div>
          </Motion.article>
        </Motion.div>
      ) : null}
    </AnimatePresence>
  )
}
