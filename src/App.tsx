import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import TheRoom from './components/TheRoom'
import Reviews from './components/Reviews'
import MiniBarMenu from './components/MiniBarMenu'
import TShirt from './components/TShirt'
import Contact from './components/Contact'

type TabId = 'home' | 'about' | 'the-room' | 'reviews' | 'mini-bar' | 't-shirt' | 'contact'

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('home')

  const renderPage = () => {
    switch (activeTab) {
      case 'home':     return <Home setActiveTab={setActiveTab} />
      case 'about':    return <About />
      case 'the-room': return <TheRoom />
      case 'reviews':  return <Reviews />
      case 'mini-bar': return <MiniBarMenu />
      case 't-shirt':  return <TShirt />
      case 'contact':  return <Contact />
    }
  }

  return (
    <div className="app">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>{renderPage()}</main>
    </div>
  )
}
