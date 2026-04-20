import { useState } from 'react'
import type { CSSProperties } from 'react'

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
              className={`room-gallery${activeSubTab === 'the-room' || activeSubTab === 'bathroom' || activeSubTab === 'kitchen' || activeSubTab === 'terrace' || activeSubTab === 'location' ? ' room-gallery--contain' : ''}${activeSubTab === 'the-room' || activeSubTab === 'location' ? ' room-gallery--contain-hero' : ''}`}
            >
              {images.map((src, i) => (
                <div
                  key={`${activeSubTab}-${i}`}
                  className="room-gallery-item"
                  onClick={() => setLightbox(src)}
                >
                  <img
                    src={src}
                    alt={`${activeSubTab} ${i + 1}`}
                    onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }}
                  />
                </div>
              ))}
            </div>
          ) : activeSubTab !== 'terrace' ? (
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
