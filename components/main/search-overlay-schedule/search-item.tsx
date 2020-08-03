import styles from './search-item.module.css'
import Router from 'next/router'
import { ProjectType, ProjectTypeChannel, ProjectTypes } from '../../../assets'
import { capitalCase } from 'change-case'
import { format } from 'date-fns'
import Highlighter from "react-highlight-words"

const getItemDateKey = (item) => {
  switch (item.itemType) {
    case 'campaign':
      return 'endDate'
    case 'project':
      return 'publishDate'
    case 'task':
      return 'endDate'
    default:
      return
  }
}

// Components
import Type from '../../common/misc/type'

const SearchItem = ({ item, term }) => {
  const dateKey = getItemDateKey(item)
  const date = item[dateKey]

  return (
    <li
      className={'search-item'}
      onClick={() => Router.replace(`/main/${item.itemType}s/${item.id}`)}>
      <div className={'search-name'}>
        <Highlighter
          highlightClassName={'search-highlight'}
          searchWords={[term]}
          autoEscape={true}
          textToHighlight={item.name}
        />
      </div>
      <div className={'search-type'}>
        <Type
          item={item}
        />
      </div>
      <div className={'search-date'}>
        {date && format(new Date(date), 'EEE d yyyy, MMM')}
      </div>
      <div className={'search-time'}>
        {date && format(new Date(date), 'hh:mm a')}
      </div>
    </li>
  )
}

export default SearchItem

