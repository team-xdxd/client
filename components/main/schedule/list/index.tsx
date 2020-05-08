import { useState, useEffect } from 'react'
import styles from './index.module.css'

// Components
import projectApi from '../../../../server-api/project'
import campaingApi from '../../../../server-api/campaign'
import taskApi from '../../../../server-api/task'

import ListItem from './list-item'

const List = ({mixedList}) => {

  useEffect(() => {
    groupByDate()
  }, [])

  const groupByDate = () => {
    let group = mixedList!.reduce((r, a) => {
      console.log("a", a);
      console.log('r', r);
      if (a.itemType === 'project') {
        r[a.publishDate] = [...r[a.publishDate] || [], a];  
      } else{
        r[a.endDate] = [...r[a.endDate] || [], a];  
      }
      return r;
     }, {});
     console.log("group", group);
  }

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
