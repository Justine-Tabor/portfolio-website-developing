import { motion as Motion } from 'framer-motion'

const blobs = [
  { className: 'left-[-10%] top-20 h-72 w-72 bg-fuchsia-600/20', duration: 11 },
  { className: 'right-[10%] top-56 h-80 w-80 bg-violet-600/10', duration: 14 },
  { className: 'left-[30%] bottom-20 h-64 w-64 bg-cyan-500/10', duration: 12 },
]

export default function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(232,121,249,0.12),transparent_30%),radial-gradient(circle_at_85%_35%,rgba(99,102,241,0.12),transparent_28%),linear-gradient(#08080f,#040307_45%,#030307)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_80%)]" />
      {blobs.map((blob) => (
        <Motion.div
          key={blob.className}
          className={`absolute rounded-full blur-3xl ${blob.className}`}
          animate={{ y: [0, -20, 0], x: [0, 12, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: blob.duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

