import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Import your logo
import logoImage from '../assets/3d ppra transparent.png'

export default function Home() {
  const heroRef = useRef(null)
  const welcomeRef = useRef(null)
  const mainTitleRef = useRef(null)
  const descriptionRef = useRef(null)
  const introRef = useRef(null)
  const servicesRef = useRef(null)
  const numbersRef = useRef(null)
  const partnersRef = useRef(null)
  const contactRef = useRef(null)
  const offsetLogoRef = useRef(null)
  const logoContainerRef = useRef(null)
  
  const [displayText, setDisplayText] = useState('')
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  
  const words = ['Transparency', 'Integrity', 'Accountability', 'Simplicity']

  // Typewriter effect
  useEffect(() => {
    let timeout
    const currentWord = words[currentWordIndex]
    
    if (isTyping) {
      if (displayText.length < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1))
        }, 100)
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false)
        }, 1500)
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length - 1))
        }, 60)
      } else {
        setIsTyping(true)
        setCurrentWordIndex((prev) => (prev + 1) % words.length)
      }
    }
    
    return () => clearTimeout(timeout)
  }, [displayText, isTyping, currentWordIndex])

  // Hero section animations
  useGSAP(() => {
    const tl = gsap.timeline()
    
    tl.from(welcomeRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out'
    })
    .from(mainTitleRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.3')
    .from(descriptionRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.2')
  }, { scope: heroRef })

  // Interactive mouse move effect for the logo
  useGSAP(() => {
    const element = offsetLogoRef.current
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect()
      const logoCenterX = rect.left + rect.width / 2
      const logoCenterY = rect.top + rect.height / 2
      const distanceX = e.clientX - logoCenterX
      const distanceY = e.clientY - logoCenterY
      
      gsap.to(element, {
        x: distanceX * 0.25,
        y: distanceY * 0.25,
        scale: 1.1,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto'
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'elastic.out(1, 0.6)',
        overwrite: 'auto'
      })
    }

    const container = logoContainerRef.current
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, { scope: logoContainerRef })

  // Scroll animations for the logo - only parallax effect, always visible
  useGSAP(() => {
    if (!offsetLogoRef.current) return
    
    // Logo is already visible, just add parallax effect on scroll
    gsap.to(offsetLogoRef.current, {
      y: 50,
      ease: "none",
      scrollTrigger: {
        trigger: logoContainerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    })
    
    // Subtle floating animation that runs continuously
    gsap.to(offsetLogoRef.current, {
      y: -15,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: 0.5
    })
  }, [])

  // Intro section animation
  useGSAP(() => {
    gsap.from(introRef.current, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: introRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })
  }, { scope: introRef })

  // Services section animation
  useGSAP(() => {
    const cards = document.querySelectorAll('.service-card')
    
    gsap.from(cards, {
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2,
      scrollTrigger: {
        trigger: servicesRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    })
  }, { scope: servicesRef })

  // Numbers section animation
  useGSAP(() => {
    gsap.from(numbersRef.current, {
      scale: 0.95,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: numbersRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })
  }, { scope: numbersRef })

  // Partners section animation
  useGSAP(() => {
    const logos = document.querySelectorAll('.partner-logo')
    
    gsap.from(logos, {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      scrollTrigger: {
        trigger: partnersRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })
  }, { scope: partnersRef })

  // Contact section animation
  useGSAP(() => {
    gsap.from(contactRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: contactRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })
  }, { scope: contactRef })

  const services = [
    {
      icon: '📋',
      title: 'Procurement Regulation',
      description: 'Establishing and enforcing procurement rules and standards across all public entities.'
    },
    {
      icon: '🔍',
      title: 'Compliance Monitoring',
      description: 'Regular audits and monitoring to ensure compliance with procurement regulations.'
    },
    {
      icon: '📊',
      title: 'Capacity Building',
      description: 'Training and development programs for procurement professionals.'
    },
    {
      icon: '⚖️',
      title: 'Dispute Resolution',
      description: 'Fair and transparent resolution of procurement-related disputes.'
    },
    {
      icon: '📈',
      title: 'Policy Development',
      description: 'Creating and updating procurement policies to meet international standards.'
    },
    {
      icon: '🤝',
      title: 'Advisory Services',
      description: 'Expert guidance on complex procurement matters and best practices.'
    }
  ]

  const stats = [
    { number: '5,000+', label: 'Registered Entities', icon: '🏢' },
    { number: '₿150B+', label: 'Procurement Value', icon: '💰' },
    { number: '98%', label: 'Compliance Rate', icon: '✅' },
    { number: '500+', label: 'Trained Professionals', icon: '👥' }
  ]

  const partners = [
    { name: 'Partner 1', logo: '🏛️' },
    { name: 'Partner 2', logo: '🏦' },
    { name: 'Partner 3', logo: '📊' },
    { name: 'Partner 4', logo: '🌍' },
    { name: 'Partner 5', logo: '🏭' },
    { name: 'Partner 6', logo: '📈' }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-visible">
        <div className="absolute inset-0 bg-linear-to-br from-deep-navy-700 via-deep-navy-800 to-deep-navy-900">
          <div className="absolute inset-0 bg-deep-navy-900/50"></div>
        </div>
        
        <div className="relative z-10 w-full">
          <div className="min-h-screen">
            <div className="flex flex-col justify-center min-h-screen pl-4 sm:pl-8 md:pl-12 lg:pl-16 xl:pl-24 pr-4 sm:pr-8 md:pr-12 lg:pr-16 xl:pr-24 py-20">
              <div className="w-full">
                {/* Welcome Text */}
                <div ref={welcomeRef}>
                  <p className="text-soft-cream-300 text-sm md:text-base uppercase tracking-wider font-semibold mb-2">
                    WELCOME TO PPRA
                  </p>
                  <div className="w-16 h-0.5 bg-professional-green-500"></div>
                </div>
                
                {/* Main Title */}
                <div ref={mainTitleRef} className="mt-6 md:mt-8">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight">
                    Ensuring{' '}
                    <span className="text-clear-navy-300 inline-block">
                      {displayText}
                      <span className="animate-pulse">|</span>
                    </span>
                    <br />
                    <span>in Public</span>
                    <br />
                    <span>Procurement</span>
                  </h1>
                </div>
                
                {/* Description */}
                <div ref={descriptionRef} className="mt-6 md:mt-8">
                  <p className="text-base md:text-lg text-soft-cream-100 leading-relaxed max-w-3xl">
                    The Public Procurement Regulatory Authority (PPRA) is committed to promoting fair, 
                    efficient, and transparent procurement practices across all public entities.
                  </p>
                  
                  {/* CTA Button - Professional Green */}
                  <div className="mt-6 md:mt-8">
                    <Link
                      to="/services"
                      className="inline-flex items-center gap-2 bg-professional-green-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg hover:bg-professional-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Learn More
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-soft-cream-50 to-transparent"></div>
      </section>

      {/* Offset Logo Section - Between Hero and Intro with Interactive Mouse Effect */}
      {/* Increased downward offset with marginTop and marginBottom */}
      <div 
        ref={logoContainerRef} 
        className="relative overflow-visible cursor-pointer" 
        style={{ marginTop: '-80px', marginBottom: '-100px', zIndex: 20 }}
      >
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Logo positioned on the right side - Always Visible */}
          <div 
            ref={offsetLogoRef}
            className="absolute right-[5%] sm:right-[10%] md:right-[10%] lg:right-[5%] top-1/2 -translate-y-1/2 pointer-events-auto"
            style={{ opacity: 1, visibility: 'visible' }}
          >
            <div className="relative select-none">
              
              {/* Elegant deep glow effect */}
              <div className="absolute inset-0 bg-clear-navy-500/10 rounded-full blur-3xl scale-150"></div>
              
              {/* Logo Image - Always visible */}
              <img
                src={logoImage}
                alt="PPRA Logo"
                className="w-28 h-28 sm:w-45 sm:h-45 md:w-80 md:h-80 lg:w-120 lg:h-120 object-contain relative z-10 transition-shadow duration-500"
                style={{
                  filter: 'drop-shadow(0 20px 35px rgba(0,0,0,0.12))',
                  opacity: 1
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Intro Section */}
      <section ref={introRef} className="py-20 bg-soft-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-deep-navy-800 mb-4">About PPRA</h2>
            <div className="w-24 h-1 bg-clear-navy-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Established to regulate and oversee public procurement in Kenya, ensuring value for money and public trust.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                The Public Procurement Regulatory Authority (PPRA) is the principal regulatory body responsible for 
                overseeing public procurement in Kenya. Our mandate includes ensuring that public funds are utilized 
                efficiently, transparently, and in accordance with the law.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                We work closely with procuring entities to build capacity, monitor compliance, and promote best practices 
                in public procurement. Our goal is to create a procurement system that is fair, competitive, and delivers 
                value for money to the Kenyan people.
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-professional-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Transparency</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-professional-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Accountability</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-professional-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Fair Competition</span>
                </div>
              </div>
            </div>
            
            <div className="bg-linear-to-br from-clear-navy-500 to-deep-navy-600 rounded-2xl p-8 text-white">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
              <p className="text-soft-cream-100 mb-6">
                To promote integrity, transparency, and efficiency in public procurement through effective regulation, 
                capacity building, and stakeholder engagement.
              </p>
              <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
              <p className="text-soft-cream-100">
                To be a model public procurement regulatory authority in Africa, fostering economic development through 
                fair and transparent procurement systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-deep-navy-800 mb-4">Our Services</h2>
            <div className="w-24 h-1 bg-clear-navy-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive procurement services to ensure compliance and excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card bg-soft-cream-50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-deep-navy-700 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers Section */}
      <section ref={numbersRef} className="py-20 bg-linear-to-br from-deep-navy-700 to-deep-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Impact</h2>
            <div className="w-24 h-1 bg-clear-navy-400 mx-auto mb-6"></div>
            <p className="text-lg text-soft-cream-200 max-w-3xl mx-auto">
              Making a difference through effective procurement regulation
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-5xl mb-3">{stat.icon}</div>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-soft-cream-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section ref={partnersRef} className="py-20 bg-soft-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-deep-navy-800 mb-4">Our Partners</h2>
            <div className="w-24 h-1 bg-clear-navy-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Collaborating with leading organizations to enhance procurement standards
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="partner-logo bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="text-6xl mb-2">{partner.logo}</div>
                <div className="text-sm text-gray-600 font-medium">{partner.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Contact Section */}
      <section ref={contactRef} id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-deep-navy-800 mb-4">Contact Us</h2>
              <div className="w-24 h-1 bg-clear-navy-500 mb-6"></div>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Have questions or need assistance? Reach out to our team for support with procurement matters.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-clear-navy-100 rounded-xl flex items-center justify-center text-clear-navy-600 text-xl">
                    📍
                  </div>
                  <div>
                    <h3 className="font-semibold text-deep-navy-700 mb-1">Our Office</h3>
                    <p className="text-gray-600">123 Government Avenue, Capital City, 00100</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-clear-navy-100 rounded-xl flex items-center justify-center text-clear-navy-600 text-xl">
                    📞
                  </div>
                  <div>
                    <h3 className="font-semibold text-deep-navy-700 mb-1">Phone Number</h3>
                    <p className="text-gray-600">+254 700 123 456</p>
                    <p className="text-gray-600">+254 700 123 457</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-clear-navy-100 rounded-xl flex items-center justify-center text-clear-navy-600 text-xl">
                    ✉️
                  </div>
                  <div>
                    <h3 className="font-semibold text-deep-navy-700 mb-1">Email Address</h3>
                    <p className="text-gray-600">info@ppra.go.ke</p>
                    <p className="text-gray-600">support@ppra.go.ke</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-soft-cream-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-deep-navy-800 mb-6">Send us a message</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-clear-navy-500 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-clear-navy-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-clear-navy-500 focus:border-transparent"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-professional-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-professional-green-600 transition-all duration-300 transform hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}