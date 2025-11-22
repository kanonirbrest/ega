import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './SecondBlock.module.scss'
import arrowSvg from '../../../assets/svg/arrow.svg'
import eSvg from '../../../assets/svg/e.svg'
import aSvg from '../../../assets/svg/a.svg'
import gSvg from '../../../assets/svg/g.svg'

function SecondBlock() {
  const blockRef = useRef(null)
  const arrowRef = useRef(null)
  const eRef = useRef(null)
  const aRef = useRef(null)
  const gRef = useRef(null)

  useEffect(() => {
    const elements = [arrowRef.current, eRef.current, aRef.current, gRef.current].filter(Boolean)
    
    if (elements.length === 0 || !blockRef.current) return

    let hasAnimated = false

    // Функция запуска анимации
    const startAnimation = () => {
      if (hasAnimated) return
      hasAnimated = true

      // Небольшая задержка для корректного вычисления позиций
      const timer = setTimeout(() => {
        // Вычисляем центр блока
        const blockRect = blockRef.current.getBoundingClientRect()
        
        // Создаем анимацию перемещения букв из центра на свои места
        const tl = gsap.timeline()

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
            
            // Анимируем от центра к финальной позиции
            tl.from(el, {
              x: offsetX,
              y: offsetY,
              duration: 2.5,
              ease: 'power2.out'
            }, index * 0.15)
          }
        })
      }, 50)

      return timer
    }

    // Создаем Intersection Observer для отслеживания видимости блока
    const observer = new IntersectionObserver(
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

    return () => {
      observer.disconnect()
      // Останавливаем все GSAP анимации при размонтировании
      gsap.killTweensOf(elements)
    }
  }, [])

  return (
    <div ref={blockRef} className={styles.secondBlock}>
      <div className={styles.firstRow}>
        <img ref={arrowRef} src={arrowSvg} alt="Arrow" className={styles.arrowSvg} />
        <img ref={eRef} src={eSvg} alt="E" className={styles.eSvg} />
      </div>
      <div className={styles.secondRow}>
        <img ref={aRef} src={aSvg} alt="A" className={styles.aSvg} />
        <img ref={gRef} src={gSvg} alt="G" className={styles.gSvg} />
      </div>
    </div>
  )
}

export default SecondBlock

