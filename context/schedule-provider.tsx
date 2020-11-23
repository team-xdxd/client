import { useState } from 'react'
import { ScheduleContext } from '../context'

export default ({ children }) => {
  const [newItem, setNewItem] = useState(undefined)

  const scheduleValue = {
    newItem,
    setNewItem
  }

  return (
    <ScheduleContext.Provider value={scheduleValue}>
      {children}
    </ScheduleContext.Provider>
  )
}