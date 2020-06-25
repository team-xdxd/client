import styles from './top-bar.module.css'
import { Utilities } from '../../../assets'
import selectOptions from './select-options'

// Components
import SectionButton from '../../common/buttons/section-button'
import NestedSelect from '../../common/inputs/nested-select'
import Select from '../../common/inputs/select'

const TopBar = ({
  activeFilter,
  setActiveFilter,
  activeView,
  setActiveView,
  activeSort,
  setActiveSort,
  additionalFilters,
  setAdditinalFilters
}) => {
  const viewsList = [
    {
      text: 'Folders',
      name: 'folders'
    },
    {
      text: 'All',
      name: 'all'
    },
    {
      text: 'Images',
      name: 'images'
    },
    {
      text: 'Videos',
      name: 'videos'
    },
    {
      text: 'Archived',
      name: 'archived'
    }
  ]

  return (
    <section className={styles.container}>
      <div className={styles.filters}>
        <img src={Utilities.search} />
        {viewsList.map(view => (
          <SectionButton
            key={view.name}
            text={view.text}
            active={activeFilter === view.name}
            onClick={() => setActiveFilter(view.name)}
          />
        ))}
      </div>
      <div className={styles['sec-filters']}>
        <img src={Utilities.gridView} onClick={() => setActiveView('grid')} />
        <img src={Utilities.listView} onClick={() => setActiveView('list')} />
        <div className={styles['multifilter-wrapper']}>

        </div>
        <div className={styles['sort-wrapper']}>
          <Select
            options={selectOptions.sort}
            value={activeSort}
            styleType='filter filter-schedule'
            onChange={setActiveSort}
            placeholder='Sort By'
          />
        </div>
      </div>
    </section>
  )
}

export default TopBar