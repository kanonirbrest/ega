import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './FifthBlock.module.scss'
import arrowRightSvg from '../../../assets/svg/arrowRight.svg'

gsap.registerPlugin(ScrollTrigger)

// Функция для разбиения текста на буквы
const splitText = (text) => {
  return text.split('').map((char, index) => {
    if (char === ' ') {
      return <span key={index} className={styles.char}>&nbsp;</span>
    }
    return <span key={index} className={styles.char}>{char}</span>
  })
}

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
        'corporate bank account opening',
        'individual bank account opening',
        'compliance and AML assistance for ongoing international banking transaction',
        'correspondent (loro) bank account opening for financial institutions',
        'advisory on payment routes for international banking transactions'
      ]
    },
    {
      id: 2,
      title: 'BANKING & TRANSACTION SERVICES',
      items: [
        'legal entity incorporation',
        'legal entity liquidation',
        'legal entity redomicilation',
        'trust incorporation',
        'legal advise, consulting and due diligence',
        'ongoing legal assistance',
        '(drafting of agreements, resolutions etc)'
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
        'transfer pricing',
        'financial due diligence'
      ]
    }
  ]

  const toggleItem = (id) => {
    setExpandedItem(expandedItem === id ? null : id)
  }

  useEffect(() => {
    if (!blockRef.current) return

    const timer = setTimeout(() => {
      // Анимация для заголовка "SERVICES"
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll(`.${styles.char}`)
        gsap.fromTo(chars,
          {
            opacity: 0,
            y: 50,
            rotationX: -90
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: blockRef.current,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        )
      }

      // Анимация для заголовков сервисов
      titleRefs.current.forEach((titleEl, index) => {
        if (titleEl) {
          const chars = titleEl.querySelectorAll(`.${styles.char}`)
          gsap.fromTo(chars,
            {
              opacity: 0,
              y: 30
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.02,
              ease: "power2.out",
              scrollTrigger: {
                trigger: titleEl,
                start: "top 85%",
                toggleActions: "play none none none"
              }
            }
          )
        }
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div ref={blockRef} id="services" className={styles.fifthBlock}>
      <h2 ref={titleRef} className={styles.servicesTitle}>{splitText('SERVICES')}</h2>
      <div className={styles.servicesList}>
        {services.map((service, index) => (
          <div key={service.id} className={`${styles.serviceItem} ${expandedItem === service.id ? styles.serviceItemActive : ''}`}>
            <div 
              className={`${styles.serviceHeader} ${expandedItem !== service.id ? styles.serviceHeaderInactive : ''}`}
              onClick={() => toggleItem(service.id)}
            >
              <span className={styles.number}>0{service.id}</span>
              <h3 
                ref={el => titleRefs.current[index] = el}
                className={styles.serviceTitle}
              >
                {splitText(service.title)}
              </h3>
              <img 
                src={arrowRightSvg} 
                alt="Arrow" 
                className={`${styles.arrowRight} ${expandedItem === service.id ? styles.arrowDown : ''}`} 
              />
            </div>
            {expandedItem === service.id && service.items && (
              <ul className={styles.serviceItems}>
                {service.items.map((item, index) => (
                  <li key={index} className={styles.serviceItemText}>{item}</li>
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
