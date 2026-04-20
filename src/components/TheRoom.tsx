import { useState } from 'react'
import type { CSSProperties } from 'react'
import ResponsiveImage from './ResponsiveImage'

interface SubTab {
  id: string
  label: string
}

const SUB_TABS: SubTab[] = [
  { id: 'plan', label: 'Floor plan' },
  { id: 'the-room', label: 'The Room' },
  { id: 'bathroom', label: 'The Bathroom' },
  { id: 'kitchen', label: 'The Open Kitchen' },
  { id: 'terrace', label: 'Terrace' },
  { id: 'location', label: 'Location' },
  { id: 'art', label: 'Art' },
]

const GALLERIES: Record<string, string[]> = {
  'the-room': [
    '1.png', '0.png',  '3.png', '4....png', '5.png',
    '6.png', '9..png','11.png',
    '12.png', '14..png', '15.png', '16.png', '17..png','2.png', '8.png',
  ].map(f => `/the-room/room/${f}`),

  bathroom: ['6.png', '7.png', '8.png', '9.png', '10.png'].map(
    f => `/the-room/bathroom/${f}`
  ),

  kitchen: ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png'].map(
    f => `/the-room/kitchen/${f}`
  ),

  terrace: [],

  location: [
    '/the-room/location/22.png',
    '/the-room/location/image.jpg',
    '/the-room/location/Ginette-Concept-Store-by-Raed-Abillama-Architects-Beirut-Lebanon-09.jpg',
    '/the-room/location/ChatGPT%20Image%20Mar%207,%202026%20at%2005_04_05%20PM.png',
  ],

  art: ['3.png', '10.png'].map(f => `/the-room/Art/${f}`),
}

type ArtHoverCopy = {
  title: string
  sectionTitle: string
  paragraphs: [string, string, string]
  quote: string
  tagline: string
  footerTitle: string
  footerSubtitle: string
  footerLines?: string[]
  footerLink?: { href: string; label: string }
}

/** Per-image hover copy in the Art tab. Add or edit keys to match `GALLERIES.art` paths. */
const ART_HOVER_BY_SRC: Record<string, ArtHoverCopy> = {
  '/the-room/Art/3.png': {
    title: 'The Drip King',
    sectionTitle: 'About this Artwork',
    paragraphs: [
      'The artwork merges structure with emotion, creating a figure that is both carefully constructed and full of life. Geometric forms and precise composition bring a sense of order, while beneath them, movement and energy flow. It explores identity, showing how memories, experiences, and emotions come together as a whole.',
      'The influence of Cubism is evident in the balance of abstraction and structure, where deconstructed form remains deeply expressive. At its core, the artwork honors storytelling and human connection, with bold color and strong shape drawing the eye, while subtle gestures and expression reveal shared struggles and triumphs.',
      'The artwork balances precision with fluidity, crafting a visual narrative that feels both personal and monumental, inviting the viewer into a world where form and feeling merge seamlessly.',
    ],
    quote: 'Creation begins with breaking down what came before.',
    tagline: 'Echoes of Strength',
    footerTitle: 'The Drip Queen',
    footerSubtitle: 'Echoes of Strength',
    footerLines: ['Oil on Linen', '190 × 160 cm'],
    footerLink: { href: 'https://www.arteahead.com', label: 'www.arteahead.com' },
  },
  '/the-room/Art/10.png': {
    title: 'Mr. Psyche',
    sectionTitle: 'About this Artwork',
    paragraphs: [
      'Inspired by geometric forms, the artwork blends structure with emotion, creating a figure that feels both abstract and deeply human. Sharp lines, bold contrast, and fragmented shapes give the work a sense of movement and depth, capturing a moment that feels both dynamic and still.',
      'Balancing rigid form with expressive energy, an everyday scene is transformed into a striking composition. The play of light and shadow, along with textured surfaces, adds mood and intensity, turning the piece into a visual narrative.',
      'With a modernist approach, the artwork reduces reality to essential shape, where abstraction and figuration merge. The result is a work that feels both structured and alive—a portrait of life shaped by time, form, and emotion.',
    ],
    quote: 'Cubism reshapes how we see, not what we see.',
    tagline: 'Angles of Emotion',
    footerTitle: 'Mr. Psyche',
    footerSubtitle: 'Angles of Emotion',
    footerLines: ['Oil on Linen', '160 × 130 cm'],
    footerLink: { href: 'https://www.arteahead.com', label: 'www.arteahead.com' },
  },
}

