'use client'

import { useState } from 'react'
import Image from 'next/image'

const CONTACT_VIDEO_URL =
  'https://jruldtycdsgtwp12.public.blob.vercel-storage.com/10678048-uhd_4096_2160_25fps.mp4'

export default function Contact() {
  const [videoFailed, setVideoFailed] = useState(false)

  return (
    <section className="page-section">
      <div className="page-header">
        <p className="section-label">Get in Touch</p>
        <h2 className="section-title">
          Find us<br /><em>here.</em>
        </h2>
      </div>

      <div className="contact-layout">
        <div className="contact-video">
          {!videoFailed ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onError={() => setVideoFailed(true)}
            >
              <source src={CONTACT_VIDEO_URL} type="video/mp4" />
            </video>
          ) : (
            <Image
              src="/home/1.png"
              alt="Piglet Room"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
            />
          )}
        </div>

        <div>
          <p className="contact-description">
            We're always happy to hear from you. Whether you have a question about your stay,
            want to share a memory, or just want to say hello, find us on Instagram.
          </p>

          <a
            href="https://www.instagram.com/pigletroom_/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-instagram"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            Follow us on Instagram
          </a>

          <a
            href="https://www.instagram.com/pigletroom_/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-handle "
          >
            @pigletroom_
          </a>
          <a className="contact-location-value room-description-link" href="mailto:hello@pigletroom.com">
            hello@pigletroom.com
          </a>

          <div className="contact-location">
            <p className="contact-location-label">Address</p>
            <p className="contact-location-value">
              Gouraud Street<br />
              Gemmayze, Beirut<br />
              Lebanon
            </p>
            <a
              href="https://maps.app.goo.gl/szsDsXVVXKpTPkZo9"
              target="_blank"
              rel="noopener noreferrer"
              className="room-description-link"
            >
              Open in Google Maps
            </a>
          </div>

          <a
            href="https://www.airbnb.com/hosting/listings"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-dark"
          >
            Book on Airbnb
          </a>
        </div>
      </div>
    </section>
  )
}
