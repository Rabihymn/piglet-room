const SHIRTS = [1, 2, 3, 4, 5, 6, 16].map(n => `/tshirt/${n}.png`)

export default function TShirt() {
  return (
    <section className="page-section">
      <div className="page-header">
        <p className="section-label">Merchandise</p>
        <h2 className="section-title">
          The Piglet<br /><em>Room Tee.</em>
        </h2>
      </div>

      <div className="tshirt-grid">
        {SHIRTS.map((src, i) => (
          <div key={i} className="tshirt-item">
            <img
              src={src}
              alt={`Piglet Room T-shirt ${i + 1}`}
              loading="lazy"
              decoding="async"
              onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }}
            />
          </div>
        ))}
      </div>

      <div className="tshirt-info">
        <p className="tshirt-description">
          "A small part of your Piglet Room experience."
        </p>
        <p className="tshirt-body">
          Wear it, capture your moment, and tag us.
          Just something to make your stay feel even more special.
        </p>
        <a
          href="https://www.instagram.com/pigletroom_/"
          target="_blank"
          rel="noopener noreferrer"
          className="tshirt-handle"
        >
          @pigletroom_
        </a>
      </div>
    </section>
  )
}