function ArtHoverOverlay({ copy }: { copy: ArtHoverCopy }) {
  return (
    <div
      className="art-hover-overlay"
      onClick={e => e.stopPropagation()}
      onPointerDown={e => e.stopPropagation()}
      role="note"
    >
      <p className="art-hover-section">{copy.sectionTitle}</p>
      <div className="art-hover-body-columns">
        {copy.paragraphs.map((text, idx) => (
          <p key={idx} className="art-hover-body">
            {text}
          </p>
        ))}
      </div>
      <p className="art-hover-quote">&ldquo;{copy.quote}&rdquo;</p>
      <p className="art-hover-tagline">{copy.tagline}</p>
      <p className="art-hover-footer">
        <strong>{copy.footerTitle}</strong>
        <br />
        <em>{copy.footerSubtitle}</em>
        {copy.footerLines?.map((line, i) => (
          <span key={i}>
            <br />
            {line}
          </span>
        ))}
        {copy.footerLink ? (
          <>
            <br />
            <a
              href={copy.footerLink.href}
              className="art-hover-footer-link"
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
            >
              {copy.footerLink.label}
            </a>
          </>
        ) : null}
      </p>
    </div>
  )
}

/** Percent positions over the floor plan image — tune if your JPEG framing differs. */
const PLAN_HOTSPOTS: {
  id: string
  label: string
  n: number
  style: CSSProperties
}[] = [
  { id: 'the-room', label: 'The bedroom', n: 1, style: { left: '21%', top: '11%', width: '23%', height: '31%' } },
  { id: 'kitchen', label: 'Open kitchen', n: 2, style: { left: '44%', top: '11%', width: '17%', height: '14%' } },
  { id: 'bathroom', label: 'Bathroom', n: 3, style: { left: '51%', top: '25%', width: '10%', height: '19%' } },
  { id: 'terrace', label: 'Communal terrace', n: 4, style: { left: '21%', top: '42%', width: '27%', height: '44%' } },
]

const PLAN_SRC = '/the-room/room/General%20Layout%20plan.jpeg'

const AMENITIES = [
  'En-suite bathroom with a shower',
  'Duvet and pillows with Egyptian cotton sheets',
  'Revlon hair dryer and BaByliss straighteners',
  'Fully stocked minibar with drinks',
  'Nespresso coffee machine, kettle and toaster',
  'WiFi',
  'Smart TV',
  'Iron and ironing board',
]

function amenityRows(items: string[]): [string, string][] {
  const rows: [string, string][] = []
  for (let i = 0; i < items.length; i += 2) {
    const right = items[i + 1]
    if (right !== undefined) rows.push([items[i], right])
  }
  return rows
}

