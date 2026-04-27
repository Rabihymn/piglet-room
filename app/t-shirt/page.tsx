import type { Metadata } from 'next'
import TShirt from '@/components/TShirt'

export const metadata: Metadata = {
  title: 'Piglet Room Tee | Piglet Room — Gemmayze, Beirut',
  description: 'A small part of your Piglet Room experience — the Piglet Room Tee.',
  alternates: { canonical: '/t-shirt' },
}

export default function TShirtPage() {
  return <TShirt />
}
