import { useState, useEffect } from 'react'
import { TeamContext } from '../context'
import userApi from '../server-api/user'

export default ({ children }) => {
  const [teamMembers, setTeamMembers] = useState([])

  const getTeamMembers = async () => {
    try {
      const { data } = await userApi.getTeamMembers()
      setTeamMembers(data)
    } catch (err) {
      console.log(err)
    }
  }

  const assetsValue = {
    teamMembers,
    setTeamMembers,
    getTeamMembers
  }
  return (
    <TeamContext.Provider value={assetsValue}>
      {children}
    </TeamContext.Provider>
  )
}