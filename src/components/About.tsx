import { IMAGE_WEBP_WIDTHS, withWebpVariant } from './ResponsiveImage'

export default function About() {
  return (
    <section className="page-section">
      <div className="page-header">
        <p className="section-label">Our Story</p>
        <h2 className="section-title">
          A pause,<br /><em>not just a place.</em>
        </h2>
      </div>

      <div className="about-layout">
        <div>
          <div className="about-text about-text--voice">
            <p>Hi, I&apos;m the Piglet Room.</p>
            <p>
              I&apos;ve hosted late-night thinkers, early risers, and people who said they&apos;d
              &ldquo;just stay one night. (They rarely mean it.)&rdquo;
            </p>
            <p>
              I&apos;m small enough to feel safe, but full of little details you&apos;ll keep discovering.
            </p>
            <p>I wasn&apos;t designed to impress, I was created to feel like a pause.</p>
            <p>Not a hotel. Not just a rental.</p>
            <p>
              A quiet moment between places, where you can breathe, reset, and feel at home without trying.
            </p>
          </div>

          <div className="about-details">
            <div className="about-detail">
              <p className="about-detail-label">Location</p>
              <p className="about-detail-value">Gouraud Street<br />Gemmayze, Beirut</p>
            </div>
            <div className="about-detail">
              <p className="about-detail-label">Size</p>
              <p className="about-detail-value">40 m² Studio<br />+ 36 m² Seasonal Communal Terrace</p>
            </div>
            <div className="about-detail">
              <p className="about-detail-label">Capacity</p>
              <p className="about-detail-value">Sleeps 2<br />King Bed</p>
            </div>
            <div className="about-detail">
              <p className="about-detail-label">Follow</p>
              <p className="about-detail-value">
                <a
                  href="https://www.instagram.com/pigletroom_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="room-description-link"
                >
                  @pigletroom_
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="about-image-stack">
          <picture>
            <img
              className="about-image-main"
              src="/the-room/room/0.w768.webp"
              alt="Piglet Room interior"
              loading="eager"
              decoding="async"
              onError={(e) => { (e.target as HTMLImageElement).src = '/home/1.png' }}
            />
          </picture>
        </div>
      </div>
    </section>
  )
}
