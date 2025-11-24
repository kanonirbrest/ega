import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './FourthBlock.module.scss'
import planetSvg from '../../../assets/svg/planet.svg'
import arrowsSvg from '../../../assets/svg/arrows.svg'
import oneArrowSvg from '../../../assets/svg/oneArrow.svg'
import menuSvg from '../../../assets/svg/menu.svg'

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

function FourthBlock() {
  const titleRef = useRef(null)
  const row1Ref = useRef(null)
  const row2Ref = useRef(null)
  const row3Ref = useRef(null)
  const blockRef = useRef(null)
  const planetIconRef = useRef(null)
  const arrowsIconRef = useRef(null)
  const oneArrowIconRef = useRef(null)
  const menuIconRef = useRef(null)

  useEffect(() => {
    if (!blockRef.current) return

    // Определяем мобильное устройство
    const isMobile = window.innerWidth <= 480

    const timer = setTimeout(() => {
      // Анимация для заголовка
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll(`.${styles.char}`)
        gsap.fromTo(chars, 
          {
            opacity: 0,
            y: isMobile ? 30 : 50,
            ...(isMobile ? {} : { rotationX: -90 })
          },
          {
            opacity: 1,
            y: 0,
            ...(isMobile ? {} : { rotationX: 0 }),
            duration: isMobile ? 0.6 : 0.8,
            stagger: isMobile ? 0.05 : 0.03,
            ease: isMobile ? "power2.out" : "back.out(1.7)",
            scrollTrigger: {
              trigger: blockRef.current,
              start: "top 80%",
              toggleActions: "play reverse play reverse",
              ...(isMobile ? { markers: false } : {})
            }
          }
        )
      }

      // Анимация для первой строки
      if (row1Ref.current) {
        const chars = row1Ref.current.querySelectorAll(`.${styles.char}`)
        gsap.fromTo(chars,
          {
            opacity: 0,
            y: isMobile ? 20 : 30
          },
          {
            opacity: 1,
            y: 0,
            duration: isMobile ? 0.5 : 0.6,
            stagger: isMobile ? 0.05 : 0.02,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row1Ref.current,
              start: "top 85%",
              toggleActions: "play reverse play reverse",
              ...(isMobile ? { markers: false } : {})
            }
          }
        )
      }

      // Анимация для иконки планеты
      if (planetIconRef.current) {
        gsap.fromTo(planetIconRef.current,
          {
            opacity: 0,
            y: isMobile ? 20 : 30
          },
          {
            opacity: 1,
            y: 0,
            duration: isMobile ? 0.5 : 0.6,
            delay: isMobile ? 0.3 : 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row1Ref.current,
              start: "top 85%",
              toggleActions: "play reverse play reverse",
              ...(isMobile ? { markers: false } : {})
            }
          }
        )
      }

      // Анимация для второй строки
      if (row2Ref.current) {
        const chars = row2Ref.current.querySelectorAll(`.${styles.char}`)
        gsap.fromTo(chars,
          {
            opacity: 0,
            y: isMobile ? 20 : 30
          },
          {
            opacity: 1,
            y: 0,
            duration: isMobile ? 0.5 : 0.6,
            stagger: isMobile ? 0.05 : 0.02,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row2Ref.current,
              start: "top 85%",
              toggleActions: "play reverse play reverse",
              ...(isMobile ? { markers: false } : {})
            }
          }
        )
      }

      // Анимация для иконки стрелок
      if (arrowsIconRef.current) {
        gsap.fromTo(arrowsIconRef.current,
          {
            opacity: 0,
            y: isMobile ? 20 : 30
          },
          {
            opacity: 1,
            y: 0,
            duration: isMobile ? 0.5 : 0.6,
            delay: isMobile ? 0.3 : 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row2Ref.current,
              start: "top 85%",
              toggleActions: "play reverse play reverse",
              ...(isMobile ? { markers: false } : {})
            }
          }
        )
      }

      // Анимация для иконки одной стрелки
      if (oneArrowIconRef.current) {
        gsap.fromTo(oneArrowIconRef.current,
          {
            opacity: 0,
            y: isMobile ? 20 : 30
          },
          {
            opacity: 1,
            y: 0,
            duration: isMobile ? 0.5 : 0.6,
            delay: isMobile ? 0.3 : 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row2Ref.current,
              start: "top 85%",
              toggleActions: "play reverse play reverse",
              ...(isMobile ? { markers: false } : {})
            }
          }
        )
      }

      // Анимация для третьей строки
      if (row3Ref.current) {
        const chars = row3Ref.current.querySelectorAll(`.${styles.char}`)
        gsap.fromTo(chars,
          {
            opacity: 0,
            y: isMobile ? 20 : 30
          },
          {
            opacity: 1,
            y: 0,
            duration: isMobile ? 0.5 : 0.6,
            stagger: isMobile ? 0.05 : 0.02,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row3Ref.current,
              start: "top 85%",
              toggleActions: "play reverse play reverse",
              ...(isMobile ? { markers: false } : {})
            }
          }
        )
      }

      // Анимация для иконки меню
      if (menuIconRef.current) {
        gsap.fromTo(menuIconRef.current,
          {
            opacity: 0,
            y: isMobile ? 20 : 30
          },
          {
            opacity: 1,
            y: 0,
            duration: isMobile ? 0.5 : 0.6,
            delay: isMobile ? 0.3 : 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row3Ref.current,
              start: "top 85%",
              toggleActions: "play reverse play reverse",
              ...(isMobile ? { markers: false } : {})
            }
          }
        )
      }
    }, 100)

    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className={styles.fourthBlock}>
      <div ref={blockRef}>
        <h2 ref={titleRef} className={styles.valuesTitle}>{splitText('Values')}</h2>
        <div className={styles.valuesContent}>
          <div className={`${styles.row} ${styles.rowStart}`}>
            <p ref={row1Ref} className={styles.rowText}>
              {splitText('business')}
              <br/>
              {splitText('globalization')}
            </p>
            <img ref={planetIconRef} src={planetSvg} alt="Planet" className={styles.planetSvg} />
          </div>
          <div className={`${styles.row} ${styles.rowCenter}`}>
            <p ref={row2Ref} className={styles.rowText}>
              {splitText('expert')}
              <br/>
              {splitText('support')}
            </p>
            <img ref={arrowsIconRef} src={arrowsSvg} alt="Arrows" className={styles.arrowsSvg} />
            <img ref={oneArrowIconRef} src={oneArrowSvg} alt="One Arrow" className={styles.oneArrowSvg} />
          </div>
          <div className={`${styles.row} ${styles.rowEnd}`}>
            <p ref={row3Ref} className={styles.rowText}>
              {splitText('confidentiality')}
            </p>
            <img ref={menuIconRef} src={menuSvg} alt="Menu" className={styles.planetSvg} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FourthBlock

