import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './SeventhBlock.module.scss'
import step7Svg from '../../../assets/svg/step7/step7.svg'

gsap.registerPlugin(ScrollTrigger)

function SeventhBlock() {
  const svgRef = useRef(null)
  const blockRef = useRef(null)

  useEffect(() => {
    // Загружаем SVG и вставляем его inline для возможности стилизации
    fetch(step7Svg)
      .then(response => response.text())
      .then(svgText => {
        if (svgRef.current) {
          svgRef.current.innerHTML = svgText
          // Добавляем класс для красных точек
          const circles = svgRef.current.querySelectorAll('circle[fill="#9A2720"]')
          circles.forEach(circle => {
            circle.setAttribute('class', 'redDot')
          })

          // Анимация масштабирования карты при прокрутке
          if (blockRef.current && svgRef.current) {
            const svgElement = svgRef.current.querySelector('svg')
            if (svgElement) {
              gsap.fromTo(svgElement,
                {
                  scale: 0.8
                },
                {
                  scale: 1.15,
                  ease: "none",
                  scrollTrigger: {
                    trigger: blockRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                  }
                }
              )
            }
          }
        }
      })
      .catch(error => {
        console.error('Error loading SVG:', error)
      })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div ref={blockRef} className={styles.seventhBlock}>
      <div ref={svgRef} className={styles.step7Icon}></div>
    </div>
  )
}

export default SeventhBlock

