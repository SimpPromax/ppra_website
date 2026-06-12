import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// Import your logos
import iconLogo from '../assets/3d ppra transparent.png'
import textLogo from '../assets/text ppra logo - Copy.png'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const headerRef = useRef(null)
  const logoRef = useRef(null)
  const headerInnerRef = useRef(null)
  const location = useLocation()

  // Handle scroll throttle
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 30)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  // Mount Mount Entrance Animation
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

    tl.from(headerRef.current, {
      yPercent: -100,
      duration: 1,
    })
    .from(logoRef.current, {
      x: -20,
      opacity: 0,
      duration: 0.8,
    }, '-=0.5')
  }, { scope: headerRef })

  // Sleek Shrink & Expansion Scroll Animation
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    if (isScrolled) {
      // Shrink Header Space
      gsap.to(headerRef.current, {
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        duration: 0.5,
        ease: 'power3.out',
      })
      // Sophisticated inward pull of content (no font stretching)
      gsap.to(headerInnerRef.current, {
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        maxWidth: '1200px',
        duration: 0.5,
        ease: 'power3.out',
      })
    } else {
      // Reset to original spacious frame
      gsap.to(headerRef.current, {
        paddingTop: '1rem',
        paddingBottom: '1rem',
        duration: 0.5,
        ease: 'power3.out',
      })
      gsap.to(headerInnerRef.current, {
        paddingLeft: '0rem',
        paddingRight: '0rem',
        maxWidth: '100%',
        duration: 0.5,
        ease: 'power3.out',
      })
    }
  }, [isScrolled])

  // Micro-interactions on Hover (Instead of squishing structural layout)
  const handleLogoHover = () => {
    gsap.to('.logo-text-container', { x: 4, duration: 0.3, ease: 'power2.out' })
  }

  const handleLogoLeave = () => {
    gsap.to('.logo-text-container', { x: 0, duration: 0.3, ease: 'power2.out' })
  }

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/about', label: 'About' },
    { to: '/news', label: 'News' },
  ]

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 py-4 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-white/0 backdrop-blur-none shadow-none'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div 
          ref={headerInnerRef}
          className="mx-auto w-full"
        >
          <div className="flex items-center justify-between h-14 md:h-16">
            
            {/* Logo Section - Left Side */}
            <div className="flex items-center gap-8 flex-1">
              <Link
                to="/"
                ref={logoRef}
                onMouseEnter={handleLogoHover}
                onMouseLeave={handleLogoLeave}
                className="flex items-center gap-3 group shrink-0"
              >
                {/* 3D Icon Logo */}
                <img 
                  src={iconLogo} 
                  alt="PPRA Icon" 
                  className="w-20 h-20 md:w-25 md:h-25 object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                />
                {/* Text Logo Image */}
                <div className="logo-text-container">
                  <img 
                    src={textLogo} 
                    alt="PPRA Logo Text" 
                    className="h-8 md:h-40 w-auto object-contain"
                  />
                </div>
              </Link>
            </div>

            {/* Navigation and Actions - Right Side */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {/* Navigation Menu */}
              <nav className="flex items-center gap-1 lg:gap-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `relative px-4 py-2 text-sm lg:text-base font-semibold transition-colors duration-300 group ${
                        isActive
                          ? 'text-clear-navy-600'
                          : 'text-gray-600 hover:text-clear-navy-600'
                      }`
                    }
                  >
                    <span>{link.label}</span>
                    <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-clear-navy-500 origin-left transform transition-transform duration-300 scale-x-0 group-hover:scale-x-100 ${
                      location.pathname === link.to ? 'scale-x-100' : ''
                    }`}></span>
                  </NavLink>
                ))}
              </nav>
              
              {/* Call Button */}
              <a
                href="tel:+254700123456"
                className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="hidden lg:inline text-sm font-semibold">Call Now</span>
              </a>

              {/* Referral Button - Professional Green */}
              <a
                href="#contact"
                className="px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 bg-professional-green-500 text-white hover:bg-professional-green-600 shadow-sm hover:shadow-md"
              >
                Make a Referral
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-colors duration-300 text-deep-navy-800 hover:bg-gray-50"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 animate-in fade-in slide-in-from-top-5 duration-300">
              <div className="bg-white border border-gray-100 rounded-xl shadow-xl p-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-2.5 rounded-lg text-base font-semibold transition-all duration-300 ${
                        isActive
                          ? 'bg-clear-navy-50 text-clear-navy-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                <div className="border-t border-gray-100 mt-3 pt-3 space-y-2">
                  <a
                    href="tel:+254700123456"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call Now
                  </a>
                  <a
                    href="#contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-center font-bold text-xs uppercase tracking-wider px-4 py-3 rounded-lg bg-professional-green-500 text-white hover:bg-professional-green-600"
                  >
                    Make a Referral
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}