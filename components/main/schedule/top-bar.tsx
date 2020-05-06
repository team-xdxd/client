import styles from './top-bar.module.css'
import { Utilities } from '../../../assets'
import itemStatus from '../../../resources/data/item-status.json'
import projectTypes from '../../../resources/data/project-types.json'
import { capitalCase } from 'change-case'

// Components
import SectionButton from '../../common/buttons/section-button'
import Button from '../../common/buttons/button'
import Select from '../../common/inputs/select'

const campaignPlaceholder = []
const ownerPlaceholder = []

const typeOptions = [
  'campaigns',
  'tasks',
  ...projectTypes
]

const TopBar = ({ activeView, setActiveView }) => (
  <section className={styles.container}>
    <div className={styles.options}>
      <img src={Utilities.search} />
      <img src={Utilities.print} />
      <SectionButton
        text='List'
        active={activeView === 'list'}
        onClick={() => setActiveView('list')}
      />
      <SectionButton
        text='Week'
        active={activeView === 'week'}
        onClick={() => setActiveView('week')}
      />
      <SectionButton
        text='Month'
        active={activeView === 'month'}
        onClick={() => setActiveView('month')}
      />
      <Button
        text='Today'
        type='button'
        styleType='secondary'
      />
    </div>
    <div className={styles.filters}>
      <div>
        <Select
          options={campaignPlaceholder}
          placeholder='Campaign'
          styleType='filter'
        />
      </div>
      <div>
        <Select
          options={itemStatus.map(status => ({ label: capitalCase(status), value: status }))}
          placeholder='Status'
          styleType='filter'
        />
      </div>
      <div>
        <Select
          options={typeOptions.map(type => ({ value: type, label: capitalCase(type) }))}
          placeholder='Type'
          styleType='filter'
        />
      </div>
      <div>
        <Select
          options={ownerPlaceholder}
          placeholder='Owner'
          styleType='filter'
        />
      </div>
    </div>
  </section>
)

export default TopBar
