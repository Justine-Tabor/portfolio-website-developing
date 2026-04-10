import Reveal from './Reveal'

export default function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  fullWidthDescription = false,
}) {
  return (
    <Reveal className={centered ? 'text-center' : ''}>
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-fuchsia-300/80">
          {eyebrow}
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">
          {title}
        </h2>
        <p
          className={`text-sm leading-relaxed text-zinc-300 sm:text-base ${
            fullWidthDescription
              ? 'max-w-none'
              : centered
                ? 'mx-auto max-w-2xl'
                : 'max-w-2xl'
          }`}
        >
          {description}
        </p>
      </div>
    </Reveal>
  )
}

