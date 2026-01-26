import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './FourthBlock.module.scss'
import globeImage from '../../../assets/png/globe.png'

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
  const chip1Ref = useRef(null)
  const chip2Ref = useRef(null)
  const chip3Ref = useRef(null)
  const globeRef = useRef(null)
  const blockRef = useRef(null)

  useEffect(() => {
    if (!blockRef.current) return

    // Определяем мобильное устройство
    const isMobile = window.innerWidth <= 480

    const animations = []

    const timer = setTimeout(() => {
      // Анимация для заголовка
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll(`.${styles.char}`)
        const anim = gsap.fromTo(chars, 
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
              ...(isMobile ? { 
                markers: false,
                invalidateOnRefresh: true,
                anticipatePin: 0
              } : {})
            }
          }
        )
        animations.push(anim)
      }

      // Анимация для чипсов
      const chips = [chip1Ref.current, chip2Ref.current, chip3Ref.current].filter(Boolean)
      chips.forEach((chip, index) => {
        if (chip) {
          const anim = gsap.fromTo(chip,
            {
              opacity: 0,
              y: isMobile ? 20 : 30
            },
            {
              opacity: 1,
              y: 0,
              duration: isMobile ? 0.5 : 0.6,
              delay: index * 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: chip,
                start: "top 85%",
                toggleActions: "play reverse play reverse",
                ...(isMobile ? { 
                  markers: false,
                  invalidateOnRefresh: true,
                  anticipatePin: 0
                } : {})
              }
            }
          )
          animations.push(anim)
        }
      })

      // Анимация для иконки глобуса
      if (globeRef.current) {
        const anim = gsap.fromTo(globeRef.current,
          {
            opacity: 0,
            scale: 0.8
          },
          {
            opacity: 1,
            scale: 1,
            duration: isMobile ? 0.5 : 0.8,
            delay: isMobile ? 0.3 : 0.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: blockRef.current,
              start: "top 80%",
              toggleActions: "play reverse play reverse",
              ...(isMobile ? { 
                markers: false,
                invalidateOnRefresh: true,
                anticipatePin: 0
              } : {})
            }
          }
        )
        animations.push(anim)
      }
    }, 100)

    return () => {
      clearTimeout(timer)
      // Убиваем только свои ScrollTrigger
      animations.forEach(anim => {
        if (anim?.scrollTrigger) anim.scrollTrigger.kill()
        anim?.kill()
      })
    }
  }, [])

  return (
    <div className={styles.fourthBlock}>
      <div ref={blockRef} className={styles.valuesContainer}>
        <div className={styles.valuesLeft}>
          <h2 ref={titleRef} className={styles.valuesTitle}>{splitText('Values')}</h2>
          <div className={styles.chipsContainer}>
            <div ref={chip1Ref} className={styles.chip}>
              BUSINESS GLOBALIZATION
            </div>
            <div className={styles.chipsRow}>
              <div ref={chip2Ref} className={styles.chip}>
                EXPERT SUPPORT
              </div>
              <div ref={chip3Ref} className={styles.chip}>
                CONFIDENTIALITY
              </div>
            </div>
          </div>
        </div>
        <div className={styles.valuesRight}>
          <img ref={globeRef} src={globeImage} alt="Globe" className={styles.globeImage} loading="lazy" />
        </div>
      </div>
    </div>
  )
}

export default FourthBlock

