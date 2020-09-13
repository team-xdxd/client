import styles from './data-usage.module.css'
import filesize from 'filesize'
import { Line } from 'rc-progress'

const DataUsage = ({ usage, limitBytes, limit }) => {
  const percentage = usage / limitBytes * 100
  return (
    <div className={styles.container}>
      <div>
        Using <span className={styles.bold}>{`${filesize(usage).replace(' ', '')}`}</span> out of <span className={styles.bold}>{`${limit}`}</span>
      </div>
      <div className={styles.bar}>
        <Line
          percent={percentage}
          strokeWidth="5"
          trailWidth="5"
          strokeColor={'#10bda5'}
          trailColor={'#f6efe4'}
          strokeLinecap="square"
        />
      </div>
    </div >
  )
}

export default DataUsage