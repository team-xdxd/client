import styles from './top-bar.module.css'
import { useEffect, useState } from 'react'
import { Utilities } from '../../../assets'
import selectOptions from './select-options'
import campaignApi from '../../../server-api/campaign'
import tagApi from '../../../server-api/tag'

// Components
import SectionButton from '../../common/buttons/section-button'
import NestedSelect from '../../common/inputs/nested-select'
import Select from '../../common/inputs/select'

const TopBar = ({
  activeSortFilter,
  setActiveSortFilter,
  activeView,
  setActiveView,
  activeFolder
}) => {

  const [campaignsFilter, setCampaignsFilter] = useState([])
  const [tagsFilter, setTagsFilter] = useState([])

  useEffect(() => {
    getCampaignsTagsFilters()
  }, [])

  const getCampaignsTagsFilters = async () => {
    try {
      const selectValueMapFn = item => ({
        label: item.name,
        value: item.id
      })
      const campaingsResponse = await campaignApi.getCampaigns()
      setCampaignsFilter(campaingsResponse.data.map(selectValueMapFn))
      const tagsResponse = await tagApi.getTags()
      setTagsFilter(tagsResponse.data.map(selectValueMapFn))
    } catch (err) {
      console.log(err)
      // Handle this error
    }
  }

  const setSortFilterValue = (key, value) => {
    setActiveSortFilter({
      ...activeSortFilter,
      [key]: value
    })
  }

  const applyFilters = (selectData) => {
    setActiveSortFilter({
      ...activeSortFilter,
      filterCampaigns: selectData[0],
      filterTags: selectData[1],
    })
  }

  return (
    <section className={styles.container}>
      <div className={styles.filters}>
        <img src={Utilities.search} />
        {selectOptions.views.map(view => (
          <>
            {(!activeFolder || !view.ommitFolder) &&
              <SectionButton
                key={view.name}
                text={view.text}
                active={activeSortFilter.mainFilter === view.name}
                onClick={() => setSortFilterValue('mainFilter', view.name)}
              />
            }
          </>
        ))}
      </div>
      <div className={styles['sec-filters']}>
        <img src={Utilities.gridView} onClick={() => setActiveView('grid')} />
        <img src={Utilities.listView} onClick={() => setActiveView('list')} />
        <div className={styles['nested-wrapper']}>
          <NestedSelect
            selectList={[
              {
                options: campaignsFilter,
                placeholder: 'Campaigns'
              },
              {
                options: tagsFilter,
                placeholder: 'Tags'
              }
            ]}
            onApplyFilters={applyFilters}
          />
        </div>
        <div className={styles['sort-wrapper']}>
          <Select
            options={selectOptions.sort}
            value={activeSortFilter.sort}
            styleType='filter filter-schedule'
            onChange={(selected) => setSortFilterValue('sort', selected)}
            placeholder='Sort By'
          />
        </div>
      </div>
    </section >
  )
}

export default TopBar