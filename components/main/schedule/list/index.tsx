import { useState, useEffect } from 'react'
import styles from './index.module.css'

// Components
import projectApi from '../../../../server-api/project'
import campaingApi from '../../../../server-api/campaign'
import taskApi from '../../../../server-api/task'

import ListItem from './list-item'

const List = ({mixedList}) => {
  return (
    <section>
      {mixedList.map((item, index) => (
        <ListItem
          key={index}
          item={item}
        />
      ))}
    </section>
  )
}

export default List
