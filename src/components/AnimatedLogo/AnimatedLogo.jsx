import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import styles from './AnimatedLogo.module.scss'
import firstSvg from '../../../assets/svg/step1/EGA_LOGO ANIMATION-01.svg'
import secondSvg from '../../../assets/svg/step1/EGA_LOGO ANIMATION-02.svg'

gsap.registerPlugin(MorphSVGPlugin)

function AnimatedLogo() {
  const svgRef = useRef(null)
  const pathGRef = useRef(null)
  const pathERef = useRef(null)
  const pathARef = useRef(null)
  const pathArrowRef = useRef(null)

  useEffect(() => {
    const svgElement = svgRef.current
    const pathGElement = pathGRef.current
    const pathEElement = pathERef.current
    const pathAElement = pathARef.current
    const pathArrowElement = pathArrowRef.current

    if (!svgElement || !pathGElement || !pathEElement || !pathAElement || !pathArrowElement) {
      return
    }

    // Функция для извлечения пути из элемента (path или polygon)
    const getPathData = (element) => {
      if (element.tagName === 'path') {
        return element.getAttribute('d')
      } else if (element.tagName === 'polygon') {
        const points = element.getAttribute('points')
        // Конвертируем polygon в path для MorphSVG
        // Формат points: "x1 y1 x2 y2 x3 y3..."
        const coords = points.trim().split(/\s+/)
        let pathData = `M${coords[0]},${coords[1]}`
        for (let i = 2; i < coords.length; i += 2) {
          pathData += ` L${coords[i]},${coords[i + 1]}`
        }
        return pathData + 'Z'
      }
      return null
    }

    // Функция для парсинга SVG и извлечения путей и viewBox
    const parseSvg = (svgText, order) => {
      const parser = new DOMParser()
      const svgDoc = parser.parseFromString(svgText, 'image/svg+xml')
      const svgElement = svgDoc.querySelector('svg')
      if (!svgElement) return null

      const result = {
        paths: {},
        viewBox: svgElement.getAttribute('viewBox') || '',
        width: svgElement.getAttribute('width') || '',
        height: svgElement.getAttribute('height') || ''
      }

      if (order === 'first') {
        // Первый SVG: polygon (стрелка), затем группа <g> с тремя path (G, E, A)
        const children = Array.from(svgElement.children)
        result.paths.arrow = getPathData(children[0]) // polygon
        
        // Ищем группу <g>
        const group = children.find(child => child.tagName === 'g')
        if (group) {
          const groupChildren = Array.from(group.children)
          result.paths.g = getPathData(groupChildren[0]) // первый path в группе (G)
          result.paths.e = getPathData(groupChildren[1]) // второй path в группе (E)
          result.paths.a = getPathData(groupChildren[2]) // третий path в группе (A)
        }
      } else {
        // Второй SVG: path (E), path (G), path (A), polygon (стрелка)
        const children = Array.from(svgElement.children)
        result.paths.e = getPathData(children[0]) // path
        result.paths.g = getPathData(children[1]) // path
        result.paths.a = getPathData(children[2]) // path
        result.paths.arrow = getPathData(children[3]) // polygon
      }

      return result
    }

    let initialTimer = null

    // Загружаем оба SVG файла
    Promise.all([
      fetch(firstSvg).then(res => res.text()),
      fetch(secondSvg).then(res => res.text())
    ])
      .then(([firstSvgText, secondSvgText]) => {
        const firstSvgData = parseSvg(firstSvgText, 'first')
        const secondSvgData = parseSvg(secondSvgText, 'second')

        if (!firstSvgData || !secondSvgData) {
          console.error('Failed to parse SVG files')
          return
        }

        // Используем пути из загруженных SVG
        const firstArrow = firstSvgData.paths.arrow
        const firstG = firstSvgData.paths.g
        const firstE = firstSvgData.paths.e
        const firstA = firstSvgData.paths.a

        const secondArrow = secondSvgData.paths.arrow
        const secondG = secondSvgData.paths.g
        const secondE = secondSvgData.paths.e
        const secondA = secondSvgData.paths.a

        // Извлекаем viewBox и размеры
        const firstViewBox = firstSvgData.viewBox
        const firstWidth = firstSvgData.width || firstViewBox.split(' ')[2]
        const firstHeight = firstSvgData.height || firstViewBox.split(' ')[3]

        const secondViewBox = secondSvgData.viewBox
        const secondWidth = secondSvgData.width || secondViewBox.split(' ')[2]
        const secondHeight = secondSvgData.height || secondViewBox.split(' ')[3]

        // Обновляем начальные пути и viewBox в SVG элементах
        pathArrowElement.setAttribute('d', firstArrow)
        pathGElement.setAttribute('d', firstG)
        pathEElement.setAttribute('d', firstE)
        pathAElement.setAttribute('d', firstA)
        
        // Устанавливаем начальный viewBox и размеры
        svgElement.setAttribute('viewBox', firstViewBox)
        svgElement.setAttribute('width', firstWidth)
        svgElement.setAttribute('height', firstHeight)

        // Функция прямой анимации (first -> second)
        const runForwardAnimation = () => {
          const tl = gsap.timeline({
            onComplete: () => {
              // После завершения прямой анимации запускаем обратную
              runReverseAnimation()
            }
          })

          // Анимируем viewBox и размеры SVG
          tl.to(svgElement, {
            attr: { viewBox: secondViewBox },
            width: secondWidth,
            height: secondHeight,
            duration: 1.5,
            ease: 'power2.inOut'
          })

          // Последовательный морфинг букв (волна) с MorphSVGPlugin
          // Стрелка - первая
          tl.to(pathArrowElement, {
            morphSVG: secondArrow,
            duration: 1.2,
            ease: 'power2.inOut'
          }, 0)

          // G - вторая (задержка 0.3 сек)
          tl.to(pathGElement, {
            morphSVG: secondG,
            duration: 1.2,
            ease: 'power2.inOut'
          }, 0.3)

          // A - третья (задержка 0.6 сек)
          tl.to(pathAElement, {
            morphSVG: secondA,
            duration: 1.2,
            ease: 'power2.inOut'
          }, 0.6)

          // E - четвертая (задержка 0.9 сек)
          tl.to(pathEElement, {
            morphSVG: secondE,
            duration: 1.2,
            ease: 'power2.inOut'
          }, 0.9)
        }

        // Функция обратной анимации (second -> first)
        const runReverseAnimation = () => {
          const tl = gsap.timeline({
            onComplete: () => {
              // После завершения обратной анимации ждем 2 секунды и запускаем цикл снова
              setTimeout(() => {
                runForwardAnimation()
              }, 2000)
            }
          })

          // Анимируем viewBox и размеры SVG обратно
          tl.to(svgElement, {
            attr: { viewBox: firstViewBox },
            width: firstWidth,
            height: firstHeight,
            duration: 1,
            ease: 'power2.inOut'
          })

          // Обратный последовательный морфинг букв (волна в обратную сторону)
          // Стрелка - первая
          tl.to(pathArrowElement, {
            morphSVG: firstArrow,
            duration: 0.8,
            ease: 'power2.inOut'
          }, 0)

          // G - вторая (задержка 0.2 сек)
          tl.to(pathGElement, {
            morphSVG: firstG,
            duration: 0.8,
            ease: 'power2.inOut'
          }, 0.2)

          // A - третья (задержка 0.4 сек)
          tl.to(pathAElement, {
            morphSVG: firstA,
            duration: 0.8,
            ease: 'power2.inOut'
          }, 0.4)

          // E - четвертая (задержка 0.6 сек)
          tl.to(pathEElement, {
            morphSVG: firstE,
            duration: 0.8,
            ease: 'power2.inOut'
          }, 0.6)
        }

        // Начальная задержка 1 секунда, затем запускаем прямую анимацию
        initialTimer = setTimeout(() => {
          runForwardAnimation()
        }, 1000)
      })
      .catch(error => {
        console.error('Error loading SVG files:', error)
      })

    return () => {
      if (initialTimer) {
        clearTimeout(initialTimer)
      }
      // Останавливаем все GSAP анимации при размонтировании
      if (svgElement && pathGElement && pathEElement && pathAElement && pathArrowElement) {
        gsap.killTweensOf([svgElement, pathGElement, pathEElement, pathAElement, pathArrowElement])
      }
    }
  }, [])

  return (
    <div className={styles.logoContainer}>
      <svg 
        ref={svgRef}
        width="518.98" 
        height="123.7" 
        viewBox="0 0 518.98 123.7" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svg}
      >
        <path ref={pathGRef} d="M120.192 81.3996V0.988983H179.449V9.72509H129.326V36.7026H174.085V45.5761H129.326V72.6635H179.449V81.3996H120.192Z" fill="#010101"/>
        <path ref={pathERef} d="M278.513 81.3721L312.709 0.961517H324.153L358.348 81.3721H348.252L338.403 58.0484H298.513L288.665 81.3721H278.568H278.513ZM302.007 49.6694H334.854L318.431 10.4394L302.007 49.6694Z" fill="#010101"/>
        <path ref={pathARef} d="M228.197 82.3611C219.999 82.3611 212.984 80.5205 207.097 76.8393C201.21 73.158 196.698 68.1856 193.534 61.9494C190.371 55.7133 188.803 48.7903 188.803 41.1806C188.803 33.5708 190.426 26.6479 193.672 20.4117C196.918 14.1756 201.512 9.20312 207.482 5.52187C213.452 1.84062 220.439 0 228.472 0C237.138 0 244.676 2.11535 251.031 6.37351C257.386 10.6317 262.09 16.1261 265.088 22.8292H255.102C252.681 18.5436 249.298 15.1371 244.951 12.6371C240.604 10.1372 235.35 8.87346 229.188 8.87346C222.695 8.87346 217.111 10.302 212.406 13.1866C207.702 16.0711 204.098 19.9172 201.65 24.7798C199.201 29.6423 197.936 35.1092 197.936 41.1806C197.936 47.2519 199.146 52.6089 201.595 57.5264C204.016 62.4164 207.565 66.3175 212.241 69.202C216.891 72.0866 222.475 73.5151 228.968 73.5151C233.837 73.5151 238.431 72.4712 242.778 70.3559C247.124 68.2405 250.646 65.2186 253.369 61.2351C256.093 57.2792 257.441 52.499 257.441 46.8948H228.005V38.6257H265.831V81.3996H257.441V67.1966C255.735 69.779 253.562 72.2514 250.866 74.5591C248.197 76.8667 244.951 78.7623 241.182 80.2183C237.413 81.6743 233.094 82.4161 228.225 82.4161L228.197 82.3611Z" fill="#010101"/>
        <path ref={pathArrowRef} d="M80.1373 1.1813H71.3615V3.73619L73.9475 1.1813L80.1373 7.33503L77.7714 9.72509H80.1373V81.1798H71.3615V16.0986L6.21731 81.1798L0 74.9712L65.3918 9.72509H0V0.961517H80.1373V1.1813Z" fill="#010101"/>
      </svg>
    </div>
  )
}

export default AnimatedLogo
