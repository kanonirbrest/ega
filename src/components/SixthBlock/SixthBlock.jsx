import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './SixthBlock.module.scss'
import pointSvg from '../../../assets/svg/step6/point.svg'
import arrowLeftSvg from '../../../assets/svg/step6/arrowLeft.svg'
import arrowRightSvg from '../../../assets/svg/step6/arrowRight.svg'

gsap.registerPlugin(ScrollTrigger)

function SixthBlock() {
  const blockRef = useRef(null)
  const titleRef = useRef(null)
  const cyprusRef = useRef(null)
  const uaeRef = useRef(null)
  const centerRef = useRef(null)
  const hongKongRef = useRef(null)
  const chinaRef = useRef(null)

  useEffect(() => {
    if (!blockRef.current) return

    // Определяем мобильное устройство
    const isMobile = window.innerWidth <= 480

    const timer = setTimeout(() => {
      // На мобильном отключаем все анимации
      if (isMobile) {
        // Элементы просто отображаются без анимации
        return
      }

      // Анимация для заголовка (только на десктопе)
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          {
            opacity: 0,
            y: 30
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: blockRef.current,
              start: "top 80%",
              toggleActions: "play reverse play reverse"
            }
          }
        )
      }

      // Анимация для Cyprus (первый элемент слева)
      if (cyprusRef.current) {
        gsap.fromTo(cyprusRef.current,
          {
            opacity: 0,
            x: -50
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: blockRef.current,
              start: "top 80%",
              toggleActions: "play reverse play reverse"
            }
          }
        )
      }

      // На десктопе оставляем оригинальные анимации с задержками
      // Анимация для центрального блока
        if (centerRef.current) {
          gsap.fromTo(centerRef.current,
            {
              opacity: 0,
              scale: 0.8
            },
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              delay: 0.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: blockRef.current,
                start: "top 80%",
                toggleActions: "play reverse play reverse"
              }
            }
          )
        }

        // Анимация для Hong Kong (первый элемент справа)
        if (hongKongRef.current) {
          gsap.fromTo(hongKongRef.current,
            {
              opacity: 0,
              x: 50
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              delay: 0.4,
              ease: "power2.out",
              scrollTrigger: {
                trigger: blockRef.current,
                start: "top 80%",
                toggleActions: "play reverse play reverse"
              }
            }
          )
        }

        // Анимация для UAE (второй элемент слева)
        if (uaeRef.current) {
          gsap.fromTo(uaeRef.current,
            {
              opacity: 0,
              x: -50
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              delay: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: blockRef.current,
                start: "top 80%",
                toggleActions: "play reverse play reverse"
              }
            }
          )
        }

        // Анимация для China (второй элемент справа)
        if (chinaRef.current) {
          gsap.fromTo(chinaRef.current,
            {
              opacity: 0,
              x: 50
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              delay: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: blockRef.current,
                start: "top 80%",
                toggleActions: "play reverse play reverse"
              }
            }
          )
        }
    }, 100)

    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div ref={blockRef} id="geography" className={styles.sixthBlock}>
      <h2 ref={titleRef} className={styles.geographyTitle}>GEOGRAPHY</h2>
      
      <div className={styles.geographyContent}>
        <div className={styles.leftContent}>
            <div className={styles.leftColumn}>
            <div ref={cyprusRef} className={styles.locationItem}>
              <div className={styles.locationContent}>
                <div className={styles.locationName}>Cyprus</div>
                <img src={arrowLeftSvg} alt="Arrow left" className={styles.arrowLeft} />
              </div>
            </div>
            
            <div ref={uaeRef} className={styles.locationItem}>
              <div className={styles.locationContent}>
                <div className={styles.locationName}>UAE</div>
                <img src={arrowLeftSvg} alt="Arrow left" className={styles.arrowLeft} />
              </div>
            </div>
          </div>

          <div ref={centerRef} className={styles.centerColumn}>
            <img src={pointSvg} alt="Location point" className={styles.pointIcon} />
            <div className={styles.ourOffices}>our offices</div>
          </div>

          <div className={styles.rightColumn}>
            <div ref={hongKongRef} className={styles.locationItem}>
              <div className={styles.locationContent}>
                <img src={arrowRightSvg} alt="Arrow right" className={styles.arrowRight} />
                <div className={styles.locationName}>Hong Kong</div>
              </div>
            </div>
            
            <div ref={chinaRef} className={styles.locationItem}>
              <div className={styles.locationContent}>
                <img src={arrowRightSvg} alt="Arrow right" className={styles.arrowRight} />
                <div className={styles.locationName}>China</div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default SixthBlock

