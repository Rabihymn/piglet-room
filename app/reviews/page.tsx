import type { Metadata } from 'next'
import Reviews from '@/components/Reviews'

export const metadata: Metadata = {
  title: 'Guest Reviews | Piglet Room — Gemmayze, Beirut',
  description: 'Read what guests are saying about their stay at Piglet Room in Gemmayze, Beirut.',
  alternates: { canonical: '/reviews' },
}

export default function ReviewsPage() {
  return <Reviews />
}
