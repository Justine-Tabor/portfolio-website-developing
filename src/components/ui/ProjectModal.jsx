import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink, FolderGit2, X } from 'lucide-react'

const isRealLink = (value) => {
  const link = value?.trim()
  if (!link) {
    return false
  }
  return !link.includes('[PUT') && !link.includes('PLACEHOLDER')
}

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

export default function ProjectModal({ project, onClose }) {
  const [viewerIndex, setViewerIndex] = useState(null)
  const imageList = useMemo(() => {
    if (!project) {
      return []
    }
    const values = [project.coverImage, ...(project.gallery ?? [])]
      .map((value) => value?.trim())
      .filter((value) => isRealImagePath(value))
    return Array.from(new Set(values))
  }, [project])
  const previewImages = imageList.slice(0, 3)
  const remainingCount = Math.max(imageList.length - previewImages.length, 0)
  const keyFeatures = useMemo(() => {
    if (!project) {
      return []
    }
    return [...(project.challenges ?? []), ...(project.outcomes ?? [])]
      .map((item) => item?.trim())
      .filter((item) => item)
  }, [project])

  const closeViewer = useCallback(() => setViewerIndex(null), [])
  const showPreviousImage = useCallback(() => {
    setViewerIndex((current) => {
      if (current === null || imageList.length === 0) {
        return current
      }
      return (current - 1 + imageList.length) % imageList.length
    })
  }, [imageList.length])
  const showNextImage = useCallback(() => {
    setViewerIndex((current) => {
      if (current === null || imageList.length === 0) {
        return current
      }
      return (current + 1) % imageList.length
    })
  }, [imageList.length])

  useEffect(() => {
    if (!project) {
      return undefined
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (viewerIndex !== null) {
          closeViewer()
          return
        }
        onClose()
      }
      if (viewerIndex === null || imageList.length <= 1) {
        return
      }
      if (event.key === 'ArrowLeft') {
        showPreviousImage()
      }
      if (event.key === 'ArrowRight') {
        showNextImage()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [closeViewer, imageList.length, onClose, project, showNextImage, showPreviousImage, viewerIndex])

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
              <div className="grid gap-3 sm:grid-cols-3">
                {previewImages.length > 0 ? (
                  <button
                    key={`${previewImages[0]}-0`}
                    type="button"
                    onClick={() => setViewerIndex(0)}
                    className="group relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900/80 sm:col-span-2"
                    aria-label={`Open ${project.title} preview 1`}
                  >
                    <img
                      src={previewImages[0]}
                      alt={`${project.title} preview 1`}
                      className="h-52 w-full object-cover transition duration-300 group-hover:scale-105 sm:h-72"
                      loading="lazy"
                      onError={handleImageError}
                    />
                  </button>
                ) : null}
                {previewImages.length > 1 ? (
                  <div className="grid gap-3 sm:col-span-1">
                    {previewImages.slice(1, 3).map((imagePath, index) => (
                      <button
                        key={`${imagePath}-${index + 1}`}
                        type="button"
                        onClick={() => setViewerIndex(index + 1)}
                        className="group relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900/80"
                        aria-label={`Open ${project.title} preview ${index + 2}`}
                      >
                        <img
                          src={imagePath}
                          alt={`${project.title} preview ${index + 2}`}
                          className="h-36 w-full object-cover transition duration-300 group-hover:scale-105"
                          loading="lazy"
                          onError={handleImageError}
                        />
                      </button>
                    ))}
                  </div>
                ) : null}
                {previewImages.length === 0 ? (
                  <div className="sm:col-span-3 grid h-36 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-fuchsia-500/20 via-violet-500/10 to-cyan-500/10 p-3 text-center">
                    <p className="text-sm text-zinc-100">Add at least one project image path</p>
                  </div>
                ) : null}
              </div>
              {remainingCount > 0 ? (
                <p className="text-xs text-zinc-400">
                  +{remainingCount} more image{remainingCount > 1 ? 's' : ''}. Click any preview to browse all images.
                </p>
              ) : null}

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-200">
                  Project Overview
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">{project.overview}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-200">
                  Key Features
                </h4>
                <ul className="mt-2 space-y-1 text-sm text-zinc-300">
                  {keyFeatures.map((item, index) => (
                    <li key={`${item}-${index}`}>- {item}</li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((item, index) => (
                  <span
                    key={`${item}-${index}`}
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

          <AnimatePresence>
            {viewerIndex !== null && imageList[viewerIndex] ? (
              <Motion.div
                className="fixed inset-0 z-[80] grid place-items-center bg-black/90 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeViewer}
              >
                <Motion.div
                  className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/15 bg-zinc-950"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  onClick={(event) => event.stopPropagation()}
                >
                  <img
                    src={imageList[viewerIndex]}
                    alt={`${project.title} image ${viewerIndex + 1}`}
                    className="max-h-[80vh] w-full object-contain"
                    onError={handleImageError}
                  />
                  <div className="absolute left-0 right-0 top-0 flex items-center justify-between bg-black/45 p-3 text-xs text-zinc-100">
                    <span>
                      Image {viewerIndex + 1} of {imageList.length}
                    </span>
                    <button
                      type="button"
                      onClick={closeViewer}
                      className="rounded-md border border-white/20 bg-black/40 p-1.5"
                      aria-label="Close image viewer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  {imageList.length > 1 ? (
                    <>
                      <button
                        type="button"
                        onClick={showPreviousImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/45 p-2 text-zinc-100"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={showNextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/45 p-2 text-zinc-100"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  ) : null}
                </Motion.div>
              </Motion.div>
            ) : null}
          </AnimatePresence>
        </Motion.div>
      ) : null}
    </AnimatePresence>
  )
}
