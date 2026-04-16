import { useMemo, useState } from 'react'
import SectionHeading from '../ui/SectionHeading'
import ProjectCard from '../ui/ProjectCard'
import ProjectModal from '../ui/ProjectModal'

export default function Projects({ projectItems }) {
  const categories = useMemo(
    () => ['All', ...new Set(projectItems.map((project) => project.category))],
    [projectItems],
  )
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') {
      return projectItems
    }
    return projectItems.filter((project) => project.category === activeCategory)
  }, [activeCategory, projectItems])

  return (
    <section id="projects" className="scroll-mt-28 px-6 py-20">
      <div className="mx-auto w-full max-w-6xl space-y-10">
        <SectionHeading
          eyebrow="Portfolio"
          title="Selected projects with measurable engineering value."
          description="A mix of software, systems, and embedded projects that demonstrate technical depth, problem-solving discipline, and build quality."
        />

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                activeCategory === category
                  ? 'border border-fuchsia-300/40 bg-fuchsia-500/20 text-fuchsia-100'
                  : 'border border-white/12 bg-white/[0.03] text-zinc-300 hover:border-white/25'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={`${project.title}-${project.category}`}
              project={project}
              index={index}
              onOpen={setSelectedProject}
            />
          ))}
        </div>
      </div>
      <ProjectModal
        key={selectedProject?.title ?? 'no-project-selected'}
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}

