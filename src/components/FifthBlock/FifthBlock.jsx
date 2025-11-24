import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './FifthBlock.module.scss'
import arrowRightSvg from '../../../assets/svg/arrowRight.svg'

gsap.registerPlugin(ScrollTrigger)

function FifthBlock() {
  const [expandedItem, setExpandedItem] = useState(3) // Третий элемент (03) развернут по умолчанию
  const blockRef = useRef(null)
  const titleRef = useRef(null)
  const titleRefs = useRef([])

  const services = [
    {
      id: 1,
      title: 'CORPORATE AND LEGAL SERVICES',
      items: [
        'legal entity incorporation',
        'legal entity liquidation',
        'legal entity redomicilation',
        'trust incorporation',
        'legal advise, consulting and due diligence',
        'ongoing legal assistance (drafting of agreements, resolutions etc)',
      ]
    },
    {
      id: 2,
      title: 'BANKING & TRANSACTION SERVICES',
      items: [
        'corporate bank account opening',
        'individual bank account opening',
        'compliance and AML assistance for ongoing international banking transaction',
        'correspondent (loro) bank account opening for financial institutions',
        'advisory on payment routes for international banking transactions'
      ]
    },
    {
      id: 3,
      title: 'AUDIT & TAXATION SERVICES',
      items: [
        'statutory audit services',
        'consolidates audit services',
        'special purpose audit services',
        'tax registration and submission',
        'tax consulting',
        'accounting and bookkeeping services',
        'transfer pricing ',
        'financial due diligence'
      ]
    }
  ]

  const toggleItem = (id, e) => {
    e.preventDefault()
    e.stopPropagation()
    setExpandedItem(expandedItem === id ? null : id)
  }

  useEffect(() => {
    if (!blockRef.current) return

    // Определяем мобильное устройство
    const isMobile = window.innerWidth <= 480

    // Анимация для заголовка "SERVICES"
    if (titleRef.current) {
      gsap.fromTo(titleRef.current,
        {
          opacity: 0,
          y: isMobile ? 30 : 50
        },
        {
          opacity: 1,
          y: 0,
          duration: isMobile ? 0.8 : 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: blockRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
            ...(isMobile ? { markers: false } : {})
          }
        }
      )
    }

    // Анимация для заголовков сервисов
    titleRefs.current.forEach((titleEl) => {
      if (titleEl) {
        gsap.fromTo(titleEl,
          {
            opacity: 0,
            y: isMobile ? 20 : 30
          },
          {
            opacity: 1,
            y: 0,
            duration: isMobile ? 0.8 : 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: titleEl,
              start: "top 85%",
              toggleActions: "play reverse play reverse",
              ...(isMobile ? { markers: false } : {})
            }
          }
        )
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])


  return (
    <div ref={blockRef} id="services" className={styles.fifthBlock}>
      <h2 ref={titleRef} className={styles.servicesTitle}>SERVICES</h2>
      <div className={styles.servicesList}>
        {services.map((service, index) => (
          <div key={service.id} className={`${styles.serviceItem} ${expandedItem === service.id ? styles.serviceItemActive : ''}`}>
            <div 
              className={`${styles.serviceHeader} ${expandedItem !== service.id ? styles.serviceHeaderInactive : ''}`}
              onClick={(e) => toggleItem(service.id, e)}
            >
              <span className={styles.number}>0{service.id}</span>
              <h3 
                ref={el => titleRefs.current[index] = el}
                className={styles.serviceTitle}
              >
                {service.title}
              </h3>
              <img 
                src={arrowRightSvg} 
                alt="Arrow" 
                className={`${styles.arrowRight} ${expandedItem === service.id ? styles.arrowDown : ''}`} 
              />
            </div>
            {service.items && (
              <ul 
                className={`${styles.serviceItems} ${expandedItem === service.id ? styles.serviceItemsOpen : ''}`}
              >
                {service.items.map((item, itemIndex) => (
                  <li key={itemIndex} className={styles.serviceItemText}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FifthBlock
