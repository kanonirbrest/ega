import { lazy, Suspense, useEffect } from 'react'
import styles from './App.module.scss'
import FirstBlock from './components/FirstBlock/FirstBlock'
import SecondBlock from './components/SecondBlock/SecondBlock'
// Lazy load компоненты ниже первого экрана для оптимизации
const ThirdBlock = lazy(() => import('./components/ThirdBlock/ThirdBlock'))
const FourthBlock = lazy(() => import('./components/FourthBlock/FourthBlock'))
const FifthBlock = lazy(() => import('./components/FifthBlock/FifthBlock'))
const SixthBlock = lazy(() => import('./components/SixthBlock/SixthBlock'))
const SeventhBlock = lazy(() => import('./components/SeventhBlock/SeventhBlock'))
const EighthBlock = lazy(() => import('./components/EighthBlock/EighthBlock'))

function App() {
  // Ранняя предзагрузка SVG для блока 7
  // Начинаем загрузку сразу при загрузке приложения
  useEffect(() => {
    // Импортируем и предзагружаем SVG асинхронно
    import('../assets/svg/step7/step7.svg?url').then(module => {
      // Создаем link для предзагрузки
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.href = module.default
      link.as = 'fetch'
      link.crossOrigin = 'anonymous'
      document.head.appendChild(link)
      
      // Также начинаем загрузку через fetch
      fetch(module.default)
        .then(response => response.text())
        .catch(() => {
          // Игнорируем ошибки, так как это только предзагрузка
        })
    })
  }, [])
  return (
    <div className={styles.app}>
      <FirstBlock />
      <SecondBlock />
      <Suspense fallback={null}>
        <ThirdBlock />
        <FourthBlock />
        <FifthBlock />
        <SixthBlock />
        <SeventhBlock />
        <EighthBlock />
      </Suspense>
    </div>
  )
}

export default App