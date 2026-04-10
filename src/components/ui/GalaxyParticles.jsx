import { useEffect, useRef } from 'react'

const THEME_COLORS = [
  [232, 121, 249], // fuchsia
  [167, 139, 250], // violet
  [103, 232, 249], // cyan
]

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export default function GalaxyParticles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return undefined
    }

    const context = canvas.getContext('2d')
    if (!context) {
      return undefined
    }

    let animationFrame = 0
    let width = 0
    let height = 0
    let pixelRatio = 1

    const mouse = { x: 0, y: 0, active: false }
    const particles = []

    const createParticles = () => {
      particles.length = 0
      const count = clamp(Math.floor((width * height) / 26000), 60, 140)

      for (let index = 0; index < count; index += 1) {
        const color = THEME_COLORS[index % THEME_COLORS.length]
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: randomBetween(-0.22, 0.22),
          vy: randomBetween(-0.22, 0.22),
          size: randomBetween(0.8, 2.8),
          baseAlpha: randomBetween(0.22, 0.55),
          glow: 0,
          color,
        })
      }
    }

    const resize = () => {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * pixelRatio)
      canvas.height = Math.floor(height * pixelRatio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      createParticles()
    }

    const onMouseMove = (event) => {
      mouse.x = event.clientX
      mouse.y = event.clientY
      mouse.active = true
    }

    const onMouseLeave = () => {
      mouse.active = false
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)

      particles.forEach((particle) => {
        const dx = particle.x - mouse.x
        const dy = particle.y - mouse.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const influenceRadius = 130

        if (mouse.active && distance < influenceRadius) {
          const force = (influenceRadius - distance) / influenceRadius
          const angle = Math.atan2(dy, dx)
          particle.vx += Math.cos(angle) * force * 0.16
          particle.vy += Math.sin(angle) * force * 0.16
          particle.glow = clamp(particle.glow + force * 0.12, 0, 1)
        } else {
          particle.glow = clamp(particle.glow - 0.03, 0, 1)
        }

        particle.vx *= 0.97
        particle.vy *= 0.97
        particle.vx = clamp(particle.vx, -0.75, 0.75)
        particle.vy = clamp(particle.vy, -0.75, 0.75)
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < -12) {
          particle.x = width + 12
        }
        if (particle.x > width + 12) {
          particle.x = -12
        }
        if (particle.y < -12) {
          particle.y = height + 12
        }
        if (particle.y > height + 12) {
          particle.y = -12
        }

        const alpha = clamp(particle.baseAlpha + particle.glow * 0.65, 0.18, 1)
        const renderSize = particle.size + particle.glow * 1.6
        const [r, g, b] = particle.color

        context.beginPath()
        context.arc(particle.x, particle.y, renderSize, 0, Math.PI * 2)
        context.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
        context.shadowBlur = 14 + particle.glow * 20
        context.shadowColor = `rgba(${r}, ${g}, ${b}, ${0.9 * alpha})`
        context.fill()
      })

      context.shadowBlur = 0
      animationFrame = window.requestAnimationFrame(draw)
    }

    resize()
    draw()

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseleave', onMouseLeave)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] opacity-90"
    />
  )
}
