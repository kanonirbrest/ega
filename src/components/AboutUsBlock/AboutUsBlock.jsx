import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './AboutUsBlock.module.scss'
import aboutImage from '../../../assets/png/about.png'

gsap.registerPlugin(ScrollTrigger)

function AboutUsBlock() {
  const blockRef = useRef(null)
  const titleRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if (!blockRef.current || !titleRef.current || !contentRef.current) return

    // Определяем мобильное устройство
    const isMobile = window.innerWidth <= 480

    // Устанавливаем начальное состояние
    const textBlocks = Array.from(contentRef.current.children)
    if (isMobile) {
      // На мобильных убираем blur для производительности
      gsap.set([titleRef.current, ...textBlocks], {
        opacity: 0
      })
      gsap.set(textBlocks, {
        y: 30
      })
    } else {
      gsap.set([titleRef.current, ...textBlocks], {
        filter: "blur(10px)",
        opacity: 0
      })
      gsap.set(textBlocks, {
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
        ...(isMobile ? { 
          markers: false,
          invalidateOnRefresh: true,
          anticipatePin: 0
        } : {})
      }
    })

    // Анимация для контента
    const contentAnimation = gsap.to(textBlocks, {
      ...(isMobile ? {} : { filter: "blur(0px)" }),
      opacity: 1,
      y: 0,
      duration: isMobile ? 0.8 : 1.5,
      stagger: isMobile ? 0.1 : 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top 80%",
        toggleActions: "play reverse play reverse",
        ...(isMobile ? { markers: false } : {})
      }
    })

    return () => {
      titleAnimation?.kill()
      contentAnimation?.kill()
      // Убиваем только свои ScrollTrigger
      if (titleAnimation?.scrollTrigger) titleAnimation.scrollTrigger.kill()
      if (contentAnimation?.scrollTrigger) contentAnimation.scrollTrigger.kill()
    }
  }, [])

  return (
    <div 
      ref={blockRef} 
      id="about-us" 
      className={styles.aboutUsBlock}
      style={{ backgroundImage: `url(${aboutImage})` }}
    >
      <h2 ref={titleRef} className={styles.aboutUsTitle}>About Us</h2>
      <div ref={contentRef} className={styles.aboutUsContent}>
        <div className={styles.textBlock}>
          <p className={styles.aboutUsText}>
            Emerald Global Advisors is an international team of professionals specializing
            in corporate consulting, taxation, audit, and banking services.
          </p>
        </div>
        <div className={styles.textBlock}>
          <p className={styles.aboutUsText}>
            Since 2013, we have been providing corporate and private clients with highly precise, up‑to‑date solutions for corporate structuring and financial transaction support across more than 20 jurisdictions worldwide.
          </p>
        </div>
        <div className={styles.textBlock}>
          <p className={styles.aboutUsText}>
            Our mission is to ensure that your business and assets are securely protected
            and generate returns for you, despite the rapidly evolving political, regulatory,
            and financial landscape of the global economy.
          </p>
        </div>
        <div className={styles.textBlock}>
          <p className={styles.aboutUsText}>
            As your trusted partner, we create opportunities to realize your aspirations and ambitions, empowering you to envision new heights and achievements every day.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutUsBlock
