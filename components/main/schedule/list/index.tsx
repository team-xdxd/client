import { useState, useEffect } from 'react'
import styles from './index.module.css'
import { format, addDays, startOfDay, endOfDay } from 'date-fns'

// Components
import ListItem from './list-item'

const List = ({ mixedList, currentDate }) => {

  const [listItems, setListItems] = useState([])
  const [group, setGroup] = useState([])

  useEffect(() => {
    let g = groupByDate()
    setListItems(Object.entries(g))
    setGroup(g)
  }, [mixedList])

  const groupByDate = () => {
    let group = get7DaySubset()?.reduce((r, a) => {
      let date
      if (a.itemType === 'project') {
        date = new Date(a.publishDate)
      } else {
        date = new Date(a.endDate)
      }
      const formattedDate = format(date, 'EEEE d')
      r[formattedDate] = [...r[formattedDate] || [], a];
      return r;
    }, {});
    console.log("group", group);
    return group
  }

  const get7DaySubset = () => {
    const startDate = startOfDay(new Date(currentDate))
    console.log(startDate)
    const limitDate = endOfDay(addDays(new Date(currentDate), 6))
    console.log(limitDate)
    return mixedList.filter(item => {
      if (item.itemType === 'project' && item.publishDate) {
        return new Date(item.publishDate) >= startDate && new Date(item.publishDate) <= limitDate
      } else if (item.endDate) {
        return new Date(item.endDate) >= startDate && new Date(item.endDate) <= limitDate
      } else return false
    })
  }

  return (
    <section>
      {listItems.map(([key, value], index) => (
        <div className={styles.day} key={key}>
          <div className={styles.header}>
            <h4>{key}</h4>
            {index === 0 &&
              <>
                <h4>Status</h4>
                <h4>Type</h4>
                <h4>Time</h4>
                <h4>Owner</h4>
              </>
            }
          </div>
          {value.map((item, index) => <ListItem key={index} item={item} />)}
        </div>
      ))}
      {listItems.length === 0 &&
        <div>No campaigns, projects or tasks for this or the next 7 days</div>
      }
    </section>
  )
}

export default List
