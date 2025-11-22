import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './App.module.scss'
import FirstBlock from './components/FirstBlock/FirstBlock'
import SecondBlock from './components/SecondBlock/SecondBlock'
import ThirdBlock from './components/ThirdBlock/ThirdBlock'
import FourthBlock from './components/FourthBlock/FourthBlock'
import FifthBlock from './components/FifthBlock/FifthBlock'
import SixthBlock from './components/SixthBlock/SixthBlock'
import SeventhBlock from './components/SeventhBlock/SeventhBlock'
import EighthBlock from './components/EighthBlock/EighthBlock'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const fourthBlockRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      // Параллакс для FourthBlock - вертикальное движение вверх
      if (fourthBlockRef.current) {
        gsap.to(fourthBlockRef.current, {
          y: -500,
          ease: "none",
          scrollTrigger: {
            trigger: fourthBlockRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        })
      }
    }, 100)

    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className={styles.app}>
      <FirstBlock />
      <SecondBlock />
      <ThirdBlock />
      <FourthBlock ref={fourthBlockRef} />
      <FifthBlock />
      <SixthBlock />
      <SeventhBlock />
      <EighthBlock />
    </div>
  )
}

export default App