'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Tab {
  id: string
  label: string
  href: string
}

const TABS: Tab[] = [
  { id: 'about', label: 'About', href: '/about' },
  { id: 'the-room', label: 'The Room', href: '/the-room' },
  { id: 'reviews', label: 'Reviews', href: '/reviews' },
  { id: 'mini-bar', label: 'Mini Bar', href: '/mini-bar' },
  { id: 't-shirt', label: 'T-Shirt', href: '/t-shirt' },
  { id: 'contact', label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const toggleMenu = useCallback(() => setMenuOpen(o => !o), [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    closeMenu()
  }, [pathname, closeMenu])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen, closeMenu])

  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  return (
    <>
      <nav className={`navbar${menuOpen ? ' menu-open' : ''}`} aria-label="Main">
        <button
          type="button"
          className="navbar-menu-btn"
          aria-expanded={menuOpen}
          aria-controls="navbar-menu-panel"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={toggleMenu}
        >
          <span className="navbar-menu-btn-lines" aria-hidden>
            <span />
            <span />
            <span />
          </span>
        </button>

        <div className="navbar-logo-shell">
          <Link href="/" className="navbar-logo" onClick={closeMenu}>
            <Image
              className={`logo-full${scrolled ? ' logo-out' : ''}`}
              src="/logo/logo final.png"
              alt="Piglet Room"
              width={320}
              height={120}
              priority
              sizes="(max-width: 700px) 200px, 320px"
            />
            <Image
              className={`logo-pig${scrolled ? ' logo-in' : ''}`}
              src="/logo/pig.png"
              alt="Piglet Room"
              width={120}
              height={120}
              priority
              sizes="(max-width: 700px) 120px, 160px"
            />
          </Link>
        </div>

        <span className="navbar-spacer" aria-hidden="true" />

        <ul className="navbar-tabs" id="navbar-menu-panel">
          {TABS.map(tab => (
            <li
              key={tab.id}
              className={`navbar-tab${pathname === tab.href ? ' active' : ''}`}
            >
              <Link href={tab.href} onClick={closeMenu}>
                {tab.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <button
        type="button"
        className={`navbar-scrim${menuOpen ? ' is-visible' : ''}`}
        aria-label="Close menu"
        tabIndex={menuOpen ? 0 : -1}
        onClick={closeMenu}
      />
    </>
  )
}
