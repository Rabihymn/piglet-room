import { useState, useEffect } from 'react'
import { IMAGE_WEBP_WIDTHS, withWebpVariant } from './ResponsiveImage'

interface HomeProps {
  setActiveTab: (tab: string) => void
}

const SLIDES = [
  '/home/1.png',
  '/home/2.png',
  '/home/3.png',
  '/home/4.png',
  '/home/5.png',
]

export default function Home({ setActiveTab }: HomeProps) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="home-hero">
      {SLIDES.map((src, i) => (
        <div key={i} className={`hero-slide${current === i ? ' active' : ''}`}>
          <picture>
            <source
              type="image/webp"
              srcSet={IMAGE_WEBP_WIDTHS.map(w => `${withWebpVariant(src, w)} ${w}w`).join(', ')}
              sizes="100vw"
            />
            <img
              src={src}
              alt={`Piglet Room ${i + 1}`}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              onError={(e) => { (e.target as HTMLImageElement).closest('.hero-slide')!.style.display = 'none' }}
            />
          </picture>
        </div>
      ))}

      <div className="hero-overlay" />

      <div className="hero-content">
        <p className="hero-tag">Gouraud Street · Gemmayze · Lebanon</p>
        <h1 className="hero-title">
          Piglet<br />Room
        </h1>
        <p className="hero-subtitle">
          A quiet moment between places, not a hotel, not just a rental.
        </p>
        <div className="hero-cta">
          <a
            href="https://www.airbnb.com/hosting/listings"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Book Now
          </a>
          <button className="btn-secondary" onClick={() => setActiveTab('the-room')}>
            Explore the Space
          </button>
        </div>
      </div>

      <div className="hero-dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`hero-dot${current === i ? ' active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
