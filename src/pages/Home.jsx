import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

// Import assets
import logoImage from '../assets/3d ppra transparent.png'
import kenyanFlag from '../assets/kenyan flag.jpg'
import newspaperImage from '../assets/ppra finaicial newspaper pic.jpg'
import introVideo from '../assets/corporate pics/ppra video intro.mp4'

// Import decorative images
import dayDreamingImage from '../assets/undraw_day-dreaming_2mlz.svg'
import fileAnalysisImage from '../assets/undraw_file-analysis_nbtc.svg'
import vacationSelfieImage from '../assets/undraw_vacation-selfie_q5bs.svg'

// Import partner logos
import competitionAuthorityLogo from '../assets/Competition authority of kenya logo.png'
import ecitizenLogo from '../assets/E citizen logo.png'
import ethicsLogo from '../assets/Ethics and anti corruption logo.png'
import germanCorporationLogo from '../assets/German corporation logo.png'
import kisimLogo from '../assets/Kisim logo.png'
import officeOfAgLogo from '../assets/Office of the ag logo.png'
import openContractingLogo from '../assets/Open contracting partnership logo.png'
import openOwnershipLogo from '../assets/Open ownership logo.png'

// Safely import all 10 production assets
import corporate2 from '../assets/corporate pics/corporate 2.jpg';
import corporateAgri from '../assets/corporate pics/corporate agriculture.jpg';
import corporateNews from '../assets/corporate pics/corporate newspsper.jpg';
import corporateHands from '../assets/corporate pics/corporate shaking hands.jpg';
import corporateSky from '../assets/corporate pics/corporate skyscraper.jpg';
import corporate4 from '../assets/corporate pics/corprate 4.jpg';
import corporateAlt2 from '../assets/corporate pics/corprate2.jpg';
import corporateAlt3 from '../assets/corporate pics/corprate3.jpg';
import corporateGif1 from '../assets/corporate pics/gif corporate.gif';
import corporateGif2 from '../assets/corporate pics/giff corporate.gif';



// Constants
const TYPING_WORDS = ['Transparency', 'Integrity', 'Accountability', 'Simplicity']
const TYPING_CONFIG = {
  typingSpeed: 100,
  deletingSpeed: 60,
  pauseDuration: 1500
}

const PARTNER_LOGOS = [
  { src: competitionAuthorityLogo, alt: 'Competition Authority of Kenya', name: 'Competition Authority' },
  { src: ecitizenLogo, alt: 'E Citizen', name: 'E Citizen' },
  { src: ethicsLogo, alt: 'Ethics and Anti-Corruption Commission', name: 'Ethics & Anti-Corruption' },
  { src: germanCorporationLogo, alt: 'German Corporation', name: 'German Corporation' },
  { src: kisimLogo, alt: 'Kisim', name: 'Kisim' },
  { src: officeOfAgLogo, alt: 'Office of the Attorney General', name: 'Office of the AG' },
  { src: openContractingLogo, alt: 'Open Contracting Partnership', name: 'Open Contracting' },
  { src: openOwnershipLogo, alt: 'Open Ownership', name: 'Open Ownership' }
]

const STATS_DATA = [
  { prefix: "KES", value: "262.8", suffix: "Billion", description: "Total value of public contracts actively monitored and reported within a single fiscal year." },
  { prefix: "", value: "34,000+", suffix: "Contracts", description: "Total volume of public procurement and asset disposal contracts oversighted annually." },
  { prefix: "", value: "30%", suffix: "Budget Reservation", description: "Mandated procurement allocation monitored by PPRA to benefit special groups (Youth, Women, and Persons with Disabilities) under the AGPO Program." },
  { prefix: "", value: "11", suffix: "Core Categories", description: "Different sectors (ICT, building materials, pharmaceuticals) continuously tracked via the PPRA Market Reference Guide to prevent inflation of public prices." },
  { prefix: "", value: "49.6%", suffix: "Compliance Baseline", description: "Average institutional compliance score observed among reviewed Procuring Entities (PEs) during rolling audits, used to drive data-backed capacity building." }
]

// Custom Hooks
const useTypewriter = (words, { typingSpeed, deletingSpeed, pauseDuration }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    let timeout
    let isMounted = true

    const typeWriter = () => {
      if (!isMounted) return

      const currentWord = words[currentWordIndex]

      if (isTyping) {
        if (displayText.length < currentWord.length) {
          timeout = setTimeout(() => {
            if (isMounted) {
              setDisplayText(currentWord.slice(0, displayText.length + 1))
            }
          }, typingSpeed)
        } else {
          timeout = setTimeout(() => {
            if (isMounted) setIsTyping(false)
          }, pauseDuration)
        }
      } else {
        if (displayText.length > 0) {
          timeout = setTimeout(() => {
            if (isMounted) {
              setDisplayText(currentWord.slice(0, displayText.length - 1))
            }
          }, deletingSpeed)
        } else {
          setIsTyping(true)
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }

    typeWriter()

    return () => {
      isMounted = false
      clearTimeout(timeout)
    }
  }, [displayText, isTyping, currentWordIndex, words, typingSpeed, deletingSpeed, pauseDuration])

  return { displayText, currentWordIndex }
}

