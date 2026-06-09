import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function Services() {
  const heroRef = useRef(null)
  const servicesListRef = useRef(null)
  const ctaRef = useRef(null)

  useGSAP(() => {
    gsap.from(heroRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
  }, { scope: heroRef })

  useGSAP(() => {
    const serviceItems = document.querySelectorAll('.service-item')
    gsap.from(serviceItems, {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      scrollTrigger: {
        trigger: servicesListRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    })
  }, { scope: servicesListRef })

  useGSAP(() => {
    gsap.from(ctaRef.current, {
      scale: 0.95,
      opacity: 0,
      duration: 0.6,
      scrollTrigger: {
        trigger: ctaRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })
  }, { scope: ctaRef })

  const detailedServices = [
    {
      title: 'Procurement Regulation & Policy Development',
      icon: '📋',
      description: 'Developing and implementing comprehensive procurement regulations, policies, and guidelines that ensure transparency, fairness, and efficiency in all public procurement processes.',
      features: [
        'Drafting procurement legislation',
        'Developing standard tender documents',
        'Creating procurement guidelines',
        'Policy reviews and updates'
      ]
    },
    {
      title: 'Compliance Monitoring & Auditing',
      icon: '🔍',
      description: 'Conducting regular audits and compliance checks to ensure procuring entities adhere to established regulations and best practices in public procurement.',
      features: [
        'Procurement compliance audits',
        'Performance evaluations',
        'Risk assessments',
        'Corrective action plans'
      ]
    },
    {
      title: 'Capacity Building & Training',
      icon: '📊',
      description: 'Providing comprehensive training programs and capacity building initiatives for procurement professionals and entities to enhance their skills and knowledge.',
      features: [
        'Professional certification programs',
        'Workshops and seminars',
        'E-learning modules',
        'Technical assistance'
      ]
    },
    {
      title: 'Dispute Resolution & Review',
      icon: '⚖️',
      description: 'Offering fair and transparent mechanisms for resolving procurement-related disputes and reviewing procurement decisions to ensure justice and fairness.',
      features: [
        'Administrative reviews',
        'Mediation services',
        'Appeals processing',
        'Legal guidance'
      ]
    },
    {
      title: 'Advisory & Consulting Services',
      icon: '🤝',
      description: 'Providing expert advisory services and consulting support to procuring entities on complex procurement matters, strategic sourcing, and best practices.',
      features: [
        'Strategic procurement advice',
        'Market research',
        'Tender evaluation support',
        'Contract management guidance'
      ]
    },
    {
      title: 'Research & Data Analytics',
      icon: '📈',
      description: 'Conducting research and data analysis to inform procurement policies, identify trends, and improve procurement outcomes across all sectors.',
      features: [
        'Procurement data analysis',
        'Market intelligence',
        'Benchmarking studies',
        'Impact assessments'
      ]
    },
    {
      title: 'E-Procurement Solutions',
      icon: '💻',
      description: 'Implementing and managing electronic procurement systems that enhance efficiency, transparency, and accessibility in public procurement.',
      features: [
        'E-tender platforms',
        'Supplier portals',
        'Contract management systems',
        'Digital payment solutions'
      ]
    },
    {
      title: 'Stakeholder Engagement',
      icon: '🤝',
      description: 'Facilitating collaboration and communication between all stakeholders in the procurement ecosystem to ensure inclusive and transparent processes.',
      features: [
        'Stakeholder forums',
        'Public consultations',
        'Industry engagements',
        'Feedback mechanisms'
      ]
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-20 bg-linear-to-br from-deep-navy-700 to-deep-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Services</h1>
          <div className="w-24 h-1 bg-clear-navy-400 mx-auto mb-6"></div>
          <p className="text-lg text-soft-cream-200 max-w-3xl mx-auto">
            Comprehensive procurement solutions designed to ensure transparency, compliance, and excellence
            in public procurement across all sectors.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section ref={servicesListRef} className="py-20 bg-soft-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12">
            {detailedServices.map((service, index) => (
              <div
                key={index}
                className="service-item bg-white rounded-md shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
              >
                <div className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="text-6xl">{service.icon}</div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-deep-navy-800 mb-3">{service.title}</h2>
                      <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-professional-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 bg-linear-to-br from-clear-navy-500 to-deep-navy-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Need Assistance?</h2>
          <p className="text-lg text-soft-cream-200 mb-8 max-w-2xl mx-auto">
            Our team of procurement experts is ready to help you with any questions or service requests.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-white text-deep-navy-700 px-8 py-3 rounded-md font-semibold hover:bg-soft-cream-100 transition-all duration-300 transform hover:scale-105"
          >
            Contact Us Today
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}