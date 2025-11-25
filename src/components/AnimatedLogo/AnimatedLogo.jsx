import { useEffect, useRef } from 'react'
import lottie from 'lottie-web'
import styles from './AnimatedLogo.module.scss'
import animationData from '../../../assets/EGA.json'

function AnimatedLogo() {
  const containerRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return undefined

    animationRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData,
      speed: 1.25
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

