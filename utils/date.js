import { addDays } from 'date-fns'

export default {
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

  processDayItem: (item, currentDate, mappedItems, Component) => {
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
      const dayNumber = new Date(date).getDate()
      let isMultiple
      if (item.startDate) {
        isMultiple = true
        const endDate = new Date(date)
        let iterDate = new Date(item.startDate)
        while (iterDate.getDate() < endDate.getDate() && iterDate.getDate() <= 31) {
          const dateNumber = iterDate.getDate()
          parseItem(item, iterDate, currentDate, type, socialChannel, dateNumber, mappedItems, isMultiple, Component)
          iterDate = addDays(iterDate, 1)
        }
      }
      parseItem(item, new Date(date), currentDate, type, socialChannel, dayNumber, mappedItems, isMultiple, Component)
    }
  },

  reorderItems: (items, currentDate, calendarDays) => {
    console.log(items)
    console.log(currentDate)
    console.log(calendarDays)
    const newItems = {}
    let currentWeekOrder = {}
    let currentWeek = -1
    calendarDays.forEach(day => {
      if (day.weekDay === 0) {
        currentWeek++
      }
      if (day.date.getMonth() !== currentDate.getMonth()) return
      if (day.weekDay === 0) {
        currentWeekOrder = {}
      }
      const dateNumber = day.date.getDate()
      const mappedItems = items[dateNumber]
      const nextDayItems = items[dateNumber + 1]
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
          if (posA > posB) {
            return 1
          } else if (posA < posB) {
            return -1
          } else return 0
        })
        newItems[dateNumber] = newMappedItems
      }
    })
    return newItems
  }
}

const parseItem = (item, date, currentDate, type, socialChannel, dayNumber, mappedItems, isMultiple, Component) => {
  if (date.getMonth() === currentDate.getMonth()) {
    if (!mappedItems[dayNumber]) mappedItems[dayNumber] = []
    mappedItems[dayNumber].push({
      id: item.id,
      Item: () => (
        <Component
          item={item}
          socialChannel={socialChannel}
          type={type}
          isMultiple={isMultiple}
        />
      )
    })
  }
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