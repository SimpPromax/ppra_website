import { Link } from 'react-router-dom'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function Footer() {
  const footerRef = useRef(null)

  useGSAP(() => {
    gsap.from(footerRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.6,
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    })
  }, { scope: footerRef })

  return (
    <footer ref={footerRef} className="bg-deep-navy-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-md bg-clear-navy-500 flex items-center justify-center font-bold text-lg">
                P
              </div>
              <div>
                <h3 className="font-bold text-lg">PPRA</h3>
                <p className="text-xs text-soft-cream-300">Public Procurement</p>
              </div>
            </div>
            <p className="text-soft-cream-200 text-sm mb-4">
              Ensuring transparency, fairness, and efficiency in public procurement processes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-soft-cream-300">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-soft-cream-200 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-soft-cream-200 hover:text-white transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <a href="#contact" className="text-soft-cream-200 hover:text-white transition-colors text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-soft-cream-300">Contact Info</h3>
            <ul className="space-y-2 text-sm text-soft-cream-200">
              <li>123 Government Avenue</li>
              <li>Capital City, 00100</li>
              <li>Phone: +254 700 123 456</li>
              <li>Email: info@ppra.go.ke</li>
            </ul>
          </div>

          {/* Office Hours */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-soft-cream-300">Office Hours</h3>
            <ul className="space-y-2 text-sm text-soft-cream-200">
              <li>Monday - Friday: 8:00 AM - 5:00 PM</li>
              <li>Saturday: 9:00 AM - 1:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-deep-navy-700 mt-8 pt-8 text-center text-sm text-soft-cream-300">
          <p>&copy; {new Date().getFullYear()} PPRA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}