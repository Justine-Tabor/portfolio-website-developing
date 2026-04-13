import { BriefcaseBusiness, FolderGit2, Mail } from 'lucide-react'

const socialIconMap = {
  github: FolderGit2,
  linkedin: BriefcaseBusiness,
  mail: Mail,
}

export default function Footer({ name, socialLinks, quickLinks }) {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-zinc-950/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-8 text-center sm:text-left">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-zinc-400">
            © {year} {name}.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {quickLinks.map((link) => (
              <a key={link.label} href={link.href} className="text-xs text-zinc-400 hover:text-zinc-200">
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 sm:justify-start">
          {socialLinks.map((item) => {
            const Icon = socialIconMap[item.type] ?? FolderGit2
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/10 bg-white/5 p-2 text-zinc-300 transition hover:border-fuchsia-400/40 hover:text-zinc-100"
                aria-label={item.label}
              >
                <Icon className="h-4 w-4" />
              </a>
            )
          })}
        </div>
      </div>
    </footer>
  )
}

