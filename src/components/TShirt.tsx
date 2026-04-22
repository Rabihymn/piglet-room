import { IMAGE_WEBP_WIDTHS, withWebpVariant } from './ResponsiveImage'

const SHIRTS = [1, 2, 3, 4, 5, 16, 6].map(n => `/tshirt/${n}.png`)

export default function TShirt() {
  return (
    <section className="tshirt-section">
      <div className="page-header">
      </div>

      <div className="tshirt-info">
        <p className="tshirt-lead">Piglet Room Tee</p>
        <p className="tshirt-body">A small part of your Piglet Room experience.</p>
        <p className="tshirt-body">
          Wear it, capture your moment, and tag us{' '}
          <a
            href="https://www.instagram.com/pigletroom_/"
            target="_blank"
            rel="noopener noreferrer"
            className="tshirt-handle"
          >
            @pigletroom_
          </a>
        </p>
        <p className="tshirt-body">
          Just something to make your stay feel even more special.
        </p>
        <p className="tshirt-hashtag ">#Moments in the Piglet Room  tee  🤍</p>
      </div>

      <div className="tshirt-grid">
        {SHIRTS.map((src, i) => (
          <div key={i} className="tshirt-item">
            <picture>
              <source
                type="image/webp"
                srcSet={IMAGE_WEBP_WIDTHS.map(w => `${withWebpVariant(src, w)} ${w}w`).join(', ')}
                sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
              />
              <img
                src={src}
                alt={`Piglet Room T-shirt ${i + 1}`}
                loading="lazy"
                decoding="async"
                onError={(e) => { (e.target as HTMLImageElement).closest('.tshirt-item')!.style.display = 'none' }}
              />
            </picture>
          </div>
        ))}
      </div>
    </section>
  )
}
