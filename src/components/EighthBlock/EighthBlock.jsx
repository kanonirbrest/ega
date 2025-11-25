import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './EighthBlock.module.scss'
import vectorSvg from '../../../assets/svg/step8/vector.svg'

gsap.registerPlugin(ScrollTrigger)

function EighthBlock() {
  const blockRef = useRef(null)
  const titleRef = useRef(null)
  const buttonRef = useRef(null)
  const logoRef = useRef(null)

  useEffect(() => {
    if (!blockRef.current || !titleRef.current || !buttonRef.current || !logoRef.current) return

    // Определяем мобильное устройство
    const isMobile = window.innerWidth <= 480

    // На мобильном полностью отключаем все анимации и не используем GSAP
    if (isMobile) {
      // Элементы остаются видимыми без использования GSAP (не потребляют ресурсы)
      return
    }

    // Анимация для заголовка
    const titleAnimation = gsap.fromTo(titleRef.current, {
      filter: "blur(10px)",
      opacity: 0
    }, {
      filter: "blur(0px)",
      opacity: 1,
      duration: 1.5,
      ease: "power2.out",
      immediateRender: false,
      scrollTrigger: {
        trigger: blockRef.current,
        start: "top 80%",
        toggleActions: "play reverse play reverse"
      }
    })

    // Анимация для кнопки и логотипа
    const elementsAnimation = gsap.fromTo([buttonRef.current, logoRef.current], {
      filter: "blur(10px)",
      opacity: 0,
      y: 50
    }, {
      filter: "blur(0px)",
      opacity: 1,
      y: 0,
      duration: 1.5,
      stagger: 0.2,
      ease: "power2.out",
      immediateRender: false,
      scrollTrigger: {
        trigger: blockRef.current,
        start: "top 80%",
        toggleActions: "play reverse play reverse"
      }
    })

    return () => {
      titleAnimation?.kill()
      elementsAnimation?.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const handleWriteUsClick = () => {
    window.location.href = 'mailto:info@emeraldglad.com'
  }

  return (
    <div ref={blockRef} id="contacts" className={styles.eighthBlock}>
      <div className={styles.content}>
        <h2 ref={titleRef} className={styles.title}>EXPERT SUPPORT <br/> TO ACHIEVE BUSINESS GOALS</h2>
        
        <button ref={buttonRef} className={styles.writeUsButton} onClick={handleWriteUsClick}>WRITE US</button>
        
        <div ref={logoRef} className={styles.logoContainer}>
          <img src={vectorSvg} alt="Arrow" className={styles.logoIcon} />
        </div>
      </div>
    </div>
  )
}

export default EighthBlock

