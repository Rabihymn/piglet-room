import { useState, useEffect } from 'react'
import { IMAGE_WEBP_WIDTHS, withWebpVariant } from './ResponsiveImage'
import NewsletterCard from './NewsletterCard'

interface HomeProps {
  setActiveTab: (tab: string) => void
}

const SLIDES = [
  '/home/1.png',
  '/home/2.png',
  '/home/3.png',
  '/home/5.png',
]

const POPUP_DELAY_MS = 2000

export default function Home({ setActiveTab }: HomeProps) {
  const [current, setCurrent] = useState(0)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [popupOpen, setPopupOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setPopupOpen(true), POPUP_DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!popupOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPopupOpen(false)
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [popupOpen])

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || status === 'loading') return
    setStatus('loading')
    try {
      const res = await fetch('https://formspree.io/f/mgorrval', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
        // Trigger PDF download
        const a = document.createElement('a')
        a.href = '/Home Manual.pdf'
        a.download = 'Piglet Room Home Manual.pdf'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        // Close popup after a short delay so the thank-you message is visible
        setTimeout(() => setPopupOpen(false), 5000)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
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
              onError={(e) => {
                ;((e.target as HTMLImageElement).closest('.hero-slide') as HTMLElement | null)?.style.setProperty('display', 'none')
              }}
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
            className="btn-dark"
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

    {popupOpen && (
      <div
        className="newsletter-popup-backdrop"
        onClick={() => setPopupOpen(false)}
        role="dialog"
        aria-modal="true"
        aria-label="Newsletter signup"
      >
        <NewsletterCard className="newsletter-popup" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
          <button
            type="button"
            className="newsletter-popup-close"
            onClick={() => setPopupOpen(false)}
            aria-label="Close"
          >
            ×
          </button>

          <div className="newsletter-popup-body">
            <h2 className="newsletter-popup-title">Discover Gemmayze like a local.</h2>
            <p className="newsletter-popup-subtitle">
              Download our curated guide to Old Beirut:{' '}
              <strong>Gemmayze &amp; Sursock Walk</strong>, crafted <strong>Only For Our Guests!</strong>
              {' '}Enter your email to get a copy.
            </p>

            {status === 'success' ? (
              <p className="newsletter-success">Thank you. We'll be in touch.</p>
            ) : (
              <>
                <form className="newsletter-form" onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="newsletter-input"
                    aria-label="Email address"
                    disabled={status === 'loading'}
                  />
                  <button
                    type="submit"
                    className="newsletter-submit"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? 'Sending…' : 'Submit'}
                  </button>
                </form>
                {status === 'error' && (
                  <p className="newsletter-error">Something went wrong. Please try again.</p>
                )}
              </>
            )}
          </div>
        </NewsletterCard>

        
      </div>
      
    )}
    </>
  )
}
