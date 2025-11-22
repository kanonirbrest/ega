import styles from './App.module.scss'
import FirstBlock from './components/FirstBlock/FirstBlock'
import SecondBlock from './components/SecondBlock/SecondBlock'
import ThirdBlock from './components/ThirdBlock/ThirdBlock'
import FourthBlock from './components/FourthBlock/FourthBlock'
import FifthBlock from './components/FifthBlock/FifthBlock'
import SixthBlock from './components/SixthBlock/SixthBlock'
import SeventhBlock from './components/SeventhBlock/SeventhBlock'
import EighthBlock from './components/EighthBlock/EighthBlock'

function App() {
  return (
    <div className={styles.app}>
      <FirstBlock />
      <SecondBlock />
      <ThirdBlock />
      <FourthBlock />
      <FifthBlock />
      <SixthBlock />
      <SeventhBlock />
      <EighthBlock />
    </div>
  )
}

export default App