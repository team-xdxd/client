import { useState, useEffect } from 'react'
import styles from './index.module.css'

// Components
import projectApi from '../../../../server-api/project'
import campaingApi from '../../../../server-api/campaign'
import taskApi from '../../../../server-api/task'

const List = () => {

  const [projects, setProjects] = useState()
  const [campaings, setCampaings] = useState()
  const [tasks, setTasks] = useState()

  useEffect(() => {
    getProjects()
    getCampaings()
    getTasks()
  }, [])

  const getProjects = async () => {
    try {
      const { data } = await projectApi.getProjects()
      setProjects(data)
    } catch (err) {
      console.log(err)
      // TODO: Error handling
    }
  }

  const getCampaings = async () => {
    try {
      const { data } = await campaingApi.getCampaigns()
      setCampaings(data)
    } catch (err) {
      console.log(err)
      // TODO: Error handling
    }
  }

  const getTasks = async () => {
    try {
      const { data } = await taskApi.getTasks()
      setTasks(data)
    } catch (err) {
      console.log(err)
      // TODO: Error handling
    }
  }

  return (
    <section>
    </section>
  )
}

export default List