export default function TheRoom() {
  const [activeSubTab, setActiveSubTab] = useState('plan')
  const [lightbox, setLightbox] = useState<string | null>(null)

  const images = activeSubTab === 'plan' ? [] : (GALLERIES[activeSubTab] ?? [])

  const selectFromPlan = (id: string) => {
    setActiveSubTab(id)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.querySelector('.room-gallery-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    })
  }

  return (
    <section className="page-section">
      <div className="page-header">
        <p className="section-label">38 m² · Gouraud Street, Gemmayze</p>
        <h2 className="section-title">The<br /><em>Space.</em></h2>
      </div>

      <div className="room-tabs">
        {SUB_TABS.map(tab => (
          <button
            key={tab.id}
            type="button"
            className={`room-tab${activeSubTab === tab.id ? ' active' : ''}`}
            onClick={() => setActiveSubTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeSubTab === 'plan' && (
        <div className="room-floor-plan">
          <p className="room-floor-plan-hint">Tap a numbered area to open its photo gallery.</p>
          <div className="room-floor-plan-wrap">
            <img
              className="room-floor-plan-img"
              src={PLAN_SRC}
              alt="Piglet Room general layout floor plan"
              loading="eager"
              decoding="async"
            />
            {PLAN_HOTSPOTS.map(zone => (
              <button
                key={zone.id}
                type="button"
                className="room-floor-hotspot"
                style={zone.style}
                aria-label={`View photos: ${zone.label}`}
                title={zone.label}
                onClick={() => selectFromPlan(zone.id)}
              >
              </button>
            ))}
          </div>
        </div>
      )}

      {activeSubTab !== 'plan' && (
        <>
          <div className="room-gallery-anchor" />
          {images.length > 0 ? (
            <div
              className={`room-gallery${activeSubTab === 'the-room' || activeSubTab === 'bathroom' || activeSubTab === 'kitchen' || activeSubTab === 'terrace' || activeSubTab === 'location' || activeSubTab === 'art' ? ' room-gallery--contain' : ''}${activeSubTab === 'the-room' || activeSubTab === 'location' ? ' room-gallery--contain-hero' : ''}`}
            >
              {images.map((src, i) => {
                const artHover = activeSubTab === 'art' ? ART_HOVER_BY_SRC[src] : undefined
                return (
                  <div
                    key={`${activeSubTab}-${i}`}
                    className={`room-gallery-item${artHover ? ' room-gallery-item--art' : ''}`}
                    tabIndex={artHover ? 0 : undefined}
                    onClick={() => setLightbox(src)}
                  >
                    <ResponsiveImage
                      src={src}
                      alt={artHover ? `${artHover.title} — artwork` : `${activeSubTab} ${i + 1}`}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        ;(e.currentTarget.closest('.room-gallery-item') as HTMLElement | null)?.style.setProperty('display', 'none')
                      }}
                    />
                    {artHover ? <ArtHoverOverlay copy={artHover} /> : null}
                  </div>
                )
              })}
            </div>
          ) : activeSubTab !== 'terrace' && activeSubTab !== 'art' ? (
            <p className="room-gallery-empty">
              No photos are available in this gallery yet.
            </p>
          ) : null}
        </>
      )}

      {(activeSubTab === 'the-room' || activeSubTab === 'plan') && (
        <div className="room-info">
          <div>
            <div className="room-description-stack">
              <p className="room-description room-description-summary">
                Sleeps two | 38 sqm studio | King Size Bed
              </p>
              <p className="room-description">
                Located on Gouraud Street in Gemmayze, The Piglet Room sits within the Cool
                Convivium V building, just 4 minutes by car from downtown. Thoughtfully designed
                with a warm, modern feel, the space features a comfortable king size bed with a
                couch set in front of it, a fully equipped kitchen, and a round table dining area.
              </p>
              <p className="room-description">
                The air-conditioned room also includes a flat-screen TV, en suite bathroom, and a
                fully stocked minibar for your convenience.
              </p>
              <p className="room-description">
                Guests have access to a shared outdoor terrace, an inviting space to relax and
                socialize. Located in the same building as Ginette Café, you&apos;re steps away
                from one of the area&apos;s most popular spots, with restaurants, bars, cafés, and
                nightlife all within walking distance.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
              <a
                href="https://www.airbnb.com/hosting/listings"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-dark"
              >
                Book on Airbnb
              </a>
              <p style={{ fontSize: '13px', color: 'var(--gray-text)' }}>
                *Terrace available May–September
              </p>
            </div>
          </div>

          <div>
            <p className="section-label" style={{ marginBottom: '24px' }}>Amenities</p>
            <div className="room-amenities">
              {amenityRows(AMENITIES).map(([left, right], i) => (
                <div key={i} className="room-amenity-row">
                  <div className="amenity">{left}</div>
                  <div className="amenity">{right}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'bathroom' && (
        <div className="room-tab-copy">
          <div className="room-description-stack">
            <p className="room-description room-description-summary">
              En suite bathroom | 3.6 sqm
            </p>
            <p className="room-description">
              The En suite bathroom is designed with an oriental inspired aesthetic, blending warm
              tones and natural materials to create a calm, intimate atmosphere. A wooden mirror and
              soft lighting add depth, while a crafted wooden partition gently frames a walk in shower,
              adding structure to the space.
            </p>
            <p className="room-description">
              Layered with character, the walls are accented with carefully selected artwork, bringing
              texture and a collected, lived-in feel. Altogether, the space feels cozy, grounding, and
              quietly refined, a place to slow down and unwind.
            </p>
          </div>
        </div>
      )}

      {activeSubTab === 'kitchen' && (
        <div className="room-tab-copy">
          <div className="room-description-stack">
            <h3 className="room-tab-title">Open Kitchen & Honest Minibar</h3>
            <p className="room-description">
              The open kitchen is fully equipped with a Nespresso machine, kettle, toaster, and
              everything you need for easy, relaxed living. For longer stays, you&apos;ll also find a
              washing machine, iron, and ironing board.
            </p>
            <p className="room-description">
              A round dining table with four chairs creates the perfect spot to enjoy a drink, a meal,
              or simply unwind.
            </p>
            <p className="room-description">
              You&apos;ll also find a thoughtfully curated minibar,{' '}
              <em>
                without the usual hotel prices (everything is priced like your local supermarket).
              </em>
            </p>
            <p className="room-description">
              <em>✨ A blend of practicality and little luxuries that make all the difference.</em>
            </p>
          </div>
        </div>
      )}

      {activeSubTab === 'location' && (
        <div className="room-tab-copy">
          <div className="room-description-stack">
            <p className="room-description">
              Imagine stepping out of your room and grabbing your morning coffee at Ginette Coffee Shop,
              right in the same building!
            </p>
            <p className="room-description">
              Located on Gouraud Street, Gemmayze, your cozy stay puts the best of the neighborhood
              within reach.
            </p>
          </div>
        </div>
      )}

      {activeSubTab === 'art' && (
        <div className="room-tab-copy">
          <div className="room-description-stack">
            <p className="room-description">
              There&apos;s a moment when the details begin to reveal themselves. A piece on the wall
              catches your eye. Later, it feels different as the light shifts.
            </p>
            <p className="room-description">
              The artworks in Piglet Room are part of the stay, not just the space. Curated with
              Arte Ahead, they quietly shape the atmosphere.
            </p>
            <p className="room-description">
              You might pause a little longer. Or notice something new the second time.
            </p>
            <p className="room-description">
              A small detail, but one that stays with you.
            </p>
            {images.length === 0 && (
              <p className="room-description">
                <em>Gallery photos will appear above once they are added.</em>
              </p>
            )}
          </div>
        </div>
      )}

      {activeSubTab === 'terrace' && (
        <div className="room-tab-copy">
          <div className="room-description-stack">
            <h3 className="room-tab-title">Communal terrace · 29&nbsp;m² · May–September</h3>
            <p className="room-description">
              Step into a shared outdoor terrace for guests in the building—an open-air counterpoint
              to the studio&apos;s quiet interior. There&apos;s space to settle with a morning coffee,
              read in the shade, or share a bottle as the evening cools over Gemmayze.
            </p>
            <p className="room-description">
              Seating, planters, and a relaxed layout make it easy to linger. You&apos;re still within
              the same address as Ginette Café, with restaurants, bars, and cafés a short walk away
              when you want to slip back into the street&apos;s rhythm.
            </p>
            {images.length === 0 && (
              <p className="room-description">
                <em>Photos of the terrace will appear in this gallery soon—we&apos;re updating this section.</em>
              </p>
            )}
          </div>
        </div>
      )}

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button type="button" className="lightbox-close" onClick={() => setLightbox(null)}>×</button>
          <img src={lightbox} alt="Room detail" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </section>
  )
}
