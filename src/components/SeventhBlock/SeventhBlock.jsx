import styles from './SeventhBlock.module.scss'
import step7Svg from '../../../assets/svg/step7/step7.svg'

function SeventhBlock() {
  return (
    <div className={styles.seventhBlock}>
      <img src={step7Svg} alt="Step 7" className={styles.step7Icon} />
    </div>
  )
}

export default SeventhBlock

