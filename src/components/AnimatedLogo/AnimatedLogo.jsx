import { useEffect, useRef } from 'react'
import lottie from 'lottie-web'
import styles from './AnimatedLogo.module.scss'
import animationData from '../../../assets/EGA.json'

function AnimatedLogo() {
  const containerRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return undefined

    // Определяем мобильное устройство
    const isMobile = window.innerWidth <= 480

    // На мобильных используем canvas renderer для лучшей производительности
    // и снижаем качество рендеринга
    animationRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: isMobile ? 'canvas' : 'svg', // Canvas быстрее на мобильных
      loop: true,
      autoplay: true,
      animationData,
      speed: 1.25,
      ...(isMobile ? {
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
          clearCanvas: true,
          progressiveLoad: true, // Прогрессивная загрузка
          hideOnTransparent: true
        }
      } : {})
    })

    return () => {
      animationRef.current?.destroy()
      animationRef.current = null
    }
  }, [])

  return (
    <div className={styles.logoContainer}>
      <div ref={containerRef} className={styles.lottie} aria-hidden="true" />
    </div>
  )
}

export default AnimatedLogo

