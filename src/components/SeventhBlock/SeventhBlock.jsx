import { useEffect, useRef } from 'react'
import styles from './SeventhBlock.module.scss'
import step7Svg from '../../../assets/svg/step7/step7.svg'

function SeventhBlock() {
  const svgRef = useRef(null)

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
        }
      })
      .catch(error => {
        console.error('Error loading SVG:', error)
      })
  }, [])

  return (
    <div className={styles.seventhBlock}>
      <div ref={svgRef} className={styles.step7Icon}></div>
    </div>
  )
}

export default SeventhBlock

