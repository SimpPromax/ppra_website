import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Services from './pages/Services'
import NotFound from './pages/NotFound'
import { ReactLenis } from 'lenis/react'; // Note the new clean import path

function App() {
  // Prevent scroll restoration issues
  useEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, [])

  return (
// autoRaf: true automatically takes care of the frame-rate ticking for React 19
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, autoRaf: true }}>
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="grow pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
    </ReactLenis>
  )
}

export default App