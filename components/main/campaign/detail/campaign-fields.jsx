import styles from './campaign-fields.module.css'
import { GeneralImg } from '../../../../assets'
import DayPicker from 'react-day-picker'
import { format } from 'date-fns'

// Components
import ItemFieldWrapper from '../../../common/item-field-wrapper'


const CampaignFields = ({
  owner,
  endDate,
  setEndDate,
  collaborators,
  setCollaborators,
  description,
  setDescription,
  tags,
  setTags
}) => {

  const [activeInput, setActiveInput] = ''

  const handleDayClick = (day, { selected }) => {
    setEndDate(selected ? undefined : day)
  }

  return (
    <div className={styles.container}>
      <div>
        <ItemFieldWrapper
          title='Owner'
          image={GeneralImg.logo}
        >
          <span>{owner}</span>
        </ItemFieldWrapper>
      </div>
      <div onClick={() => setActiveInput('endDate')}>
        <ItemFieldWrapper
          title='End Date'
          image={GeneralImg.logo}
        >
          <span>{endDate && format(new Date(endDate), 'MMM d, yyyy')}</span>
          {activeInput === 'endDate' &&
            <div>
              <DayPicker
                selectedDays={endDate}
                onDayClick={handleDayClick} />
            </div>
          }
        </ItemFieldWrapper>
      </div>
      <div onClick={() => setActiveInput('collaborators')}>
        <ItemFieldWrapper
          title='Collaborators'
          image={GeneralImg.logo}
        >
          <span>No collaborators</span>
        </ItemFieldWrapper>
      </div>
      <div onClick={() => setActiveInput('tags')}>
        <ItemFieldWrapper
          title='Tags'
          image={GeneralImg.logo}
        >
          <span>{tags.join(', ')}</span>
          {activeInput === 'tags' ?
            <div></div>
            :
            <div></div>
          }
        </ItemFieldWrapper>
      </div>
      <div onClick={() => setActiveInput('description')}>
        <ItemFieldWrapper
          title='Description'
          image={GeneralImg.logo}
        >
          {activeInput === 'description' ?
            <span>{description}</span>
            :
            <input value={description} />
          }
        </ItemFieldWrapper>
      </div>
    </div>
  )
}

export default CampaignFields