import { useState, useEffect } from 'react'
import { TeamContext } from '../context'
import toastUtils from '../utils/toast'
import userApi from '../server-api/user'
import teamApi from '../server-api/team'
import planApi from '../server-api/plan'

export default ({ children }) => {
  const [team, setTeam] = useState(null)
  const [plan, setPlan] = useState(null)
  const [teamMembers, setTeamMembers] = useState([])

  const getTeam = async () => {
    try {
      const { data } = await teamApi.getTeam()
      setTeam(data)
    } catch (err) {
      console.log(err)
    }
  }

  const getPlan = async () => {
    try {
      const { data } = await planApi.getPlanDetail()
      setPlan(data)
    } catch (err) {
      console.log(err)
    }
  }

  const patchTeam = async (patchData) => {
    try {
      const { data } = await teamApi.patchTeam(patchData)
      setTeam(data)
      toastUtils.success('Changes saved succesfully')
    } catch (err) {
      console.log(err)
    }
  }

  const getTeamMembers = async () => {
    try {
      const { data } = await userApi.getTeamMembers()
      setTeamMembers(data)
    } catch (err) {
      console.log(err)
    }
  }

  const teamValue = {
    team,
    patchTeam,
    getTeam,
    plan,
    getPlan,
    teamMembers,
    setTeamMembers,
    getTeamMembers
  }
  return (
    <TeamContext.Provider value={teamValue}>
      {children}
    </TeamContext.Provider>
  )
}