import styles from './EighthBlock.module.scss'
import vectorSvg from '../../../assets/svg/step8/vector.svg'

function EighthBlock() {
  const handleWriteUsClick = () => {
    window.location.href = 'mailto:info@emeraldglad.com'
  }

  return (
    <div id="contacts" className={styles.eighthBlock}>
      <div className={styles.content}>
        <h2 className={styles.title}>EXPERT SUPPORT <br/> TO ACHIEVE BUSINESS GOALS</h2>
        
        <button className={styles.writeUsButton} onClick={handleWriteUsClick}>WRITE US</button>
        
        <div className={styles.logoContainer}>
          <img src={vectorSvg} alt="Arrow" className={styles.logoIcon} loading="lazy" />
        </div>
      </div>
    </div>
  )
}

export default EighthBlock

