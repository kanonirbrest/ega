import styles from './SixthBlock.module.scss'
import pointSvg from '../../../assets/svg/step6/point.svg'
import arrowLeftSvg from '../../../assets/svg/step6/arrowLeft.svg'
import arrowRightSvg from '../../../assets/svg/step6/arrowRight.svg'

function SixthBlock() {
  return (
    <div id="geography" className={styles.sixthBlock}>
      <h2 className={styles.geographyTitle}>GEOGRAPHY</h2>
      
      <div className={styles.geographyContent}>
        <div className={styles.leftColumn}>
          <div className={styles.locationItem}>
            <div className={styles.locationContent}>
              <div className={styles.locationName}>Cyprus</div>
              <img src={arrowLeftSvg} alt="Arrow left" className={styles.arrowLeft} />
            </div>
          </div>
          
          <div className={styles.locationItem}>
            <div className={styles.locationContent}>
              <div className={styles.locationName}>UAE</div>
              <img src={arrowLeftSvg} alt="Arrow left" className={styles.arrowLeft} />
            </div>
          </div>
        </div>

        <div className={styles.centerColumn}>
          <img src={pointSvg} alt="Location point" className={styles.pointIcon} />
          <div className={styles.ourOffices}>our offices</div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.locationItem}>
            <div className={styles.locationContent}>
              <img src={arrowRightSvg} alt="Arrow right" className={styles.arrowRight} />
              <div className={styles.locationName}>Hong Kong</div>
            </div>
          </div>
          
          <div className={styles.locationItem}>
            <div className={styles.locationContent}>
              <img src={arrowRightSvg} alt="Arrow right" className={styles.arrowRight} />
              <div className={styles.locationName}>China</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SixthBlock

