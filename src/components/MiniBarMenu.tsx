import ResponsiveImage from './ResponsiveImage'

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
        <div className="">
          <div className="room-gallery-item">
            <ResponsiveImage
              src="/minibar-menu/4.png"
              alt="Minibar menu"
              loading="lazy"
              decoding="async"
              sizes="(max-width: 900px) 100vw, 50vw"
              onError={(e) => {
                ;(e.currentTarget.closest('.room-gallery-item') as HTMLElement | null)?.style.setProperty('display', 'none')
              }}
            />
          </div>
        </div>

        <div>
          <p className="section-label">Honest Pricing</p>
          <h3 className="minibar-headline">
            Supermarket prices. In your room.
          </h3>
          <p className="minibar-description">
            We all know the feeling… You open the minibar, check the price, and quietly close it again.
          </p>
          <p className="minibar-description">
            So we decided to do things a little differently. At Piglet Room, everything in the minibar is priced just like your local supermarket.
          </p>
          <p className="minibar-description">
            Help yourself, enjoy it, and make yourself at home. Go ahead… open it again.
          </p>
          <p className="minibar-signature">Piglet Room Team Xx</p>
          <a
            className="btn-dark"
            href="/minibar-menu/piglet-room-minibar-menu.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            View minibar menu
          </a>
        </div>
      </div>
    </section>
  )
}
