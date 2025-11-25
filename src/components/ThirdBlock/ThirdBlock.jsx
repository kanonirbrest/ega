import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './ThirdBlock.module.scss'

gsap.registerPlugin(ScrollTrigger)

function ThirdBlock() {
  const blockRef = useRef(null)
  const titleRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    if (!blockRef.current || !titleRef.current || !textRef.current) return

    // Определяем мобильное устройство
    const isMobile = window.innerWidth <= 480

    // Устанавливаем начальное состояние
    if (isMobile) {
      // На мобильных убираем blur для производительности
      gsap.set([titleRef.current, ...textRef.current.children], {
        opacity: 0
      })
      gsap.set(textRef.current.children, {
        y: 30
      })
    } else {
      gsap.set([titleRef.current, ...textRef.current.children], {
        filter: "blur(10px)",
        opacity: 0
      })
      gsap.set(textRef.current.children, {
        y: 50
      })
    }

    // Анимация для заголовка
    const titleAnimation = gsap.to(titleRef.current, {
      ...(isMobile ? {} : { filter: "blur(0px)" }),
      opacity: 1,
      duration: isMobile ? 0.8 : 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: blockRef.current,
        start: "top 80%",
        toggleActions: "play reverse play reverse",
        ...(isMobile ? { markers: false } : {})
      }
    })

    // Анимация для текста
    const textAnimation = gsap.to(textRef.current.children, {
      ...(isMobile ? {} : { filter: "blur(0px)" }),
      opacity: 1,
      y: 0,
      duration: isMobile ? 0.8 : 1.5,
      stagger: isMobile ? 0.1 : 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
        toggleActions: "play reverse play reverse",
        ...(isMobile ? { markers: false } : {})
      }
    })

    return () => {
      titleAnimation?.kill()
      textAnimation?.kill()
      // Убиваем только свои ScrollTrigger
      if (titleAnimation?.scrollTrigger) titleAnimation.scrollTrigger.kill()
      if (textAnimation?.scrollTrigger) textAnimation.scrollTrigger.kill()
    }
  }, [])

  return (
    <div ref={blockRef} id="values" className={styles.thirdBlock}>
      <h2 ref={titleRef} className={styles.valuesTitle}>Idea</h2>
      <div ref={textRef} className={styles.leadText}>
        <div className={styles.leadLine}>lead    the</div>
        <div className={styles.leadLine}>future           across</div>
        <div className={styles.leadLine}>the          borders</div>
      </div>
    </div>
  )
}

export default ThirdBlock

