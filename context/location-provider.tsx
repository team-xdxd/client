import { useState, useEffect } from 'react'
import { LocationContext } from '../context'
import parameterApi from '../server-api/parameter'

export default ({ children }) => {
  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])

  const mapFn = (item) => ({ ...item, label: item.name, value: item.id })

  useEffect(() => {
    loadCountries()
  }, [])

  const loadCountries = async () => {
    try {
      const { data } = await parameterApi.getCountries()
      setCountries(data.map(mapFn))
    } catch (err) {
      console.log(err)
    }
  }

  const loadStates = async (countryId) => {
    try {
      const { data } = await parameterApi.getStates({ countryId })
      setStates(data.map(mapFn))
    } catch (err) {
      console.log(err)
    }
  }

  const loadCities = async (stateId) => {
    try {
      const { data } = await parameterApi.getCities({ stateId })
      setCities(data.map(mapFn))
    } catch (err) {
      console.log(err)
    }
  }

  const locationValue = {
    countries,
    loadCountries,
    states,
    loadStates,
    cities,
    loadCities
  }
  return (
    <LocationContext.Provider value={locationValue}>
      {children}
    </LocationContext.Provider>
  )
}