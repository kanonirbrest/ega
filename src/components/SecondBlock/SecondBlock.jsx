import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './SecondBlock.module.scss'
import arrowSvg from '../../../assets/svg/arrow.svg'
import eSvg from '../../../assets/svg/e.svg'
import aSvg from '../../../assets/svg/a.svg'
import gSvg from '../../../assets/svg/g.svg'
import block2Image from '../../../assets/png/block2.webp'

gsap.registerPlugin(ScrollTrigger)

function SecondBlock() {
  const blockRef = useRef(null)
  const arrowRef = useRef(null)
  const eRef = useRef(null)
  const aRef = useRef(null)
  const gRef = useRef(null)

  useEffect(() => {
    const elements = [eRef.current, arrowRef.current, gRef.current, aRef.current].filter(Boolean)
    
    if (elements.length === 0 || !blockRef.current) return

    // Определяем мобильное устройство
    const isMobile = window.innerWidth <= 480

    // Устанавливаем начальную прозрачность
    elements.forEach(el => {
      if (el) {
        gsap.set(el, { opacity: 0 })
      }
    })

    let hasAnimated = false
    let animationTimeline = null
    let timer = null

    // Функция запуска анимации
    const startAnimation = () => {
      if (hasAnimated) return
      hasAnimated = true

      // Небольшая задержка для корректного вычисления позиций
      timer = setTimeout(() => {
        // Вычисляем центр блока
        const blockRect = blockRef.current.getBoundingClientRect()
        
        // Создаем анимацию перемещения букв из центра на свои места
        animationTimeline = gsap.timeline()

        elements.forEach((el, index) => {
          if (el) {
            // Получаем финальную позицию элемента относительно блока
            const finalRect = el.getBoundingClientRect()
            const finalX = finalRect.left - blockRect.left
            const finalY = finalRect.top - blockRect.top
            
            // Вычисляем смещение от центра блока до финальной позиции
            const centerX = blockRect.width / 2
            const centerY = blockRect.height / 2
            const offsetX = centerX - finalX - finalRect.width / 2
            const offsetY = centerY - finalY - finalRect.height / 2
            
            // Анимируем от центра к финальной позиции с изменением opacity
            animationTimeline.fromTo(el, {
              x: offsetX,
              y: offsetY,
              opacity: 0
            }, {
              x: 0,
              y: 0,
              opacity: 1,
              duration: 2.5,
              ease: 'power2.out'
            }, index * 0.15)
          }
        })
      }, 50)
    }

    let scrollTrigger = null
    let observer = null

    if (isMobile) {
      // На мобильном: используем ScrollTrigger для запуска анимации, когда блок в центре экрана
      scrollTrigger = ScrollTrigger.create({
        trigger: blockRef.current,
        start: "center center", // Анимация запускается, когда центр блока в центре экрана
        onEnter: () => {
          startAnimation()
        }
      })
    } else {
      // На десктопе: используем IntersectionObserver (как было изначально)
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              startAnimation()
              // Отключаем observer после первого запуска анимации
              observer.disconnect()
            }
          })
        },
        {
          threshold: 0.3 // Запускаем анимацию, когда видно 30% блока
        }
      )

      observer.observe(blockRef.current)
    }

    return () => {
      if (timer) clearTimeout(timer)
      scrollTrigger?.kill()
      observer?.disconnect()
      animationTimeline?.kill()
      // Останавливаем все GSAP анимации при размонтировании
      gsap.killTweensOf(elements)
    }
  }, [])

  return (
    <div 
      ref={blockRef} 
      className={styles.secondBlock}
      style={{ backgroundImage: `url(${block2Image})` }}
    >
      <div className={styles.firstRow}>
        <img ref={eRef} src={eSvg} alt="E" className={styles.eSvg} loading="lazy" />
        <img ref={arrowRef} src={arrowSvg} alt="Arrow" className={styles.arrowSvg} loading="lazy" />
      </div>
      <div className={styles.secondRow}>
        <img ref={gRef} src={gSvg} alt="G" className={styles.gSvg} loading="lazy" />
        <img ref={aRef} src={aSvg} alt="A" className={styles.aSvg} loading="lazy" />
      </div>
    </div>
  )
}

export default SecondBlock

