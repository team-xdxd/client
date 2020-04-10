import styles from './index.module.css'
import Link from 'next/link'

// Components
import OverviewSubHeader from './overview-subheader'
import Banner from './banner'
import Upcoming from './upcoming'
import UpcomingTasks from './upcoming-tasks'

const Overview = () => (
  <>
    <OverviewSubHeader />
    <main className={`${styles.container}`}>
      <section className={styles['first-section']}>
        <Banner />
        {/* TODO: Add Chart in a future milestone */}
        <Upcoming
          type='campaign'
        />
        <Upcoming
          type='project'
        />
      </section>
      <section className={styles['second-section']}>
        <UpcomingTasks />
        {/* TODO: Add help section in a future milestone */}
      </section>
    </main>
  </>
)

export default Overview
