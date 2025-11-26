import { lazy, Suspense } from 'react'
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