import styles from './FirstBlock.module.scss'
import smallLogo from '../../../assets/png/small-logo.png'
import AnimatedLogo from '../AnimatedLogo/AnimatedLogo'

function FirstBlock() {
  const handleNavClick = (e, targetId) => {
    e.preventDefault()
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <div className={styles.firstBlock}>
      <div className={styles.logoContainer}>
        <AnimatedLogo />
      </div>
      <div className={styles.smallLogoContainer}>
        <img src={smallLogo} alt="Small Logo" className={styles.smallLogo} />
        <nav className={styles.navMenu}>
          <a href="#values" className={styles.navLink} onClick={(e) => handleNavClick(e, 'values')}>VALUES</a>
          <a href="#services" className={styles.navLink} onClick={(e) => handleNavClick(e, 'services')}>SERVICES</a>
          <a href="#geography" className={styles.navLink} onClick={(e) => handleNavClick(e, 'geography')}>GEOGRAPHY</a>
          <a href="#contacts" className={styles.navLink} onClick={(e) => handleNavClick(e, 'contacts')}>CONTACTS</a>
        </nav>
      </div>
    </div>
  )
}

export default FirstBlock

