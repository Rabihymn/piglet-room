import { useState } from 'react'
import ResponsiveImage, { IMAGE_WEBP_WIDTHS, withWebpVariant } from './ResponsiveImage'

interface Review {
  src: string
  fallback: string
  author: string
  /** Span both columns (e.g. wide screenshot) */
  fullWidth?: boolean
}

const REVIEWS: Review[] = [
  { src: '/reviews/1a.jpg', fallback: '/reviews/1.png', author: 'Lea, London' },
  { src: '/reviews/2a.jpg', fallback: '/reviews/2.png', author: 'Nathalie, France' },
  { src: '/reviews/3.jpg', fallback: '/reviews/3.png', author: 'Joe, Luxembourg' },
  { src: '/reviews/4.jpg', fallback: '/reviews/4.png', author: 'Stephanie, New York' },
  { src: '/reviews/5.jpg', fallback: '/reviews/5.png', author: 'Karl, London' },
  { src: '/reviews/6.jpg', fallback: '/reviews/6.png', author: 'Mona, Qatar' },
  { src: '/reviews/7.jpg', fallback: '/reviews/7.png', author: 'Laura, New York' },
  { src: '/reviews/8.jpg', fallback: '/reviews/8.jpg', author: 'Lara, Dubai' },
  { src: '/reviews/9.jpg', fallback: '/reviews/9.jpg', author: 'Dana, Lebanon', fullWidth: true },
]

export default function Reviews() {
  const [lightbox, setLightbox] = useState<string | null>(null)

  return (
    <section className="page-section">
      <div className="page-header">
        <p className="section-label">Guest Experiences</p>
        <h2 className="section-title">
          What our<br /><em>guests say.</em>
        </h2>
      </div>

      <div className="reviews-grid room-gallery room-gallery--contain">
        {REVIEWS.map((review, i) => (
          <div
            key={i}
            className={`review-card${review.fullWidth ? ' review-card--full' : ''}`}
          >
            <ResponsiveImage
              src={review.src}
              alt={`Review ${i + 1}`}
              loading="lazy"
              decoding="async"
              onClick={() => setLightbox(review.src)}
              style={{ cursor: 'zoom-in' }}
              onError={(e) => {
                const img = e.currentTarget
                if (!img.dataset.tried) {
                  img.dataset.tried = '1'
                  img.src = review.fallback
                } else {
                  img.style.display = 'none'
                }
              }}
            />
            <div className="review-text">
              <p className="review-author">— {review.author}</p>
            </div>
          </div>
        ))}
      </div>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>×</button>
          <picture onClick={e => e.stopPropagation()}>
            <source
              type="image/webp"
              srcSet={IMAGE_WEBP_WIDTHS.map(w => `${withWebpVariant(lightbox, w)} ${w}w`).join(', ')}
              sizes="min(1600px, 90vw)"
            />
            <img src={lightbox} alt="Review" />
          </picture>
        </div>
      )}
    </section>
  )
}
