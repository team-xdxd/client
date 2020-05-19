import { useState, useEffect } from 'react'
import styles from './index.module.css'

// Components
import projectApi from '../../../../server-api/project'
import campaingApi from '../../../../server-api/campaign'
import taskApi from '../../../../server-api/task'

import ListItem from './list-item'

const List = ({mixedList}) => {

  const [listItems, setListItems] = useState([])
const [group, setGroup] = useState([])
  useEffect(() => {
    let g= groupByDate()
    setListItems(Object.entries(g))
    setGroup(g)
  }, [])

  const groupByDate = () => {
    let group = mixedList?.reduce((r, a) => {
      if (a.itemType === 'project') {
        r[a.publishDate] = [...r[a.publishDate] || [], a];  
      } else{
        r[a.endDate] = [...r[a.endDate] || [], a];  
      }
      return r;
     }, {});
     console.log("group", group);
     return group
  }

  return (
    <section>
      {listItems.map(([key, value]) => (
        <div key={key}>
          {key}
          {(Object.keys(value[0]).map(el=>{
            console.log(el)
            return (el && (el === 'users')
            ? null
            :value[0][el]? value[0][el].toString() :null
            )}
          )          )
          }
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      ))}
    </section>
  )
}

export default List
