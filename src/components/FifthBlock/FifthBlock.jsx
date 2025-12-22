import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './FifthBlock.module.scss'
import arrowRightSvg from '../../../assets/svg/arrowRight.svg'
import image1 from '../../../assets/png/step5/1.png'
import image2 from '../../../assets/png/step5/2.png'
import image3 from '../../../assets/png/step5/3.png'

gsap.registerPlugin(ScrollTrigger)

function FifthBlock() {
  const [expandedItem, setExpandedItem] = useState([1, 2, 3]) // Все три элемента развернуты по умолчанию
  const blockRef = useRef(null)
  const titleRef = useRef(null)
  const titleRefs = useRef([])

  const services = [
    {
      id: 1,
      title: 'CORPORATE AND LEGAL SERVICES',
      image: image1,
      items: [
        'corporate bank account opening individual bank account opening',
        'compliance and AML assistance for ongoing international banking transaction',
        'correspondent (loro) bank account opening for financial institutions',
        'advisory on payment routes for international banking transactions'
      ]
    },
    {
      id: 2,
      title: 'BANKING & TRANSACTION SERVICES',
      image: image2,
      items: [
        'legal entity incorporation',
        'legal entity liquidation',
        'legal entity redomicilation',
        'trust incorporation',
        'legal advise, consulting and due diligence',
        'ongoing legal assistance (drafting of agreements, resolutions etc)'
      ]
    },
    {
      id: 3,
      title: <>AUDIT & TAXATION<br />SERVICES</>,
      image: image3,
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

  const toggleItem = (id, e) => {
    e.preventDefault()
    e.stopPropagation()
    setExpandedItem(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    )
  }

  useEffect(() => {
    if (!blockRef.current) return

    const animations = []

    // Анимация для заголовка "SERVICES"
    if (titleRef.current) {
      const anim = gsap.fromTo(titleRef.current,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: blockRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
            // ...(isMobile ? { 
            //   markers: false,
            //   invalidateOnRefresh: true,
            //   anticipatePin: 0
            // } : {})
          }
        }
      )
      animations.push(anim)
    }

    // Анимация для заголовков сервисов
    titleRefs.current.forEach((titleEl) => {
      if (titleEl) {
        const anim = gsap.fromTo(titleEl,
          {
            opacity: 0,
            y: 30
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: titleEl,
              start: "top 85%",
              toggleActions: "play reverse play reverse",
      
            }
          }
        )
        animations.push(anim)
      }
    })

    return () => {
      // Убиваем только свои ScrollTrigger
      animations.forEach(anim => {
        if (anim?.scrollTrigger) anim.scrollTrigger.kill()
        anim?.kill()
      })
    }
  }, [])


  return (
    <div ref={blockRef} id="services" className={styles.fifthBlock}>
      <h2 ref={titleRef} className={styles.servicesTitle}><br />SERVICES</h2>
      <div className={styles.servicesList}>
        {services.map((service, index) => (
          <div key={service.id} className={`${styles.serviceItem} ${expandedItem.includes(service.id) ? styles.serviceItemActive : ''}`}>
            <img 
              src={service.image} 
              alt={service.title}
              className={styles.serviceImage}
              style={{
                marginTop: service.id === 1 ? '216px' : service.id === 2 ? '108px' : '0'
              }}
              loading="lazy"
            />
            <div 
              className={`${styles.serviceHeader} ${!expandedItem.includes(service.id) ? styles.serviceHeaderInactive : ''}`}
              onClick={(e) => toggleItem(service.id, e)}
            >
            <h3 
              ref={el => titleRefs.current[index] = el}
              className={styles.serviceTitle}
            >
              {service.title}
            </h3>
            <div className={styles.numberWrapper}>
                <span className={styles.number}>0{service.id}</span>
                <img 
                  src={arrowRightSvg} 
                  alt="Arrow" 
                  className={`${styles.arrowRight} ${expandedItem.includes(service.id) ? styles.arrowDown : ''}`}
                  loading="lazy"
                />
              </div>
            </div>
            {service.items && (
              <ul 
                className={`${styles.serviceItems} ${expandedItem.includes(service.id) ? styles.serviceItemsOpen : ''}`}
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
