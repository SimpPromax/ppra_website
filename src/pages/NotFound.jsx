import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function NotFound() {
  const cardRef = useRef(null)
  const numberRef = useRef(null)
  const titleRef = useRef(null)
  const messageRef = useRef(null)
  const buttonRef = useRef(null)

  useGSAP(() => {
    gsap.from(cardRef.current, {
      scale: 0.8,
      opacity: 0,
      rotationY: 30,
      duration: 0.8,
      ease: 'back.out(1.2)'
    })

    gsap.from(numberRef.current, {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: 'bounce.out',
      delay: 0.3
    })

    gsap.from(titleRef.current, {
      x: -50,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      delay: 0.6
    })

    gsap.from(messageRef.current, {
      x: 50,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      delay: 0.8
    })

    gsap.from(buttonRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
      delay: 1
    })

    gsap.to(buttonRef.current, {
      scale: 1.05,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      delay: 1.5
    })
  }, { scope: cardRef })

  useGSAP(() => {
    gsap.to('.float-circle', {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.5
    })
  }, [])

  return (
    <div className="min-h-screen bg-linear-to-br from-deep-navy-700 via-deep-navy-800 to-deep-navy-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative floating circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="float-circle absolute top-20 left-10 w-64 h-64 bg-clear-navy-500/5 rounded-full blur-3xl"></div>
        <div className="float-circle absolute bottom-20 right-10 w-80 h-80 bg-clear-navy-500/5 rounded-full blur-3xl" style={{ animationDelay: '1s' }}></div>
        <div className="float-circle absolute top-1/2 left-1/2 w-96 h-96 bg-clear-navy-500/5 rounded-full blur-3xl" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Card */}
      <div ref={cardRef} className="relative z-10 max-w-lg w-full mx-4">
        <div className="bg-white rounded-md shadow-2xl overflow-hidden transform transition-all duration-500">
          {/* Decorative top bar */}
          <div className="h-2 bg-linear-to-r from-clear-navy-500 via-professional-green-500 to-clear-navy-500"></div>
          
          <div className="p-8 md:p-12 text-center">
            {/* 404 Number */}
            <div ref={numberRef} className="mb-6">
              <div className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-linear-to-r from-clear-navy-500 to-deep-navy-600">
                404
              </div>
            </div>

            {/* Icon */}
            <div className="mb-6">
              <div className="w-24 h-24 bg-clear-navy-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-12 h-12 text-clear-navy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h2 ref={titleRef} className="text-2xl md:text-3xl font-bold text-deep-navy-800 mb-3">
              Oops! Page Not Found
            </h2>

            {/* Message */}
            <p ref={messageRef} className="text-gray-600 mb-8 leading-relaxed">
              The page you're looking for doesn't exist or has been moved. 
              Let's get you back on track.
            </p>

            {/* Action Buttons */}
            <div ref={buttonRef} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 bg-clear-navy-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-clear-navy-600 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Back to Home
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 bg-soft-cream-100 text-deep-navy-700 px-6 py-3 rounded-md font-semibold hover:bg-soft-cream-200 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                View Services
              </Link>
            </div>

            {/* Help text */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Need immediate assistance? <a href="#contact" className="text-clear-navy-600 hover:text-clear-navy-700 font-medium">Contact our support team</a>
              </p>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -z-10 -top-10 -right-10 w-40 h-40 bg-clear-navy-500/20 rounded-full blur-2xl"></div>
        <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-clear-navy-500/20 rounded-full blur-2xl"></div>
      </div>
    </div>
  )
}