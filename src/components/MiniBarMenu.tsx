export default function MiniBarMenu() {
  return (
    <section className="page-section">
      <div className="page-header">
        <p className="section-label">In-Room</p>
        <h2 className="section-title">
          The Mini<br /><em>Bar.</em>
        </h2>
      </div>

      <div className="minibar-layout">
        <div className="minibar-images">
          <img
            src="/minibar-menu/3.png"
            alt="Minibar"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
          <img
            src="/minibar-menu/4.png"
            alt="Minibar menu"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        </div>

        <div>
          <p className="section-label">Honest Pricing</p>
          <h3 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(28px, 3vw, 40px)',
            fontWeight: 300,
            marginBottom: '28px',
            lineHeight: 1.2,
            color: 'var(--charcoal)',
          }}>
            Supermarket prices.<br />In your room.
          </h3>
          <p className="minibar-description">
            We believe in honesty — including in our minibar.
            Everything is priced at supermarket rates because we think
            small moments of generosity make a big difference to a stay.
          </p>
          <p className="minibar-description">
            Help yourself. Enjoy it. That's what it's here for.
          </p>
          <span className="minibar-tag">No Hidden Markups</span>
        </div>
      </div>
    </section>
  )
}