const useFormHandler = (initialState = { name: '', email: '', message: '' }) => {
  const [formData, setFormData] = useState(initialState)
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const validateForm = useCallback(() => {
    const errors = {}
    if (!formData.name?.trim()) errors.name = 'Name is required'
    if (!formData.email?.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }
    if (!formData.message?.trim()) errors.message = 'Message is required'
    return errors
  }, [formData])

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }))
    }
  }, [formErrors])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    const errors = validateForm()
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.1) {
            resolve()
          } else {
            reject(new Error('Failed to send message'))
          }
        }, 1500)
      })
      
      setSubmitStatus({ type: 'success', message: 'Message sent successfully!' })
      setFormData(initialState)
      
      setTimeout(() => setSubmitStatus(null), 5000)
    } catch (error) {
      setSubmitStatus({ type: 'error', message: error.message || 'Failed to send message. Please try again.' })
      setTimeout(() => setSubmitStatus(null), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }, [formData, validateForm, initialState])

  return {
    formData,
    formErrors,
    isSubmitting,
    submitStatus,
    handleChange,
    handleSubmit
  }
}

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Home page error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-soft-cream-50">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-deep-navy-800 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-6">We're having trouble loading this page. Please try refreshing.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-professional-green-500 text-white px-6 py-3 rounded-xl hover:bg-professional-green-600 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Premium Intro Section Component
function PremiumIntroSection() {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const videoOverlayRef = useRef(null);
  const contentRef = useRef(null);
  const marqueeRef = useRef(null);
  const videoRef = useRef(null);

  // Ensure video plays (handle browser autoplay restrictions safely)
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Video autoplay prevented:', error);
        });
      }
    }
  }, []);

  useGSAP(() => {
    // Kill any conflicting parent or child ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger === containerRef.current) {
        trigger.kill();
      }
    });

    // 1. Create the master timeline linked to page scrolling
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
        pin: stickyRef.current,
        pinType: 'fixed',
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });

    // 2. Timeline steps executed progressively on scroll
    tl.to(videoWrapperRef.current, {
      scale: 1.4,
      borderRadius: '0rem',
      duration: 1.5,
      ease: 'power2.inOut',
      overwrite: 'auto'
    })
    .to(videoOverlayRef.current, {
      opacity: 0.85,
      duration: 0.6,
      ease: 'power2.inOut'
    }, '-=0.5')
    .to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power3.out',
    }, '-=0.4');

    // 3. Infinite marquee animation with dynamic width calculations
    const marqueeElement = marqueeRef.current;
    if (marqueeElement) {
      const totalWidth = marqueeElement.scrollWidth / 2;
      
      gsap.to(marqueeElement, {
        x: `-${totalWidth}px`,
        repeat: -1,
        duration: 55,
        ease: 'none',
        modifiers: {
          x: (x) => {
            const position = parseFloat(x);
            const resetPoint = -totalWidth;
            if (position <= resetPoint) {
              return "0px";
            }
            return x;
          }
        }
      });
    }

    // Cleanup hook state instances
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[220vh] bg-soft-cream-50 w-full overflow-hidden select-none"
      aria-label="PPRA Introduction Section"
    >
      {/* Structural background geometric design grid lines */}
      <div className="absolute inset-0 flex justify-between pointer-events-none opacity-10 z-0 px-8">
        <div className="w-px h-full bg-deep-navy-800"></div>
        <div className="w-px h-full bg-deep-navy-800 hidden md:block"></div>
        <div className="w-px h-full bg-deep-navy-800 hidden md:block"></div>
        <div className="w-px h-full bg-deep-navy-800"></div>
      </div>

      {/* Sticky container that pins during scroll */}
      <div 
        ref={stickyRef} 
        className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Wrapper containment boundary to clip the 1.4 overscale cleanly */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          {/* Video element starting downscaled at 0.4 */}
          <div 
            ref={videoWrapperRef} 
            className="absolute inset-0 m-auto w-full h-full scale-[0.4] rounded-3xl overflow-hidden shadow-2xl will-change-transform"
          >
            <video 
              ref={videoRef}
              autoPlay 
              muted 
              loop 
              playsInline 
              preload="metadata"
              className="w-full h-full object-cover origin-center"
            >
              <source src={introVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Gradient overlay for better text readability */}
            <div 
              ref={videoOverlayRef} 
              className="absolute inset-0 bg-linear-to-br from-deep-navy-950 via-deep-navy-900 to-clear-navy-950 opacity-20 backdrop-blur-[2px] transition-opacity duration-300"
            ></div>
          </div>
        </div>

        {/* Content - Fades in during scroll - Using home-tech_content layout */}
        <div 
          ref={contentRef} 
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 opacity-0 translate-y-12 w-full text-white pointer-events-auto"
        >
          <div className="home-tech_content grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Right Column - Heading (home-tech_right-content) */}
            <div className="home-tech_right-content lg:order-2">
              <h2 className="heading-style-h2 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white">
                Ensuring Transparency, Integrity & Accountability in Public Procurement
              </h2>
            </div>
            
            {/* Left Column - Description & Button (home-tech_left-content) */}
            <div className="home-tech_left-content space-y-6 lg:order-1">
              <div className="text-size-medium text-gray-200 text-base md:text-lg leading-relaxed">
                <p>
                  The Public Procurement Regulatory Authority (PPRA) is the principal regulatory body responsible for 
                  overseeing public procurement in Kenya. Our mandate includes ensuring that public funds are utilized 
                  efficiently, transparently, and in accordance with the law.
                </p>
                <br />
                <p>
                  We work closely with procuring entities to build capacity, monitor compliance, and promote best practices 
                  in public procurement. Our goal is to create a procurement system that is fair, competitive, and delivers 
                  value for money to the Kenyan people.
                </p>
              </div>
              
              {/* Button Group */}
              <div className="button-group pt-4">
                <Link
                  to="/about"
                  className="button group inline-flex items-center gap-2 px-8 py-4 bg-professional-green-600 rounded-xl text-white font-semibold text-base hover:bg-professional-green-700 transition-all duration-300 hover:gap-3 hover:scale-105 transform"
                >
                  <div className="button-inner flex items-center gap-2">
                    <div className="button-icon">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>Learn About Us</div>
                  </div>
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Marquee */}
        <div className="absolute bottom-0 left-0 right-0 w-full bg-deep-navy-950/90 backdrop-blur-md py-4 border-t border-white/10 overflow-hidden pointer-events-none z-20">
          <div 
            ref={marqueeRef} 
            className="inline-block whitespace-nowrap text-xs md:text-sm font-semibold tracking-widest uppercase text-soft-cream-200/70"
          >
            <span className="mx-6">✦ Fostering Integrity & Transparency ✦</span>
            <span className="mx-2 text-clear-navy-400">•</span>
            <span className="mx-6">✦ Value for Money for the Kenyan People ✦</span>
            <span className="mx-2 text-clear-navy-400">•</span>
            <span className="mx-6">✦ Effective Procurement Regulation ✦</span>
            <span className="mx-2 text-clear-navy-400">•</span>
            <span className="mx-6">✦ PPRA Kenya - Your Partner in Progress ✦</span>
            <span className="mx-2 text-clear-navy-400">•</span>
            <span className="mx-6">✦ Fostering Integrity & Transparency ✦</span>
            <span className="mx-2 text-clear-navy-400">•</span>
            <span className="mx-6">✦ Value for Money for the Kenyan People ✦</span>
            <span className="mx-2 text-clear-navy-400">•</span>
            <span className="mx-6">✦ Effective Procurement Regulation ✦</span>
            <span className="mx-2 text-clear-navy-400">•</span>
            <span className="mx-6">✦ PPRA Kenya - Your Partner in Progress ✦</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Experience Section Component (Momoamo-style)
