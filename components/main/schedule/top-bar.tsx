import styles from './top-bar.module.css'
import { Utilities } from '../../../assets'
import itemStatus from '../../../resources/data/item-status.json'
import projectTypes from '../../../resources/data/project-types.json'
import { capitalCase } from 'change-case'
import { TeamContext, UserContext } from '../../../context'
import { useContext, useEffect, useRef } from 'react'

import { CALENDAR_PRINT } from '../../../constants/permissions'

// Components
import SectionButton from '../../common/buttons/section-button'
import Button from '../../common/buttons/button'
import IconClickable from '../../common/buttons/icon-clickable'
import FiltersSelect from '../../common/inputs/filters-select'

const typeOptions = [
  'campaigns',
  'tasks',
  ...projectTypes
]

const TopBar = ({ activeView, setActiveView, setCurrentDate, filters, setFilters, allCampaigns, setSearchVisible }) => {

  const { getTeamMembers, teamMembers } = useContext(TeamContext)

  const { hasPermission } = useContext(UserContext)

  useEffect(() => {
    getTeamMembers()
  }, [])

  const filtersRef = useRef(null)

  const toggleHamurgerList = () => {
    const classType = `visible-block`
    const { current } = filtersRef
    if (current?.classList.contains(classType)) current.classList.remove(classType)
    else current.classList.add(classType)
  }

  return (
    <section className={styles.container}>
      <div className={styles.options}>
        <img src={Utilities.search} onClick={() => setSearchVisible(true)} />
        {hasPermission([CALENDAR_PRINT]) && <img src={Utilities.print} onClick={() => window.print()} />}
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
          onClick={() => setCurrentDate(new Date())}
          styleTypes={[styles['last-button']]}
        />
      </div>

      <IconClickable src={Utilities.filter} additionalClass={styles.filter} onClick={toggleHamurgerList}/>
      <div className={styles.filters} ref={filtersRef}>
        <div>
          <FiltersSelect
            options={allCampaigns.map(campaign => ({ label: campaign.name, value: campaign.id }))}
            placeholder='Campaign'
            styleType='filter filter-schedule'
            onChange={(selected) => setFilters({ ...filters, campaign: selected })}
            value={filters.campaign}
            isClearable={true}
          />
        </div>
        <div>
          <FiltersSelect
            options={itemStatus.map(status => ({ label: capitalCase(status), value: status }))}
            placeholder='Status'
            styleType='filter filter-schedule'
            onChange={(selected) => setFilters({ ...filters, status: selected })}
            value={filters.status}
            isClearable={true}
          />
        </div>
        <div>
          <FiltersSelect
            options={typeOptions.map(type => ({ label: capitalCase(type), value: type }))}
            placeholder='Type'
            styleType='filter filter-schedule'
            onChange={(selected) => setFilters({ ...filters, type: selected })}
            value={filters.type}
            isClearable={true}
          />
        </div>
        <div>
          <FiltersSelect
            options={teamMembers.map(member => ({ label: member.name, value: member.id }))}
            placeholder='Owner'
            styleType='filter filter-schedule'
            onChange={(selected) => setFilters({ ...filters, member: selected })}
            value={filters.member}
            isClearable={true}
          />
        </div>
      </div>
    </section>
  )
}

export default TopBar
