import { addDays, format } from 'date-fns'

const areSameDates = (date1, date2) => {
  return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getYear() === date2.getYear()
}

const getDateKey = (date) => {
  return `${date.getDate()}-${date.getMonth()}-${date.getYear()}`
}

export default {
  areSameDates,
  getDateKey,
  getSpecialDateString: (inputDate) => {
    let specialDate = ''
    const today = new Date()
    // Get difference in days
    const dateDifference = (today - inputDate) / 1000 / 60 / 60 / 24
    if (dateDifference < 1 && dateDifference > -1)
      specialDate = 'Today'
    else if (dateDifference <= -1 && dateDifference > -2)
      specialDate = 'Tomorrow'
    else if (dateDifference < 2 && dateDifference >= 1)
      specialDate = 'Yesterday'

    return specialDate
  },

  processDayItem: (item, mappedItems, Component) => {
    let type
    let socialChannel
    let date
    if (item.itemType === 'campaign') {
      type = item.itemType
      date = item.endDate
    }
    else if (item.itemType === 'project') {
      type = item.type
      date = item.publishDate
      if (type === 'social') {
        socialChannel = item.channel || 'social'
      }
    }
    else {
      type = item.itemType
      date = item.endDate
    }

    if (date) {
      const dayKey = getDateKey(new Date(date))
      let isMultiple
      if (item.startDate) {
        isMultiple = true
        const endDate = new Date(date)
        let iterDate = new Date(item.startDate)
        while (iterDate < endDate) {
          const dateKey = getDateKey(iterDate)
          parseItem(item, iterDate, type, socialChannel, dateKey, mappedItems, isMultiple, Component)
          iterDate = addDays(iterDate, 1)
        }
      }
      parseItem(item, new Date(date), type, socialChannel, dayKey, mappedItems, isMultiple, Component)
    }
  },

  reorderItems: (items, calendarDays) => {
    const newItems = {}
    let currentWeekOrder = {}
    let currentWeek = -1
    calendarDays.forEach(day => {
      if (day.weekDay === 0) {
        currentWeek++
      }
      if (day.weekDay === 0) {
        currentWeekOrder = {}
      }
      const dateKey = getDateKey(day.date)
      const mappedItems = items[dateKey]
      const nextDate = addDays(day.date, 1)
      const nextDateKey = getDateKey(nextDate)
      const nextDayItems = items[nextDateKey]
      if (mappedItems) {
        const newMappedItems = []
        mappedItems.forEach(item => {
          // Det if current week order needs to be preserved
          const currentWeekPosition = currentWeekOrder[item.id]
          if (day.weekDay < 6 && nextDayItems) {
            const isInNextDay = nextDayItems.findIndex(nextItem => nextItem.id === item.id) !== -1

            if (isInNextDay && currentWeekPosition === undefined) {
              currentWeekOrder[item.id] = getAvailablePosition(currentWeekOrder)
              newMappedItems.push({ data: item, currentWeekPosition: currentWeekOrder[item.id], currentWeek })

            } else if (!isInNextDay && currentWeekPosition !== undefined) {
              newMappedItems.push({ data: item, currentWeekPosition, currentWeek })
              currentWeekOrder[item.id] = undefined

            } else {
              newMappedItems.push({ data: item, currentWeekPosition, currentWeek })
            }
          } else newMappedItems.push({ data: item, currentWeekPosition, currentWeek })
        })
        newMappedItems.sort((itema, itemb) => {
          const posA = itema.currentWeekPosition
          const posB = itemb.currentWeekPosition
          if (!itema.currentWeekPosition)
            return -1
          if (!itemb.currentWeekPosition)
            return 1
          if (posA > posB) {
            return 1
          } else if (posA < posB) {
            return -1
          } else return 0
        })
        if (newMappedItems.find(item => item.data.id === '95bb02b0-3324-4718-9d90-18cc3e433a87')) {
          console.log(newMappedItems)
        }

        newItems[dateKey] = newMappedItems
      }
    })
    return newItems
  }
}

const parseItem = (item, date, type, socialChannel, dayKey, mappedItems, isMultiple, Component) => {
  if (!mappedItems[dayKey]) mappedItems[dayKey] = []
  mappedItems[dayKey].push({
    id: item.id,
    Item: () => (
      <Component
        item={item}
        socialChannel={socialChannel}
        type={type}
        isMultiple={isMultiple}
        time={format(date, 'hh:mm aa')}
      />
    )
  })
}

const getAvailablePosition = (currentWeekOrder) => {
  let position
  const orderedWeekPos = Object.keys(currentWeekOrder).sort((keyA, keyB) => {
    if (currentWeekOrder[keyA] > currentWeekOrder[keyB]) {
      return 1
    } else if (currentWeekOrder[keyA] > currentWeekOrder[keyB]) {
      return -1
    } else {
      return 0
    }
  })
  orderedWeekPos.forEach((key, index) => {
    if (currentWeekOrder[key] !== index && !position) {
      position = index
    }
  })

  return position || orderedWeekPos.length
}

