import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './SeventhBlock.module.scss'
import step7Svg from '../../../assets/svg/step7/step7.svg'

gsap.registerPlugin(ScrollTrigger)

// Глобальный кэш для предзагруженного SVG
let svgCache = null
let svgLoadPromise = null

// Функция предзагрузки SVG (вызывается сразу при импорте модуля)
function preloadSvg() {
  if (svgLoadPromise) return svgLoadPromise
  if (svgCache) return Promise.resolve(svgCache)
  
  svgLoadPromise = fetch(step7Svg)
    .then(response => response.text())
    .then(text => {
      svgCache = text
      return text
    })
    .catch(error => {
      console.error('Error preloading SVG:', error)
      svgLoadPromise = null
      throw error
    })
  
  return svgLoadPromise
}

// Начинаем предзагрузку сразу при импорте модуля
preloadSvg()

function SeventhBlock() {
  const svgRef = useRef(null)
  const blockRef = useRef(null)
  const titleRef = useRef(null)
  const [svgText, setSvgText] = useState(svgCache) // Используем кэш, если уже загружен

  // Если SVG еще не загружен, ждем загрузки
  useEffect(() => {
    if (svgCache) {
      setSvgText(svgCache)
      return
    }
    
    preloadSvg().then(text => {
      setSvgText(text)
    })
  }, [])

  useEffect(() => {
    if (!blockRef.current) return

    // Определяем мобильное устройство
    const isMobile = window.innerWidth <= 480

    // Вставляем загруженный SVG (на всех устройствах)
    if (svgText && svgRef.current) {
      svgRef.current.innerHTML = svgText
      // Добавляем класс для красных точек
      const circles = svgRef.current.querySelectorAll('circle[fill="#9A2720"]')
      circles.forEach(circle => {
        circle.setAttribute('class', 'redDot')
      })
    }

    // На мобильном не создаем ScrollTrigger и не используем анимации
    if (isMobile) {
      // На мобильном ScrollTrigger не создается - ранний return
      // Убеждаемся, что заголовок виден
      if (titleRef.current) {
        gsap.set(titleRef.current, { opacity: 1, y: 0 })
      }
      return
    }

    // Анимация для заголовка (только на десктопе)
    let titleAnimation = null
    if (titleRef.current) {
      titleAnimation = gsap.fromTo(titleRef.current,
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
            trigger: blockRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse"
          }
        }
      )
    }

    // Анимация масштабирования карты при прокрутке (только на десктопе)
    let mapAnimation = null
    if (svgText && svgRef.current) {
      const svgElement = svgRef.current.querySelector('svg')
      if (svgElement) {
        mapAnimation = gsap.fromTo(svgElement,
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

    return () => {
      titleAnimation?.kill()
      mapAnimation?.kill()
      // Убиваем только свои ScrollTrigger
      if (titleAnimation?.scrollTrigger) titleAnimation.scrollTrigger.kill()
      if (mapAnimation?.scrollTrigger) mapAnimation.scrollTrigger.kill()
    }
  }, [svgText])

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

