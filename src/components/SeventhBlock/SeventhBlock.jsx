import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './SeventhBlock.module.scss'
import step7Svg from '../../../assets/svg/step7/step7.svg'

gsap.registerPlugin(ScrollTrigger)

function SeventhBlock() {
  const svgRef = useRef(null)
  const blockRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    if (!blockRef.current) return

    // Определяем мобильное устройство
    const isMobile = window.innerWidth <= 480

    // Анимация для заголовка
    if (titleRef.current) {
      gsap.fromTo(titleRef.current,
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
            trigger: blockRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
            ...(isMobile ? { markers: false } : {})
          }
        }
      )
    }

    // Загружаем SVG и вставляем его inline для возможности стилизации
    fetch(step7Svg)
      .then(response => response.text())
      .then(svgText => {
        if (svgRef.current) {
          svgRef.current.innerHTML = svgText
          // Добавляем класс для красных точек
          const circles = svgRef.current.querySelectorAll('circle[fill="#9A2720"]')
          circles.forEach(circle => {
            circle.setAttribute('class', 'redDot')
          })

          // Анимация масштабирования карты при прокрутке (только на десктопе)
          if (!isMobile && blockRef.current && svgRef.current) {
            const svgElement = svgRef.current.querySelector('svg')
            if (svgElement) {
              gsap.fromTo(svgElement,
                {
                  scale: 0.8
                },
                {
                  scale: 1.15,
                  ease: "none",
                  scrollTrigger: {
                    trigger: blockRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                  }
                }
              )
            }
          }
          // На мобильном карта отображается без анимации и скейла
        }
      })
      .catch(error => {
        console.error('Error loading SVG:', error)
      })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div ref={blockRef} className={styles.seventhBlock}>
      <h2 ref={titleRef} className={styles.title}>Jurisdictions we are providing services:</h2>
      <div ref={svgRef} className={styles.step7Icon}></div>
      <div className={styles.jurisdictionsList}>
        Brazil, Cayman Islands, BVI, Costa Rica, Switzerland,<br/>
        United Kingdom, Serbia, Armenia, Kazakhstan, Cyprus, UAE,<br/>
        Hong Kong, China, Seychelles Islands, Marshal Islands.
      </div>
    </div>
  )
}

export default SeventhBlock

