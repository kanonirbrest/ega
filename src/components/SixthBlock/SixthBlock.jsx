import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './SixthBlock.module.scss'
import geoSvgUrl from '../../../assets/svg/geo.svg?url'

gsap.registerPlugin(ScrollTrigger)

// Глобальный кэш для предзагруженного SVG
let svgCache = null
let svgLoadPromise = null

// Функция предзагрузки SVG
function preloadSvg() {
  if (svgLoadPromise) return svgLoadPromise
  if (svgCache) return Promise.resolve(svgCache)
  
  svgLoadPromise = fetch(geoSvgUrl)
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

function SixthBlock() {
  const blockRef = useRef(null)
  const titleRef = useRef(null)
  const svgRef = useRef(null)
  const [svgText, setSvgText] = useState(svgCache)

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
    if (!blockRef.current || !titleRef.current || !svgRef.current || !svgText) return

    // Определяем мобильное устройство
    const isMobile = window.innerWidth <= 480

    const animations = []

    // Вставляем SVG как inline
    if (svgText && svgRef.current) {
      svgRef.current.innerHTML = svgText
    }

    // Небольшая задержка для корректной инициализации
    const timer = setTimeout(() => {
      // Устанавливаем начальное состояние для заголовка
      if (isMobile) {
        gsap.set(titleRef.current, { opacity: 0, y: 20 })
      } else {
        gsap.set(titleRef.current, { 
          filter: "blur(10px)",
          opacity: 0,
          y: 30
        })
      }

      // SVG контейнер видим сразу
      gsap.set(svgRef.current, { opacity: 1 })

      // Находим все path элементы внутри SVG (текст)
      const svgElement = svgRef.current.querySelector('svg')
      let textPaths = []
      
      if (svgElement) {
        // Находим все path элементы с fill="white"
        const allPaths = Array.from(svgElement.querySelectorAll('path[fill="white"]'))
        
        // Фильтруем только текстовые path (названия стран)
        textPaths = allPaths.filter((path) => {
          const d = path.getAttribute('d')
          return d && d.length > 200
        })
        
        if (textPaths.length > 0) {
          // Устанавливаем начальное состояние для текстовых элементов
          gsap.set(textPaths, {
            opacity: 0,
            scale: 0.9,
            transformOrigin: "center center"
          })
        }
      }

      // Создаем одну timeline с общим ScrollTrigger для синхронизации анимаций
      // Для маленького блока используем "top 80%" - когда блок уже виден
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: blockRef.current,
          start: "top 80%", // Для маленького блока запускаем когда он уже виден
          toggleActions: "play none none none",
          once: true,
          ...(isMobile ? { 
            invalidateOnRefresh: true,
            anticipatePin: 0
          } : {})
        }
      })

      // Анимация заголовка
      timeline.fromTo(titleRef.current,
        {
          opacity: 0,
          y: isMobile ? 20 : 30,
          ...(isMobile ? {} : { filter: "blur(10px)" })
        },
        {
          opacity: 1,
          y: 0,
          ...(isMobile ? {} : { filter: "blur(0px)" }),
          duration: isMobile ? 1.0 : 2.0,
          ease: "power2.out"
        },
        0 // Начинаем одновременно
      )

      // Анимация текста SVG с небольшой задержкой после заголовка
      if (textPaths.length > 0) {
        timeline.to(textPaths, {
          opacity: 1,
          scale: 1,
          duration: 1.0,
          stagger: {
            amount: 1.2,
            from: "start",
            ease: "power2.out"
          },
          ease: "power2.out"
        }, 0.3) // Начинаем через 0.3 секунды после начала анимации заголовка
      }

      animations.push(timeline)
    }, 100)

    return () => {
      clearTimeout(timer)
      animations.forEach(anim => {
        if (anim?.scrollTrigger) anim.scrollTrigger.kill()
        anim?.kill()
      })
    }
  }, [svgText])

  return (
    <div ref={blockRef} id="geography" className={styles.sixthBlock}>
      <h2 ref={titleRef} className={styles.geographyTitle}>OUR OFFICES</h2>
      <div ref={svgRef} className={styles.geoSvgContainer}></div>
    </div>
  )
}

export default SixthBlock

