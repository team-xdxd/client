import styles from './section-button.module.css'

const SectionButton = ({ text, onClick = () => { }, disabled = false, active = false, styleType = '' }) => (
  <button
    className={`${styles.container} ${active && styles.active}`}
    type='button'
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
)
export default SectionButton