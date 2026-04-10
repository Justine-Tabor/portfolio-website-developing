import {
  aboutContent,
  aboutStats,
  certifications,
  contactCards,
  expertiseItems,
  footerLinks,
  heroCtas,
  heroTools,
  navConfig,
  navLinks,
  profile,
  projects,
  skillCategories,
  socialLinks,
  timelineItems,
} from './portfolioData'

const STORAGE_KEY = 'portfolio_admin_overrides_v1'

const clone = (value) =>
  typeof structuredClone === 'function'
    ? structuredClone(value)
    : JSON.parse(JSON.stringify(value))

const toProjectImagePath = (value) => {
  const trimmed = value?.trim()
  if (!trimmed) {
    return ''
  }
  if (trimmed.startsWith('/')) {
    return trimmed
  }
  return `/projects/${trimmed}`
}

export function getDefaultAdminOverrides() {
  return {
    profile: {
      email: '',
      phone: '',
      linkedin: '',
      github: '',
      resumeLink: '',
      photo: '',
      graduationYear: '',
      cert1Link: '',
      cert2Issuer: '',
      cert2Year: '',
      cert2Link: '',
    },
    projects: projects.map(() => ({
      github: '',
      demo: '',
      coverImage: '',
      gallery1: '',
      gallery2: '',
    })),
  }
}

export function loadAdminOverrides() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return getDefaultAdminOverrides()
    }
    const parsed = JSON.parse(raw)
    return {
      ...getDefaultAdminOverrides(),
      ...parsed,
      profile: {
        ...getDefaultAdminOverrides().profile,
        ...(parsed.profile ?? {}),
      },
      projects: projects.map((_, index) => ({
        ...getDefaultAdminOverrides().projects[index],
        ...(parsed.projects?.[index] ?? {}),
      })),
    }
  } catch {
    return getDefaultAdminOverrides()
  }
}

export function saveAdminOverrides(overrides) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides))
}

export function clearAdminOverrides() {
  localStorage.removeItem(STORAGE_KEY)
}

export function getPortfolioDataWithOverrides(overrides = getDefaultAdminOverrides()) {
  const data = {
    profile: clone(profile),
    navConfig: clone(navConfig),
    navLinks: clone(navLinks),
    heroCtas: clone(heroCtas),
    socialLinks: clone(socialLinks),
    heroTools: clone(heroTools),
    aboutContent: clone(aboutContent),
    aboutStats: clone(aboutStats),
    expertiseItems: clone(expertiseItems),
    skillCategories: clone(skillCategories),
    projects: clone(projects),
    timelineItems: clone(timelineItems),
    certifications: clone(certifications),
    contactCards: clone(contactCards),
    footerLinks: clone(footerLinks),
  }

  const profileOverrides = overrides.profile ?? {}

  if (profileOverrides.email) {
    data.profile.email = profileOverrides.email
    const emailCard = data.contactCards.find((item) => item.label === 'Email')
    if (emailCard) {
      emailCard.value = profileOverrides.email
    }
    const emailSocial = data.socialLinks.find((item) => item.type === 'mail')
    if (emailSocial) {
      emailSocial.href = `mailto:${profileOverrides.email}`
    }
  }

  if (profileOverrides.phone) {
    data.profile.phone = profileOverrides.phone
    const phoneCard = data.contactCards.find((item) => item.label === 'Phone')
    if (phoneCard) {
      phoneCard.value = profileOverrides.phone
    }
  }

  if (profileOverrides.linkedin) {
    data.profile.linkedin = profileOverrides.linkedin
    const linkedInSocial = data.socialLinks.find((item) => item.type === 'linkedin')
    if (linkedInSocial) {
      linkedInSocial.href = profileOverrides.linkedin
    }
  }

  if (profileOverrides.github) {
    data.profile.github = profileOverrides.github
    const githubSocial = data.socialLinks.find((item) => item.type === 'github')
    if (githubSocial) {
      githubSocial.href = profileOverrides.github
    }
  }

  if (profileOverrides.resumeLink) {
    data.profile.resumeLink = profileOverrides.resumeLink
    const resumeCta = data.heroCtas.find((item) =>
      item.label.toLowerCase().includes('resume'),
    )
    if (resumeCta) {
      resumeCta.href = profileOverrides.resumeLink
    }
  }

  if (profileOverrides.photo) {
    data.profile.photo = profileOverrides.photo
  }

  if (profileOverrides.graduationYear && data.aboutContent.education[2]) {
    data.aboutContent.education[2] = profileOverrides.graduationYear
  }

  if (profileOverrides.cert1Link && data.certifications[0]) {
    data.certifications[0].link = profileOverrides.cert1Link
  }

  if (data.certifications[1]) {
    if (profileOverrides.cert2Issuer) {
      data.certifications[1].issuer = profileOverrides.cert2Issuer
    }
    if (profileOverrides.cert2Year) {
      data.certifications[1].year = profileOverrides.cert2Year
    }
    if (profileOverrides.cert2Link) {
      data.certifications[1].link = profileOverrides.cert2Link
    }
  }

  data.projects = data.projects.map((project, index) => {
    const projectOverride = overrides.projects?.[index]
    if (!projectOverride) {
      return project
    }

    if (projectOverride.github?.trim()) {
      project.github = projectOverride.github.trim()
    }
    if (projectOverride.demo?.trim()) {
      project.demo = projectOverride.demo.trim()
    }
    if (projectOverride.coverImage?.trim()) {
      project.coverImage = toProjectImagePath(projectOverride.coverImage)
    }

    const gallery1 = toProjectImagePath(projectOverride.gallery1)
    const gallery2 = toProjectImagePath(projectOverride.gallery2)
    if (gallery1 || gallery2) {
      project.gallery = [gallery1 || project.gallery[0], gallery2 || project.gallery[1]]
    }

    return project
  })

  return data
}
