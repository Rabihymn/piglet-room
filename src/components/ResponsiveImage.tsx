import type { CSSProperties, ReactEventHandler } from 'react'

type ResponsiveImageProps = {
  /** Original (fallback) image path (e.g. `/the-room/room/0.png`) */
  src: string
  alt: string
  className?: string
  sizes?: string
  loading?: 'lazy' | 'eager'
  decoding?: 'async' | 'auto' | 'sync'
  onClick?: () => void
  onError?: ReactEventHandler<HTMLImageElement>
  style?: CSSProperties
}

/** Widths emitted by `scripts/optimize-images.mjs` — used for `<picture>` WebP `srcset`. */
export const IMAGE_WEBP_WIDTHS = [480, 768, 1200, 1600] as const

/** `/foo/bar.png` → `/foo/bar.w768.webp` */
export function withWebpVariant(src: string, width: number) {
  return src.replace(/\.(png|jpe?g)$/i, `.w${width}.webp`)
}

export default function ResponsiveImage({
  src,
  alt,
  className,
  sizes = '(max-width: 900px) 100vw, 50vw',
  loading = 'lazy',
  decoding = 'async',
  onClick,
  onError,
  style,
}: ResponsiveImageProps) {
  const webpSrcSet = IMAGE_WEBP_WIDTHS.map(w => `${withWebpVariant(src, w)} ${w}w`).join(', ')

  return (
    <picture style={{ display: 'block' }}>
      <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        decoding={decoding}
        onClick={onClick}
        onError={onError}
        style={style}
      />
    </picture>
  )
}

