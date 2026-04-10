import { motion as Motion } from 'framer-motion'

export default function Reveal({ children, className = '', delay = 0 }) {
  return (
    <Motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: 'easeOut', delay }}
    >
      {children}
    </Motion.div>
  )
}

