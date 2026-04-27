import type { Metadata } from 'next'
import MiniBarMenu from '@/components/MiniBarMenu'

export const metadata: Metadata = {
  title: 'The Mini Bar | Piglet Room — Honest Pricing',
  description: 'Supermarket prices in your room. Browse the Piglet Room minibar menu.',
  alternates: { canonical: '/mini-bar' },
}

export default function MiniBarPage() {
  return <MiniBarMenu />
}
