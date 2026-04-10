import { useMemo, useState } from 'react'
import {
  clearAdminOverrides,
  getDefaultAdminOverrides,
  loadAdminOverrides,
  saveAdminOverrides,
} from '../data/portfolioOverrides'
import { projects } from '../data/portfolioData'

function InputField({ label, value, onChange, placeholder = '' }) {
  return (
    <label className="block space-y-2">
      <span className="text-xs uppercase tracking-[0.14em] text-zinc-400">{label}</span>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-zinc-900/70 px-3 py-2 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-fuchsia-400/50"
      />
    </label>
  )
}

export default function AdminApp() {
  const [form, setForm] = useState(() => loadAdminOverrides())
  const projectList = useMemo(() => projects, [])

  const updateProfile = (key, value) => {
    setForm((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [key]: value,
      },
    }))
  }

  const updateProject = (index, key, value) => {
    setForm((prev) => ({
      ...prev,
      projects: prev.projects.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [key]: value } : item,
      ),
    }))
  }

  const handleSave = () => {
    saveAdminOverrides(form)
    alert('Admin values saved. Open "/" to see updates.')
  }

  const handleReset = () => {
    clearAdminOverrides()
    setForm(getDefaultAdminOverrides())
    alert('Admin overrides reset.')
  }

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-8 text-zinc-100 sm:px-6">
      <main className="mx-auto w-full max-w-5xl space-y-8">
        <header className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-fuchsia-200">Portfolio Admin</p>
          <h1 className="mt-2 text-3xl font-semibold">Content Input Panel</h1>
          <p className="mt-3 text-sm text-zinc-300">
            Fill fields then click <strong>Save</strong>. Your main portfolio will read this data from local storage.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" onClick={handleSave} className="btn-primary">
              Save Admin Data
            </button>
            <button type="button" onClick={handleReset} className="btn-secondary">
              Reset Data
            </button>
            <a href="/" className="btn-secondary">
              Open Portfolio
            </a>
          </div>
        </header>

        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold">Global Inputs</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <InputField
              label="Email"
              value={form.profile.email}
              onChange={(event) => updateProfile('email', event.target.value)}
            />
            <InputField
              label="Phone"
              value={form.profile.phone}
              onChange={(event) => updateProfile('phone', event.target.value)}
            />
            <InputField
              label="LinkedIn URL"
              value={form.profile.linkedin}
              onChange={(event) => updateProfile('linkedin', event.target.value)}
            />
            <InputField
              label="GitHub URL"
              value={form.profile.github}
              onChange={(event) => updateProfile('github', event.target.value)}
            />
            <InputField
              label="Resume Link"
              value={form.profile.resumeLink}
              onChange={(event) => updateProfile('resumeLink', event.target.value)}
            />
            <InputField
              label="Profile Photo Filename"
              value={form.profile.photo}
              onChange={(event) => updateProfile('photo', event.target.value)}
              placeholder="example.jpg"
            />
            <InputField
              label="Graduation Year"
              value={form.profile.graduationYear}
              onChange={(event) => updateProfile('graduationYear', event.target.value)}
            />
            <InputField
              label="Certification 1 Link"
              value={form.profile.cert1Link}
              onChange={(event) => updateProfile('cert1Link', event.target.value)}
            />
            <InputField
              label="Certification 2 Issuer"
              value={form.profile.cert2Issuer}
              onChange={(event) => updateProfile('cert2Issuer', event.target.value)}
            />
            <InputField
              label="Certification 2 Year"
              value={form.profile.cert2Year}
              onChange={(event) => updateProfile('cert2Year', event.target.value)}
            />
            <InputField
              label="Certification 2 Link"
              value={form.profile.cert2Link}
              onChange={(event) => updateProfile('cert2Link', event.target.value)}
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Project Inputs</h2>
          {projectList.map((project, index) => (
            <article
              key={project.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <p className="text-xs uppercase tracking-[0.14em] text-fuchsia-200">
                {project.category}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-zinc-100">{project.title}</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <InputField
                  label="GitHub Link"
                  value={form.projects[index]?.github ?? ''}
                  onChange={(event) => updateProject(index, 'github', event.target.value)}
                />
                <InputField
                  label="Live Demo Link"
                  value={form.projects[index]?.demo ?? ''}
                  onChange={(event) => updateProject(index, 'demo', event.target.value)}
                />
                <InputField
                  label="Cover Image Filename"
                  value={form.projects[index]?.coverImage ?? ''}
                  onChange={(event) => updateProject(index, 'coverImage', event.target.value)}
                  placeholder="gesture-cover.jpg"
                />
                <InputField
                  label="Gallery Image 1 Filename"
                  value={form.projects[index]?.gallery1 ?? ''}
                  onChange={(event) => updateProject(index, 'gallery1', event.target.value)}
                  placeholder="gesture-1.jpg"
                />
                <InputField
                  label="Gallery Image 2 Filename"
                  value={form.projects[index]?.gallery2 ?? ''}
                  onChange={(event) => updateProject(index, 'gallery2', event.target.value)}
                  placeholder="gesture-2.jpg"
                />
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}
