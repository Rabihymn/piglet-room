import { useState, useEffect, useCallback } from 'react'
import { IMAGE_WEBP_WIDTHS, withWebpVariant } from './ResponsiveImage'

const LOGO_FULL_SRC = '/logo/logo final.png'
const LOGO_PIG_SRC = '/logo/pig.png'
const LOGO_FULL_WEBP_SRCSET = IMAGE_WEBP_WIDTHS.map(w => `${withWebpVariant(LOGO_FULL_SRC, w)} ${w}w`).join(', ')
const LOGO_PIG_WEBP_SRCSET = IMAGE_WEBP_WIDTHS.map(w => `${withWebpVariant(LOGO_PIG_SRC, w)} ${w}w`).join(', ')
const LOGO_SIZES = '(max-width: 700px) 200px, 320px'

interface NavbarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const TABS = [
  { id: 'about',    label: 'About' },
  { id: 'the-room', label: 'The Room' },
  { id: 'reviews',  label: 'Reviews' },
  { id: 'mini-bar', label: 'Mini Bar' },
  { id: 't-shirt',  label: 'T-Shirt' },
  { id: 'contact',  label: 'Contact' },
]

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
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
  }, [activeTab, closeMenu])

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
    return () => { document.body.style.overflow = prev }
  }, [menuOpen])

  const goHome = () => {
    setActiveTab('home')
    closeMenu()
  }

  const selectTab = (id: string) => {
    setActiveTab(id)
    closeMenu()
  }

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
          <div className="navbar-logo" onClick={goHome}>
            <picture>
              <source type="image/webp" srcSet={LOGO_FULL_WEBP_SRCSET} sizes={LOGO_SIZES} />
              <img
                className={`logo-full${scrolled ? ' logo-out' : ''}`}
                src={LOGO_FULL_SRC}
                alt="Piglet Room"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </picture>
            <picture>
              <source type="image/webp" srcSet={LOGO_PIG_WEBP_SRCSET} sizes={LOGO_SIZES} />
              <img
                className={`logo-pig${scrolled ? ' logo-in' : ''}`}
                src={LOGO_PIG_SRC}
                alt="Piglet Room"
                loading="eager"
                decoding="async"
              />
            </picture>
          </div>
        </div>

        <span className="navbar-spacer" aria-hidden="true" />

        <ul className="navbar-tabs" id="navbar-menu-panel">
          {TABS.map(tab => (
            <li
              key={tab.id}
              className={`navbar-tab${activeTab === tab.id ? ' active' : ''}`}
              onClick={() => selectTab(tab.id)}
            >
              {tab.label}
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
