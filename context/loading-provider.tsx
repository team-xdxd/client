import { useState } from 'react'
import { LoadingContext } from '../context'

export default ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)

  const loadingValue = {
    isLoading,
    setIsLoading
  }

  return (
    <LoadingContext.Provider value={loadingValue}>
      {children}
    </LoadingContext.Provider>
  )
}