function ExperienceSection() {
  const quoteRef = useRef(null);
  const galleryContainerRef = useRef(null);
  const galleryWrapperRef = useRef(null);

  // Scroll Trigger animation for the bottom headline
  useGSAP(() => {
    const quoteElement = quoteRef.current;
    if (!quoteElement) return;

    ScrollTrigger.create({
      trigger: quoteElement,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(quoteElement, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        });
      },
      once: true
    });
  }, []);

  // GSAP Infinite Scroll Loop - Hardware Accelerated & Mathematically Optimized
  useGSAP(() => {
    const container = galleryContainerRef.current;
    if (!container) return;

    // Force GPU layer caching on container and layout nodes to eliminate subpixel micro-stuttering
    gsap.set([container, container.children], { 
      force3D: true, 
      z: 0.01,
      backfaceVisibility: "hidden" 
    });

    const initializeLoop = () => {
      const slides = Array.from(container.children);
      if (slides.length < 6) return; 

      // Extract accurate client dimensions with floating-point precision
      const slide1Width = slides[0].getBoundingClientRect().width;
      const slide2Width = slides[1].getBoundingClientRect().width;
      const slide3Width = slides[2].getBoundingClientRect().width;
      
      const slide1Margin = parseFloat(window.getComputedStyle(slides[0]).marginRight) || 0;
      const slide2Margin = parseFloat(window.getComputedStyle(slides[1]).marginRight) || 0;
      const slide3Margin = parseFloat(window.getComputedStyle(slides[2]).marginRight) || 0;

      // Exact mathematical calculation for one clean, loopable asset rotation cycle
      const totalLoopWidth = slide1Width + slide1Margin + slide2Width + slide2Margin + slide3Width + slide3Margin;

      gsap.killTweensOf(container);

      gsap.to(container, {
        x: -totalLoopWidth,
        duration: 35, 
        ease: "none",
        repeat: -1,
        modifiers: {
          // Wrap position calculations perfectly at the pixel boundary edge
          x: gsap.utils.unitize(x => parseFloat(x) % totalLoopWidth)
        }
      });
    };

    // Initialize layout calculations immediately
    initializeLoop();

    // Recalculate track dimension limits if massive assets or GIFs finish lazy loading late
    window.addEventListener('load', initializeLoop);
    
    return () => {
      window.removeEventListener('load', initializeLoop);
    };
  }, []);

  return (
    <section 
      id="lexperience" 
      aria-label="Premium Experience Section" 
      className="w-full relative md:pt-24.5 pt-16 md:pb-33.25 pb-16 bg-soft-cream-50 overflow-hidden"
    >
      <div className="max-w-340 xl:px-14 px-4 mx-auto">
        {/* Headline Block */}
        <div className="max-w-full w-192.5">
          <h2 className="text-start text-deep-navy-800 font-bold md:text-[86px] text-[58px] uppercase leading-none mb-6 md:mb-5.25 tracking-tight">
            PPRA: <br />
            More than a Regulator
          </h2>
          <p className="text-start text-deep-navy-700 font-normal md:text-[36px] text-[26px] tracking-normal leading-[1.1]">
            PPRA creates a framework of exceptional standards for public procurement excellence.
          </p>
        </div>

        {/* Description Block - Right Aligned */}
        <div className="w-full flex justify-end md:my-18 mb-8 mt-6">
          <p className="md:px-14 md:max-w-228.75 max-w-89.5 text-deep-navy-600 font-light text-[18px] tracking-normal text-start leading-relaxed">
            Halfway between a regulatory framework, a capacity building hub and a public service institution, 
            each PPRA initiative is a unique approach to working differently, reconnecting stakeholders 
            and creating shared accountability for Kenya's public funds.
          </p>
        </div>
      </div>

      {/* Horizontal Scrolling Image Gallery */}
      <div 
        ref={galleryWrapperRef}
        className="moving-logo hidden md:block relative overflow-hidden md:h-206.5 h-80 my-12"
      >
        <div 
          ref={galleryContainerRef}
          className="flex flex-nowrap h-full"
          style={{ display: 'flex', willChange: 'transform' }}
        >
          
          {/* ==================== SLIDE 1 (Unique Layout A) ==================== */}
          <div className="moving-logo-inner--desktop slide md:h-206.5 h-80 relative md:min-w-360 min-w-102 shrink-0 md:mr-24 mr-0">
            {/* Box 1 */}
            <div className="absolute z-1 left-0 md:left-4 bottom-0 md:w-121.25 md:h-182 w-47 h-70.5 overflow-hidden group">
              <img src={corporateSky} alt="Corporate Skyscraper" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            {/* Box 2 */}
            <div className="z-2 absolute top-0 md:left-121.25 left-[166.26px] md:w-107.5 md:h-134.5 w-41.25 h-51.25 overflow-hidden group">
              <img src={corporate2} alt="Corporate Office" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            {/* Box 3 */}
            <div className="absolute bottom-0 md:right-92.25 right-[-47.26px] md:w-89.25 md:h-116.25 w-34.5 h-44.75 overflow-hidden group">
              <img src={corporateNews} alt="Corporate Media" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            {/* Box 4 */}
            <div className="absolute top-0 md:-right-29.5 -right-65 md:w-107.75 md:h-133.75 w-41.25 h-51.25 overflow-hidden group">
              <img src={corporateHands} alt="Handshake Collaboration" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
          </div>

          {/* ==================== SLIDE 2 (Unique Layout B) ==================== */}
          <div className="moving-logo-inner--desktop slide md:h-206.5 h-80 relative md:min-w-360 min-w-102 shrink-0 md:mr-24 mr-0">
            {/* Box 5 */}
            <div className="absolute z-6 left-175 top-0 md:w-121.25 md:h-137.5 w-47 h-70.5 overflow-hidden group">
              <img src={corporateAgri} alt="Institutional Agriculture" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            {/* Box 6 */}
            <div className="absolute z-5 bottom-4 md:left-75 left-41.5 md:w-121.25 md:h-175 w-41.25 h-51.25 overflow-hidden group">
              <img src={corporate4} alt="Corporate Planning" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            {/* Box 7 */}
            <div className="absolute z-4 bottom-0 md:right-37.5 -right-16.75 md:w-89.25 md:h-116.25 w-34.25 h-44.5 overflow-hidden group">
              <img src={corporateGif1} alt="Corporate Progress Loop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            {/* Box 8 */}
            <div className="absolute top-0 md:-right-100 -right-65 md:w-107.75 md:h-133.75 w-41.25 h-51.25 overflow-hidden group">
              <img src={corporateAlt3} alt="Compliance Strategy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
          </div>

          {/* ==================== SLIDE 3 (Unique Layout C) ==================== */}
          <div className="moving-logo-inner--desktop slide md:h-206.5 h-80 relative md:min-w-360 min-w-102 shrink-0 md:mr-24 mr-0">
            {/* Box 9 */}
            <div className="absolute z-3 left-12 bottom-0 md:w-130 md:h-165 w-50 h-70 overflow-hidden group">
              <img src={corporateAlt2} alt="Corporate Executive Workspace" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            {/* Box 10 */}
            <div className="absolute z-2 top-0 md:right-16 right-4 md:w-150 md:h-155 w-55 h-72 overflow-hidden group">
              <img src={corporateGif2} alt="Strategic Data Interface Loop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
          </div>


          {/* ==================== SLIDE 4 (DUPLICATE OF SLIDE 1) ==================== */}
          <div className="moving-logo-inner--desktop slide md:h-206.5 h-80 relative md:min-w-360 min-w-102 shrink-0 md:mr-24 mr-0">
            <div className="absolute z-1 left-0 md:left-4 bottom-0 md:w-121.25 md:h-182 w-47 h-70.5 overflow-hidden">
              <img src={corporateSky} alt="" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="z-2 absolute top-0 md:left-121.25 left-[166.26px] md:w-107.5 md:h-134.5 w-41.25 h-51.25 overflow-hidden">
              <img src={corporate2} alt="" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 md:right-92.25 right-[-47.26px] md:w-89.25 md:h-116.25 w-34.5 h-44.75 overflow-hidden">
              <img src={corporateNews} alt="" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="absolute top-0 md:-right-29.5 -right-65 md:w-107.75 md:h-133.75 w-41.25 h-51.25 overflow-hidden">
              <img src={corporateHands} alt="" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>

          {/* ==================== SLIDE 5 (DUPLICATE OF SLIDE 2) ==================== */}
          <div className="moving-logo-inner--desktop slide md:h-206.5 h-80 relative md:min-w-360 min-w-102 shrink-0 md:mr-24 mr-0">
            <div className="absolute z-6 left-175 top-0 md:w-121.25 md:h-137.5 w-47 h-70.5 overflow-hidden">
              <img src={corporateAgri} alt="" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="absolute z-5 bottom-4 md:left-75 left-41.5 md:w-121.25 md:h-175 w-41.25 h-51.25 overflow-hidden">
              <img src={corporate4} alt="" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="absolute z-4 bottom-0 md:right-37.5 -right-16.75 md:w-89.25 md:h-116.25 w-34.25 h-44.5 overflow-hidden">
              <img src={corporateGif1} alt="" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="absolute top-0 md:-right-100 -right-65 md:w-107.75 md:h-133.75 w-41.25 h-51.25 overflow-hidden">
              <img src={corporateAlt3} alt="" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>

          {/* ==================== SLIDE 6 (DUPLICATE OF SLIDE 3) ==================== */}
          <div className="moving-logo-inner--desktop slide md:h-206.5 h-80 relative md:min-w-360 min-w-102 shrink-0 md:mr-24 mr-0">
            <div className="absolute z-3 left-12 bottom-0 md:w-130 md:h-165 w-50 h-70 overflow-hidden">
              <img src={corporateAlt2} alt="" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="absolute z-2 top-0 md:right-16 right-4 md:w-150 md:h-155 w-55 h-72 overflow-hidden">
              <img src={corporateGif2} alt="" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Quote Section - Fades in cleanly on scroll */}
      <div className="md:mt-23 mt-8 flex justify-end px-4">
        <div 
          ref={quoteRef}
          className="md:max-w-228.75 max-w-89.5"
          style={{ 
            opacity: 0, 
            transform: 'translate(0px, 50px)'
          }}
        >
          <h2 className="text-start text-deep-navy-800 font-bold md:text-[86px] text-[58px] uppercase leading-none">
            The art of creating<br />unforgettable impact
          </h2>
          <p className="text-start text-deep-navy-700 font-normal md:text-[36px] text-[26px] tracking-normal mb-6 leading-[1.1]">
            At PPRA, we are convinced that the best outcomes are those that bring us together.
          </p>
          <p className="text-deep-navy-600 font-light text-[18px] tracking-normal text-start leading-[1.3]">
            This is why we create frameworks where public institutions truly thrive, to enable 
            shared value that goes beyond compliance and leaves a lasting impression on every Kenyan citizen.
          </p>
        </div>
      </div>
    </section>
  );
}
// Main Component
export default function Home() {
  const heroRef = useRef(null)
  const welcomeRef = useRef(null)
  const mainTitleRef = useRef(null)
  const descriptionRef = useRef(null)
  const claimRef = useRef(null)
  const numbersRef = useRef(null)
  const numbersContainerRef = useRef(null)
  const partnersRef = useRef(null)
  const contactRef = useRef(null)
  const offsetLogoRef = useRef(null)
  const logoContainerRef = useRef(null)
  
  const { displayText } = useTypewriter(TYPING_WORDS, TYPING_CONFIG)
  const { formData, formErrors, isSubmitting, submitStatus, handleChange, handleSubmit } = useFormHandler()

  // Memoized partners to prevent unnecessary re-renders
  const memoizedPartners = useMemo(() => PARTNER_LOGOS, [])

  // Hero section animations
  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      
      tl.from(welcomeRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'all'
      })
      .from(mainTitleRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'all'
      }, '-=0.3')
      .from(descriptionRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'all'
      }, '-=0.2')
    }, heroRef)
    
    return () => ctx.revert()
  }, [])

  // Interactive mouse move effect for the logo
  useGSAP(() => {
    const element = offsetLogoRef.current
    const container = logoContainerRef.current
    if (!element || !container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let rafId = null

    const handleMouseMove = (e) => {
      if (rafId) return
      
      rafId = requestAnimationFrame(() => {
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
        
        rafId = null
      })
    }

    const handleMouseLeave = () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
      
      gsap.to(element, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'elastic.out(1, 0.6)',
        overwrite: 'auto'
      })
    }

    container.addEventListener('mousemove', handleMouseMove, { passive: true })
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, { scope: logoContainerRef })

  // Scroll animations for the logo
  useGSAP(() => {
    if (!offsetLogoRef.current) return
    
    const ctx = gsap.context(() => {
      gsap.to(offsetLogoRef.current, {
        y: 50,
        ease: "none",
        scrollTrigger: {
          trigger: logoContainerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true
        }
      })
      
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.to(offsetLogoRef.current, {
          y: -15,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: 0.5
        })
      }
    })
    
    return () => ctx.revert()
  }, [])

  // Claim section animation
  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from(claimRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        clearProps: 'all',
        scrollTrigger: {
          trigger: claimRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
          invalidateOnRefresh: true
        }
      })
    }, claimRef)
    
    return () => ctx.revert()
  }, [])

  // Numbers section animation - Swapping effect with randomize and image scaling
  useGSAP(() => {
    const section = numbersRef.current
    const container = numbersContainerRef.current
    if (!section || !container) return

    const lines = container.querySelectorAll('.stat-line')
    if (!lines.length) return

    // Get decorative images
    const bottomLeftImg = document.querySelector('.decor-image-bottom-left')
    const bottomRightImg = document.querySelector('.decor-image-bottom-right')
    const topLeftImg = document.querySelector('.decor-image-top-left')
    
    let currentIndex = 0
    let isAnimating = false

    // Randomize text function (slot machine effect)
    const randomizeText = (element, originalText, duration = 400) => {
      const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+'
      const originalNumbers = originalText.replace(/[^0-9.]/g, '')
      const prefix = originalText.replace(/[0-9.]/g, '')
      
      let iterations = 0
      const maxIterations = 15
      const intervalTime = duration / maxIterations
      
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          if (iterations >= maxIterations) {
            clearInterval(interval)
            element.textContent = originalText
            resolve()
            return
          }
          
          let randomText = prefix
          for (let i = 0; i < originalNumbers.length; i++) {
            if (i < iterations / (maxIterations / originalNumbers.length)) {
              randomText += originalNumbers[i]
            } else {
              randomText += chars[Math.floor(Math.random() * chars.length)]
            }
          }
          element.textContent = randomText
          iterations++
        }, intervalTime)
      })
    }

    // Initialize states
    lines.forEach((line, index) => {
      gsap.set(line, {
        opacity: index === 0 ? 1 : 0,
        scale: index === 0 ? 1 : 0.9,
        filter: index === 0 ? 'blur(0px)' : 'blur(10px)',
        x: index === 0 ? 0 : 50
      })
    })

    // Create scroll-triggered swapping animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${lines.length * 100}%`,
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress
          const newIndex = Math.floor(progress * lines.length)
          
          if (newIndex !== currentIndex && newIndex < lines.length && !isAnimating) {
            isAnimating = true
            const outgoingLine = lines[currentIndex]
            const incomingLine = lines[newIndex]
            
            // Get value elements for randomization
            const outgoingValue = outgoingLine.querySelector('.stat-value-number')
            const incomingValue = incomingLine.querySelector('.stat-value-number')
            const originalOutgoingText = outgoingValue?.textContent || ''
            const originalIncomingText = incomingValue?.textContent || ''
            
            // Animate outgoing - fade out with randomize
            gsap.to(outgoingLine, {
              opacity: 0,
              scale: 0.9,
              x: -50,
              filter: 'blur(10px)',
              duration: 0.5,
              ease: 'power2.in',
              onStart: () => {
                if (outgoingValue) {
                  randomizeText(outgoingValue, originalOutgoingText, 300)
                }
              }
            })
            
            // Animate incoming - fade in with randomize
            gsap.fromTo(incomingLine,
              {
                opacity: 0,
                scale: 0.9,
                x: 50,
                filter: 'blur(10px)'
              },
              {
                opacity: 1,
                scale: 1,
                x: 0,
                filter: 'blur(0px)',
                duration: 0.6,
                ease: 'back.out(1.2)',
                delay: 0.3,
                onStart: () => {
                  if (incomingValue) {
                    randomizeText(incomingValue, originalIncomingText, 400)
                  }
                },
                onComplete: () => {
                  isAnimating = false
                }
              }
            )
            
            currentIndex = newIndex
          }
          
          // Scale images based on scroll progress
          const scaleProgress = Math.min(progress * 1.5, 1)
          const scaleValue = 0.8 + (scaleProgress * 0.5)
          
          if (bottomLeftImg) {
            gsap.to(bottomLeftImg, {
              scale: scaleValue,
              duration: 0.1,
              ease: 'power2.out'
            })
          }
          
          if (bottomRightImg) {
            gsap.to(bottomRightImg, {
              scale: scaleValue,
              duration: 0.1,
              ease: 'power2.out'
            })
          }
          
          if (topLeftImg) {
            const topScaleValue = 0.8 + (scaleProgress * 0.3)
            gsap.to(topLeftImg, {
              scale: topScaleValue,
              duration: 0.1,
              ease: 'power2.out'
            })
          }
        }
      }
    })

    // Initial randomization for first stat
    const firstLine = lines[0]
    if (firstLine) {
      const firstValue = firstLine.querySelector('.stat-value-number')
      if (firstValue) {
        const originalText = firstValue.textContent
        randomizeText(firstValue, originalText, 600)
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === section) {
          trigger.kill()
        }
      })
    }
  }, { scope: numbersRef })

  // Partners ticker animation - Perfect seamless loop
  useGSAP(() => {
    const tickerList = document.querySelector('.ticker-list')
    if (!tickerList) return

    // Calculate total width of the ticker items
    const tickerItems = document.querySelectorAll('.ticker-item')
    let totalWidth = 0
    
    tickerItems.forEach(item => {
      totalWidth += item.offsetWidth
    })
    
    // Add gap between items (96px per gap)
    totalWidth += (tickerItems.length - 1) * 96
    
    // Get exactly half width for perfect seamless loop
    const halfWidth = totalWidth / 2
    
    // Set initial position
    gsap.set(tickerList, { x: 0 })
    
    // Create the animation - exactly 50% to the left
    gsap.to(tickerList, {
      x: -halfWidth,
      duration: 30,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (x) => {
          const position = parseFloat(x)
          // When we reach exactly half width, instantly reset to 0
          if (Math.abs(position) >= halfWidth) {
            return "0px"
          }
          return x
        }
      }
    })
    
    // Cleanup
    return () => {
      gsap.killTweensOf(tickerList)
    }
  }, { scope: partnersRef })

  // Contact section animation
  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from(contactRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        clearProps: 'all',
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
          invalidateOnRefresh: true
        }
      })
    }, contactRef)
    
    return () => ctx.revert()
  }, [])

  return (
    <ErrorBoundary>
      <>
        <Helmet>
          <title>PPRA Kenya | Public Procurement Regulatory Authority</title>
          <meta name="description" content="PPRA ensures transparency, integrity, and accountability in Kenya's public procurement system." />
          <meta name="keywords" content="PPRA, Kenya, public procurement, procurement regulation, transparency, accountability" />
          <meta property="og:title" content="PPRA Kenya - Public Procurement Regulatory Authority" />
          <meta property="og:description" content="Regulating public procurement in Kenya for fair, transparent, and efficient practices." />
          <meta property="og:type" content="website" />
          <meta property="og:image" content={logoImage} />
          <meta name="twitter:card" content="summary_large_image" />
          <link rel="canonical" href="https://ppra.go.ke" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        </Helmet>

        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-professional-green-500 text-white px-4 py-2 rounded-lg z-50">
          Skip to main content
        </a>

        <div id="main-content">
          {/* Hero Section */}
          <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-visible">
            <div className="absolute inset-0">
              <div className="absolute inset-0">
                <img 
                  src={kenyanFlag}
                  alt="Kenyan Flag"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ opacity: 0.9 }}
                />
                <div className="absolute inset-0 bg-linear-to-br from-deep-navy-700/90 via-deep-navy-800/90 to-deep-navy-900/90"></div>
              </div>
            </div>
            
            <div className="relative z-10 w-full">
              <div className="min-h-screen">
                <div className="flex flex-col justify-center min-h-screen pl-4 sm:pl-8 md:pl-12 lg:pl-16 xl:pl-24 pr-4 sm:pr-8 md:pr-12 lg:pr-16 xl:pr-24 py-20">
                  <div className="w-full">
                    <div ref={welcomeRef}>
                      <p className="text-soft-cream-300 text-sm md:text-base uppercase tracking-wider font-semibold mb-2">
                        WELCOME TO PPRA
                      </p>
                      <div className="w-16 h-0.5 bg-professional-green-500"></div>
                    </div>
                    
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
                    
                    <div ref={descriptionRef} className="mt-6 md:mt-8">
                      <p className="text-base md:text-lg text-soft-cream-100 leading-relaxed max-w-3xl">
                        The Public Procurement Regulatory Authority (PPRA) is committed to promoting fair, 
                        efficient, and transparent procurement practices across all public entities.
                      </p>
                      
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
            
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-soft-cream-50 to-transparent"></div>
          </section>

          {/* Offset Logo Section */}
          <div 
            ref={logoContainerRef} 
            className="relative overflow-visible cursor-pointer" 
            style={{ marginTop: '-80px', marginBottom: '-100px', zIndex: 20 }}
          >
            <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div 
                ref={offsetLogoRef}
                className="absolute right-[5%] sm:right-[10%] md:right-[10%] lg:right-[5%] top-1/2 -translate-y-1/2 pointer-events-auto"
                style={{ opacity: 1, visibility: 'visible' }}
              >
                <div className="relative select-none">
                  <div className="absolute inset-0 bg-clear-navy-500/10 rounded-full blur-3xl scale-150"></div>
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

          {/* Premium Intro Section with Video Background */}
          <PremiumIntroSection />

          {/* Claim/Quote Section */}
          <section 
            ref={claimRef} 
            className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
            aria-label="PPRA mission statement"
          >
            <div className="absolute inset-0 w-full h-full">
              <img 
                src={newspaperImage}
                alt="PPRA Financial Newspaper Coverage showing regulatory impact"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            
            <div className="absolute inset-0 bg-deep-navy-900/70" aria-hidden="true"></div>
            
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
              <div className="max-w-5xl mx-auto">
                <h3 className="text-soft-cream-200 mb-8">
                  <span className="block text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-5">
                    <span className="text-soft-cream-400 text-5xl md:text-6xl lg:text-7xl align-top mr-2" aria-hidden="true">"</span>
                    The Public Procurement Regulatory Authority (PPRA) regulates,
                  </span>
                  <span className="block text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-5">
                    monitors, and oversight-checks public procurement
                  </span>
                  <span className="block text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-5">
                    and asset disposal systems in Kenya to ensure fair,
                  </span>
                  <span className="block text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-5">
                    transparent, and legally compliant government
                  </span>
                  <span className="block text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                    tendering practices.
                    <span className="text-soft-cream-400 text-5xl md:text-6xl lg:text-7xl align-bottom ml-2" aria-hidden="true">"</span>
                  </span>
                </h3>
                
                <div className="mt-8">
                  <h4 className="text-soft-cream-300 text-xl md:text-2xl lg:text-3xl italic text-left">
                    — Public Procurement Regulatory Authority - Kenya
                  </h4>
                </div>
                
                <div className="mt-12 text-left">
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-2 bg-professional-green-500 text-white px-10 py-5 rounded-xl font-semibold text-xl hover:bg-professional-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-professional-green-300"
                    aria-label="Learn More About Our Services"
                  >
                    Learn More About Our Services
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Partners Section - Ticker Animation with Transparent Containers */}
          <section ref={partnersRef} className="py-12 bg-soft-cream-50 overflow-hidden" aria-label="Our partners section">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <div className="w-16 h-0.5 bg-clear-navy-500 mx-auto mb-4" aria-hidden="true"></div>
                <p className="text-sm text-gray-400 max-w-2xl mx-auto">
                  Collaborating with leading organizations to enhance procurement standards
                </p>
              </div>
            </div>

            {/* Ticker Container with Mask Gradient */}
            <div 
              className="col-span-full my-8 md:my-10"
              style={{
                overflowX: 'clip',
                display: 'flex',
                position: 'relative',
                maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0px, black 96px, black calc(100% - 96px), rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0px, black 96px, black calc(100% - 96px), rgba(0,0,0,0) 100%)'
              }}
            >
              <ul 
                className="ticker-list"
                style={{
                  display: 'flex',
                  listStyleType: 'none',
                  padding: 0,
                  margin: 0,
                  gap: '96px',
                  width: 'max-content'
                }}
              >
                {/* Original logos */}
                {memoizedPartners.map((logo, index) => (
                  <li key={`original-${index}`} className="ticker-item" style={{ flexShrink: 0 }}>
                    <div className="rounded-xl p-4 transition-all duration-300 w-48 h-28 flex items-center justify-center">
                      <div className="w-full h-full flex items-center justify-center">
                        <img 
                          src={logo.src}
                          alt={logo.alt}
                          className="filter grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                          style={{ 
                            width: '120px',
                            height: '80px',
                            objectFit: 'contain'
                          }}
                          title={logo.name}
                        />
                      </div>
                    </div>
                  </li>
                ))}
                
                {/* Duplicate logos for seamless loop */}
                {memoizedPartners.map((logo, index) => (
                  <li key={`duplicate-${index}`} className="ticker-item" style={{ flexShrink: 0 }}>
                    <div className="rounded-xl p-4 transition-all duration-300 w-48 h-28 flex items-center justify-center">
                      <div className="w-full h-full flex items-center justify-center">
                        <img 
                          src={logo.src}
                          alt={logo.alt}
                          className="filter grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                          style={{ 
                            width: '120px',
                            height: '80px',
                            objectFit: 'contain'
                          }}
                          title={logo.name}
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* EXPERIENCE SECTION - MOMOAMO STYLE */}
          <ExperienceSection />

          {/* Numbers Section - Enhanced with Decorative Images and Swapping Animation */}
          <section 
            ref={numbersRef} 
            className="relative w-[calc(100%-2rem)] mx-auto h-[calc(100vh-2rem)] my-4 flex items-center justify-center overflow-hidden bg-soft-cream-400 select-none rounded-2xl md:rounded-3xl"
            aria-label="PPRA impact statistics"
          >
            {/* Vertical Line Decorations */}
            <div className="line-wrapper absolute inset-0 flex justify-between px-8 pointer-events-none z-0">
              <div className="vertical-line w-px h-full bg-deep-navy-200/20"></div>
              <div className="vertical-line w-px h-full bg-deep-navy-200/20 hidden md:block"></div>
              <div className="vertical-line w-px h-full bg-deep-navy-200/20 hidden md:block"></div>
              <div className="vertical-line w-px h-full bg-deep-navy-200/20"></div>
              <div className="vertical-line w-px h-full bg-deep-navy-200/20"></div>
            </div>

            {/* Decorative Images */}
            <img 
              src={vacationSelfieImage}
              alt=""
              className="decor-image-bottom-left absolute left-0 bottom-0 w-48 md:w-64 lg:w-80 opacity-30 pointer-events-none z-0"
              style={{ transform: 'scale(0.8)' }}
              loading="lazy"
            />
            <img 
              src={fileAnalysisImage}
              alt=""
              className="decor-image-bottom-right absolute right-0 bottom-0 w-48 md:w-64 lg:w-80 opacity-30 pointer-events-none z-0"
              style={{ transform: 'scale(0.8)' }}
              loading="lazy"
            />
            <img 
              src={dayDreamingImage}
              alt=""
              className="decor-image-top-left absolute left-0 top-0 w-40 md:w-52 lg:w-64 opacity-20 pointer-events-none z-0"
              style={{ transform: 'scale(0.8)' }}
              loading="lazy"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 w-full max-w-360 mx-auto px-4 sm:px-6 lg:px-8 items-center gap-8 lg:gap-6 relative z-10">
              
              {/* Left Side - Takes 1/3 */}
              <div className="flex flex-col justify-center items-center lg:items-end text-center lg:text-right">
                <div className="pill-wrapper mb-6">
                  <div className="pill inline-block bg-clear-navy-100 text-clear-navy-700 px-4 py-2 rounded-full text-sm font-semibold">
                    PPRA Impact Statistics
                  </div>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-deep-navy-800 leading-tight tracking-tight">
                  Our Impact<br />
                  <span className="text-professional-green-600 font-serif italic font-medium mt-2 inline-block">in Numbers</span>
                </h2>
                <div className="w-16 h-0.5 bg-professional-green-500 mt-5 lg:ml-auto lg:mr-0" aria-hidden="true"></div>
              </div>
              
              {/* Right Side - Swapping Text Animation */}
              <div className="lg:col-span-2 relative w-full h-112.5 md:h-137.5 flex items-center justify-center">
                <div 
                  ref={numbersContainerRef}
                  className="relative w-full max-w-3xl mx-auto"
                >
                  {STATS_DATA.map((stat, index) => (
                    <div 
                      key={index}
                      className={`stat-line stat-${index} absolute inset-0 flex flex-col items-center justify-center text-center w-full transition-all duration-700`}
                      style={{ 
                        pointerEvents: 'none',
                        opacity: index === 0 ? 1 : 0,
                        transform: index === 0 ? 'translateX(0) scale(1)' : 'translateX(50px) scale(0.95)',
                        filter: index === 0 ? 'blur(0px)' : 'blur(10px)'
                      }}
                    >
                      <div className="w-full flex items-baseline justify-center flex-wrap gap-x-3 sm:gap-x-4 tracking-tight text-professional-green-600 font-bold mb-4 sm:mb-6">
                        {stat.prefix && (
                          <span 
                            className="text-center leading-none select-none opacity-90"
                            style={{ fontSize: 'clamp(1.5rem, 3vw, 3rem)' }}
                          >
                            {stat.prefix}
                          </span>
                        )}
                        
                        <span 
                          className="stat-value-number text-center leading-none tabular-nums"
                          style={{ fontSize: 'clamp(3rem, 7vw, 7rem)' }}
                        >
                          {stat.value}
                        </span>
                        
                        {stat.suffix && (
                          <span 
                            className="text-center leading-none font-serif italic font-medium text-deep-navy-800"
                            style={{ fontSize: 'clamp(1.5rem, 3vw, 3rem)' }}
                          >
                            {stat.suffix}
                          </span>
                        )}
                      </div>
                      
                      <div 
                        className="font-semibold text-deep-navy-700/90 max-w-2xl text-center leading-relaxed tracking-wide mx-auto px-4
                                   text-sm xs:text-base sm:text-lg md:text-2xl lg:text-5xl"
                        style={{
                          position: 'relative',
                          display: 'block',
                          textAlign: 'center'
                        }}
                      >
                        {stat.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Office Contact Section */}
          <section 
            ref={contactRef} 
            id="contact" 
            className="relative w-[calc(100%-4rem)] mx-auto py-16 my-4 bg-white overflow-hidden select-none rounded-2xl md:rounded-3xl" 
            aria-label="Contact information section"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-deep-navy-800 mb-4">Contact Us</h2>
                  <div className="w-24 h-1 bg-clear-navy-500 mb-6" aria-hidden="true"></div>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Have questions or need assistance? Reach out to our team for support with procurement matters.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-clear-navy-100 rounded-xl flex items-center justify-center text-clear-navy-600 text-xl" aria-hidden="true">
                        📍
                      </div>
                      <div>
                        <h3 className="font-semibold text-deep-navy-700 mb-1">Our Office</h3>
                        <p className="text-gray-600">123 Government Avenue, Capital City, 00100</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-clear-navy-100 rounded-xl flex items-center justify-center text-clear-navy-600 text-xl" aria-hidden="true">
                        📞
                      </div>
                      <div>
                        <h3 className="font-semibold text-deep-navy-700 mb-1">Phone Number</h3>
                        <p className="text-gray-600">+254 700 123 456</p>
                        <p className="text-gray-600">+254 700 123 457</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-clear-navy-100 rounded-xl flex items-center justify-center text-clear-navy-600 text-xl" aria-hidden="true">
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
                  
                  {submitStatus && (
                    <div 
                      className={`mb-4 p-4 rounded-xl ${
                        submitStatus.type === 'success' 
                          ? 'bg-green-100 text-green-700 border border-green-200' 
                          : 'bg-red-100 text-red-700 border border-red-200'
                      }`}
                      role="alert"
                      aria-live="polite"
                    >
                      {submitStatus.message}
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-clear-navy-500 focus:border-transparent transition-colors ${
                          formErrors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Enter your name"
                        aria-invalid={!!formErrors.name}
                        aria-describedby={formErrors.name ? "name-error" : undefined}
                        disabled={isSubmitting}
                      />
                      {formErrors.name && (
                        <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
                          {formErrors.name}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-clear-navy-500 focus:border-transparent transition-colors ${
                          formErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Enter your email"
                        aria-invalid={!!formErrors.email}
                        aria-describedby={formErrors.email ? "email-error" : undefined}
                        disabled={isSubmitting}
                      />
                      {formErrors.email && (
                        <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-clear-navy-500 focus:border-transparent transition-colors ${
                          formErrors.message ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Your message here..."
                        aria-invalid={!!formErrors.message}
                        aria-describedby={formErrors.message ? "message-error" : undefined}
                        disabled={isSubmitting}
                      ></textarea>
                      {formErrors.message && (
                        <p id="message-error" className="mt-1 text-sm text-red-600" role="alert">
                          {formErrors.message}
                        </p>
                      )}
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-professional-green-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-professional-green-300 ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-professional-green-600'
                      }`}
                      aria-label={isSubmitting ? 'Sending message...' : 'Send message'}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    </ErrorBoundary>
  )
}