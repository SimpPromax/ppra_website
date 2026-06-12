import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Local transparent image imports
import imgP from '../assets/p transparent.png'
import imgR from '../assets/r transparent.png'
import imgA from '../assets/a transparent.png'

if (typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Footer() {
  const logoWrapperRef = useRef(null) // Added proper ref wrapper container
  const letterPRef = useRef(null)
  const letterP2Ref = useRef(null)
  const letterRRef = useRef(null)
  const letterARef = useRef(null)

  useGSAP(() => {
    const letters = [letterPRef.current, letterP2Ref.current, letterRRef.current, letterARef.current]
    
    // Safety check if items aren't rendered
    if (letters.some(el => !el)) return

    // Create a master timeline to keep animations organized
    const masterTl = gsap.timeline()

    // 1. Initial staggered premium fade-in
    masterTl.fromTo(letters,
      {
        opacity: 0,
        y: 50,
        scale: 0.85
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "back.out(1.4)"
      }
    )

// 2. Continuous Sequential Wave / Pulse Loop with a Delay Between Waves
const pulseTimeline = gsap.timeline({
  repeat: -1,        
  repeatDelay: 5.0   // Long delay before a quick flash
});

pulseTimeline.to(letters, {
  scale: 1.12,             
  filter: "brightness(1.4)", 
  duration: 0.2,       // Sharp, snappy pop
  stagger: {
    each: 0.08,        // Tight ripple effect down the sequence
    yoyo: true,        
    repeat: 1          
  },
  ease: "power1.out"
});

// Add this timeline to your master timeline
masterTl.add(pulseTimeline, "-=0.2");

    // 3. Scroll-triggered parallax effect fixed using logoWrapperRef
    letters.forEach((letter) => {
      gsap.to(letter, {
        y: 40,
        ease: "none",
        scrollTrigger: {
          trigger: logoWrapperRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true
        }
      })
    })

  }, [])

  return (
    <footer className="footer_component bg-deep-navy-800 text-soft-cream-100 mt-20 relative overflow-hidden">
      {/* Top Section with vertical lines */}
      <div className="footer_top relative">
        {/* Vertical Line Wrapper */}
        <div className="line-wrapper absolute inset-0 flex justify-between px-8 pointer-events-none z-0">
          <div className="vertical-line w-px h-full bg-white/30"></div>
          <div className="vertical-line w-px h-full bg-white/30 hidden md:block"></div>
          <div className="vertical-line w-px h-full bg-white/30 hidden md:block"></div>
          <div className="vertical-line w-px h-full bg-white/30"></div>
          <div className="vertical-line w-px h-full bg-white/30 hidden lg:block"></div>
        </div>

        <div className="padding-global px-4 sm:px-6 lg:px-8">
          <div className="container-large max-w-7xl mx-auto">
            <div className="footer_top-wrapper grid grid-cols-1 lg:grid-cols-12 gap-8 py-16 relative z-10">
              
              {/* Left Column - Newsletter (Hidden but structured) */}
              <div className="footer_left-wrapper lg:col-span-4">
                <div className="line-height-150 hidden">
                  <div className="text-style-allcaps text-sm font-semibold text-soft-cream-400">Join our newsletter</div>
                </div>
                <div className="footer_form-block hidden">
                  <form className="footer_form flex">
                    <input 
                      type="email" 
                      placeholder="Your Email*" 
                      className="footer_form-input bg-white/10 border border-white/20 rounded-l-xl px-4 py-3 text-sm focus:outline-none focus:border-professional-green-500"
                    />
                    <button type="button" className="footer_form-button bg-professional-green-600 px-4 rounded-r-xl hover:bg-professional-green-700 transition-colors">
                      <svg width="20" height="20" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.565 5.695L13.13 5.13L12.565 4.565L8.565 0.565L8 0L6.8675 1.1325C6.9 1.165 7.9675 2.2325 10.0675 4.3325H0V5.9325H10.0675C7.9675 8.0325 6.9 9.1 6.8675 9.1325L8 10.265L8.565 9.7L12.565 5.7V5.695Z" fill="currentColor"></path>
                      </svg>
                    </button>
                  </form>
                </div>
              </div>

              {/* Middle Column - Navigation Links */}
              <div className="footer_menu-wrapper lg:col-span-5 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Company Links */}
                <div className="footer_link-column">
                  <div className="text-style-muted-50 text-style-allcaps text-sm font-semibold text-soft-cream-400 uppercase tracking-wider mb-4">
                    PPRA
                  </div>
                  <div className="footer_link-list flex flex-col space-y-3">
                    <Link to="/about" className="footer_link text-soft-cream-300 hover:text-white transition-colors">About Us</Link>
                    <Link to="/services" className="footer_link text-soft-cream-300 hover:text-white transition-colors">Services</Link>
                    <Link to="/careers" className="footer_link text-soft-cream-300 hover:text-white transition-colors">Careers</Link>
                    <Link to="/press" className="footer_link text-soft-cream-300 hover:text-white transition-colors">News & Press</Link>
                    <Link to="/contact" className="footer_link text-soft-cream-300 hover:text-white transition-colors">Contact</Link>
                  </div>
                </div>

                {/* Resources Links */}
                <div className="footer_link-column">
                  <div className="text-style-muted-50 text-style-allcaps text-sm font-semibold text-soft-cream-400 uppercase tracking-wider mb-4">
                    Resources
                  </div>
                  <div className="footer_link-list flex flex-col space-y-3">
                    <a href="#" className="footer_link text-soft-cream-300 hover:text-white transition-colors">Market Reference Guide</a>
                    <a href="#" className="footer_link text-soft-cream-300 hover:text-white transition-colors">AGPO Program</a>
                    <a href="#" className="footer_link text-soft-cream-300 hover:text-white transition-colors">Compliance Reports</a>
                    <a href="#" className="footer_link text-soft-cream-300 hover:text-white transition-colors">Tender Notices</a>
                  </div>
                </div>

                {/* Connect Links */}
                <div className="footer_link-column">
                  <div className="text-style-muted-50 text-style-allcaps text-sm font-semibold text-soft-cream-400 uppercase tracking-wider mb-4">
                    Connect
                  </div>
                  <div className="footer_link-list flex flex-col space-y-3">
                    <a href="https://www.linkedin.com/company/ppra-kenya" target="_blank" rel="noopener noreferrer" className="footer_link text-soft-cream-300 hover:text-white transition-colors">LinkedIn</a>
                    <a href="https://twitter.com/ppra_kenya" target="_blank" rel="noopener noreferrer" className="footer_link text-soft-cream-300 hover:text-white transition-colors">Twitter</a>
                    <a href="#" className="footer_link text-soft-cream-300 hover:text-white transition-colors">YouTube</a>
                  </div>
                </div>
              </div>

              {/* Right Column - Decor Image / Coordinates */}
              <div className="footer_decor-wrapper lg:col-span-3 flex justify-end">
                <div className="footer_decor-image text-soft-cream-500 text-right">
                  <div className="text-xs font-mono opacity-50">
                    1° 17' S<br />
                    36° 49' E<br />
                    Nairobi, Kenya
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section - Image Logo Layout with Added Wrapper Ref and hardware optimization styles */}
      <div ref={logoWrapperRef} className="footer_middle w-full overflow-hidden">
        <a 
          href="/" 
          aria-current="page" 
          className="footer_image-wrapper w-inline-block w--current w-full grid grid-cols-4 items-center"
        >
          <img 
            ref={letterPRef}
            loading="lazy" 
            src={imgP} 
            alt="P" 
            className="footer_logo-image is-1 w-full h-auto object-contain block will-change-transform"
          />
          <img 
            ref={letterP2Ref}
            loading="lazy" 
            src={imgP} 
            alt="P" 
            className="footer_logo-image w-full h-auto object-contain block will-change-transform"
          />
          <img 
            ref={letterRRef}
            loading="lazy" 
            src={imgR} 
            alt="R" 
            className="footer_logo-image w-full h-auto object-contain block will-change-transform md:scale-115"
          />
          <img 
            ref={letterARef}
            loading="lazy" 
            src={imgA} 
            alt="A" 
            className="footer_logo-image w-full h-auto object-contain block will-change-transform md:scale-115"
          />
        </a>
      </div>

      {/* Bottom Section - Copyright & Legal Links */}
      <div className="footer_bottom">
        <div className="padding-global px-4 sm:px-6 lg:px-8">
          <div className="container-large max-w-7xl mx-auto">
            <div className="footer_bottom-wrapper flex flex-col md:flex-row justify-between items-center gap-4 text-sm py-6">
              <div className="footer_credit-text text-soft-cream-400">
                © 2026 PPRA Kenya. All rights reserved.
              </div>
              
              <a 
                href="https://www.yugenagency.co/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer_legal-link no-underline text-soft-cream-400 hover:text-white transition-colors"
              >
                Website by Leon Odhiambo
              </a>
              
              <div className="footer_legal-list flex gap-6">
                <Link to="/legal/privacy-policy" className="footer_legal-link text-soft-cream-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/legal/terms-conditions" className="footer_legal-link text-soft-cream-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}