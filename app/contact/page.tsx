import type { Metadata } from 'next'
import Contact from '@/components/Contact'

export const metadata: Metadata = {
  title: 'Contact | Piglet Room — Gemmayze, Beirut',
  description: 'Get in touch with Piglet Room. Find us on Instagram, by email, or visit us on Gouraud Street.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return <Contact />
}
