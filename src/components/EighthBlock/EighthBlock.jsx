import { useRef } from 'react'
import styles from './EighthBlock.module.scss'
import vectorSvg from '../../../assets/svg/step8/vector.svg'

function EighthBlock() {
  const blockRef = useRef(null)
  const titleRef = useRef(null)
  const buttonRef = useRef(null)
  const logoRef = useRef(null)

  const handleWriteUsClick = () => {
    window.location.href = 'mailto:info@emeraldglad.com'
  }

  return (
    <div ref={blockRef} id="contacts" className={styles.eighthBlock}>
      <div className={styles.content}>
        <h2 ref={titleRef} className={styles.title}>EXPERT SUPPORT <br/> TO ACHIEVE BUSINESS GOALS</h2>
        
        <button ref={buttonRef} className={styles.writeUsButton} onClick={handleWriteUsClick}>WRITE US</button>
        
        <div ref={logoRef} className={styles.logoContainer}>
          <img src={vectorSvg} alt="Arrow" className={styles.logoIcon} />
        </div>
      </div>
    </div>
  )
}

export default EighthBlock

