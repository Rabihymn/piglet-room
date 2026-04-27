import type { Metadata } from 'next'
import About from '@/components/About'

export const metadata: Metadata = {
  title: 'About Piglet Room | A Cozy Studio in Gemmayze, Beirut',
  description:
    'The story behind Piglet Room — a quiet, design-forward studio for rent on Gouraud Street, Gemmayze, Beirut.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return <About />
}
