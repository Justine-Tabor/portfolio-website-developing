import { useEffect, useState } from 'react'

export function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? 'home')

  useEffect(() => {
    const getSections = () =>
      sectionIds
        .map((id) => ({ id, element: document.getElementById(id) }))
        .filter((item) => item.element)

    let ticking = false

    const updateActiveSection = () => {
      const sections = getSections()
      if (!sections.length) {
        return
      }

      const scrollProbe = window.scrollY + 180
      let current = sections[0].id

      sections.forEach((section) => {
        if (section.element.offsetTop <= scrollProbe) {
          current = section.id
        }
      })

      setActiveSection((prev) => (prev === current ? prev : current))
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveSection()
          ticking = false
        })
        ticking = true
      }
    }

    updateActiveSection()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [sectionIds])

  return activeSection
}
