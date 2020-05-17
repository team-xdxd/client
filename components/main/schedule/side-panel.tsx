import styles from './side-panel.module.css'

// Components
import CalendarInput from './common/calendar-input'

const SidePanel = ({ currentDate, setCurrentDate }) => (
  <section>
    <CalendarInput
      currentDate={currentDate}
      setCurrentDate={setCurrentDate}
    />
  </section>
)

export default SidePanel
