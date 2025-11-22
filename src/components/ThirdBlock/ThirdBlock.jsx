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

    // Устанавливаем начальное состояние
    gsap.set([titleRef.current, ...textRef.current.children], {
      filter: "blur(10px)",
      opacity: 0
    })
    gsap.set(textRef.current.children, {
      y: 50
    })

    // Анимация для заголовка
    const titleAnimation = gsap.to(titleRef.current, {
      filter: "blur(0px)",
      opacity: 1,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: blockRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    })

    // Анимация для текста
    const textAnimation = gsap.to(textRef.current.children, {
      filter: "blur(0px)",
      opacity: 1,
      y: 0,
      duration: 1.5,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    })

    return () => {
      titleAnimation?.kill()
      textAnimation?.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
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

