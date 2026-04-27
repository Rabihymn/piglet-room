import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

const SITE_URL = 'https://pigletroom.com'
const TITLE = 'Room for Rent in Gemmayze Beirut | Piglet Room'
const DESCRIPTION =
  'Book Piglet Room, a cozy private room for rent on Gouraud Street in Gemmayze, Beirut—ideal if you’re looking for a rent in Beirut near Downtown Beirut, Saifi Village, cafés, restaurants, and nightlife.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'room for rent in Gemmayze Beirut',
    'room for rent in Gemayze Beirut',
    'rent in Beirut',
    'room for rent Beirut',
    'rent in downtown Beirut',
    'private room in Gemmayze',
    'private room Beirut',
    'stay in Gemmayze Beirut',
    'stay in Beirut',
    'Airbnb room in Gemmayze',
    'Piglet Room',
    'Gouraud Street Gemmayze',
  ],
  alternates: { canonical: '/' },
  icons: {
    icon: '/logo/pig.png',
    apple: '/logo/pig.png',
  },
  appleWebApp: { title: 'Piglet Room' },
  openGraph: {
    type: 'website',
    siteName: 'Piglet Room',
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    locale: 'en_US',
    images: [
      {
        url: '/home/1.png',
        width: 1600,
        height: 900,
        alt: 'Piglet Room boutique studio in Gemmayze, Beirut',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/home/1.png'],
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1a1a18',
}

const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: 'Piglet Room',
  description:
    'Private room for rent on Gouraud Street in Gemmayze, Beirut—a cozy stay for travelers comparing rent in Beirut or rent near Downtown Beirut. King bed, kitchen, en-suite bathroom, smart TV, minibar, and seasonal communal terrace.',
  url: SITE_URL,
  image: `${SITE_URL}/home/1.png`,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Gouraud Street',
    addressLocality: 'Gemmayze',
    addressRegion: 'Beirut',
    addressCountry: 'LB',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 33.8938, longitude: 35.5149 },
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'King Bed', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'En-suite Bathroom', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'WiFi', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Smart TV', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Air Conditioning', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Kitchen', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Minibar', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Terrace', value: true },
  ],
  numberOfRooms: 1,
  petsAllowed: false,
  sameAs: ['https://www.instagram.com/pigletroom_/'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
      </head>
      <body>
        <div className="app">
          <Navbar />
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
