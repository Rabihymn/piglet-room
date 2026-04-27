'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Review {
  src: string
  author: string
  fullWidth?: boolean
}

const REVIEWS: Review[] = [
  { src: '/reviews/1a.jpg', author: 'Lea, London' },
  { src: '/reviews/2a.jpg', author: 'Nathalie, France' },
  { src: '/reviews/3.jpg', author: 'Joe, Luxembourg' },
  { src: '/reviews/4.jpg', author: 'Stephanie, New York' },
  { src: '/reviews/5.jpg', author: 'Karl, London' },
  { src: '/reviews/6.jpg', author: 'Mona, Qatar' },
  { src: '/reviews/7.jpg', author: 'Laura, New York' },
  { src: '/reviews/8.jpg', author: 'Lara, Dubai' },
  { src: '/reviews/9.jpg', author: 'Dana, Lebanon', fullWidth: true },
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
            <Image
              src={review.src}
              alt={`Review ${i + 1}`}
              width={1200}
              height={1600}
              loading="lazy"
              sizes="(max-width: 900px) 100vw, 50vw"
              onClick={() => setLightbox(review.src)}
              style={{ cursor: 'zoom-in', width: '100%', height: 'auto' }}
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
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: '90vw', maxHeight: '90vh' }}>
            <Image
              src={lightbox}
              alt="Review"
              width={1600}
              height={2000}
              sizes="min(1600px, 90vw)"
              style={{ width: 'auto', height: 'auto', maxWidth: '90vw', maxHeight: '90vh' }}
            />
          </div>
        </div>
      )}
    </section>
  )
}
