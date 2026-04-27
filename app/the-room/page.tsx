import type { Metadata } from 'next'
import TheRoom from '@/components/TheRoom'

export const metadata: Metadata = {
  title: 'The Room | Piglet Room — Gemmayze, Beirut',
  description:
    'Explore the Piglet Room studio: floor plan, bedroom, bathroom, open kitchen, terrace, location, and curated art in Gemmayze, Beirut.',
  alternates: { canonical: '/the-room' },
}

export default function TheRoomPage() {
  return <TheRoom />
}
