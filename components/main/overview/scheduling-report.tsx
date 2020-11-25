import styles from './scheduling-report.module.css'
import chartUtils from '../../../utils/chart'
import { useState, useEffect } from 'react'
import statusData from '../../../resources/data/item-status.json'

import campaignApi from '../../../server-api/campaign'
import projectApi from '../../../server-api/project'
import taskApi from '../../../server-api/task'
import { capitalCase } from 'change-case'
import { format, startOfMonth, endOfMonth, addMonths } from 'date-fns'

// Components
import ChartWrapper from '../../common/charts/chart-wrapper'
import Select from '../../common/inputs/select'

const availableMonths = []

let currentDate = new Date()

for (let i = 0; i < 9; i++) {
  availableMonths.push(currentDate)
  currentDate = addMonths(currentDate, 1)
}

const itemStatuses = statusData.filter(status => status !== 'past_due')

const SchedulingReport = () => {

  const [totals, setTotals] = useState({})
  const [currentDate, setCurrentDate] = useState(new Date())
  const [data, setData] = useState()

  useEffect(() => {
    calcTotals()
  }, [currentDate])

  // TODO: due to time constrants, the aggregation was done on the frontend. This needs to be done on the backend
  const calcTotals = async () => {
    try {
      const startOfMonthDate = startOfMonth(currentDate)
      const endOfMonthDate = endOfMonth(currentDate)
      const filterObj = {
        startOfMonth: startOfMonthDate.toISOString(),
        endOfMonth: endOfMonthDate.toISOString()
      }

      const campaignResponse = await campaignApi.getCampaigns(filterObj)
      const campaignsData = campaignResponse.data

      const projectResponse = await projectApi.getProjects(filterObj)
      const projectsData = projectResponse.data

      const taskResponse = await taskApi.getTasks(filterObj)
      const tasksData = taskResponse.data

      filterAndCompute(startOfMonthDate, endOfMonthDate, campaignsData, projectsData, tasksData)

    } catch (err) {
      // TODO: Handle this error
      console.log(err)
    }
  }


  const filterAndCompute = (startDate, endDate, campaignsData, projectsData, tasksData) => {
    const totalsObj = {}
    let totalCount = 0
    const isInDateRange = (date) => {
      const compDate = new Date(date)
      return compDate >= startDate && compDate <= endDate
    }
    itemStatuses.forEach(status => {
      // const filteredCampaignsLength = campaignsData.filter(campaign => campaign.status === status && isInDateRange(campaign.endDate)).length
      const filteredProjectsLength = projectsData.filter(project => project.status === status && isInDateRange(project.publishDate)).length
      const filteredTasksLength = tasksData.filter(task => task.status === status && isInDateRange(task.endDate)).length
      // const currentTotal = filteredCampaignsLength + filteredProjectsLength + filteredTasksLength
      const currentTotal = filteredProjectsLength + filteredTasksLength
      totalCount += currentTotal
      totalsObj[status] = { total: currentTotal }
    })

    // Get percentages
    itemStatuses.forEach(status => {
      totalsObj[status].percent = totalCount > 0 ? (totalsObj[status].total / totalCount * 100).toFixed() : 0
    })

    setTotals(totalsObj)

    const newDataObj = {
      datasets: [{
        backgroundColor: [
          '#800356',
          '#ff7438',
          '#ffb638',
          // '#fa373d'
        ],
        data: itemStatuses.map(status => totalsObj[status].total)
      }],
      labels: []
    }
    setData(newDataObj)
  }

  const chartObj = chartUtils.buildDoughnutBase(true)

  const Legend = ({ status }) => (
    <div className={styles.legend}>
      <span className={`${styles['status-dot']} ${styles[status]}`}>
      </span>
      <span>
        {capitalCase(status)}
      </span>
    </div>
  )

  const AggregatedValue = ({ status }) => (
    <div className={styles['aggregated-container']}>
      <div className={styles.percent}>
        {totals[status] ? `${totals[status].percent}%` : 0}
      </div>
      <div className={styles.total}>
        {totals[status] ? totals[status].total : 0}
      </div>
      <div className={styles['agg-status']}>{capitalCase(status)}</div>
    </div>
  )

  return (
    <div className={styles.container}>
      <h4>Scheduling Per Month</h4>
      <div className={styles['content-container']}>
        <div className={styles.heading}>
          <ul className={styles.legends}>
            {itemStatuses.map((status, index) =>
              <Legend
                key={index}
                status={status}
              />)}
          </ul>
          <div className={styles.month}>
            <Select
              value={{ label: format(currentDate, 'MMMM yyyy'), value: currentDate }}
              options={availableMonths.map(monthDate => ({ label: format(monthDate, 'MMMM yyyy'), value: monthDate }))}
              placeholder='Month'
              styleType='filter'
              onChange={(selected) => setCurrentDate(selected.value)}
            />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles['chart-wrapper']}>
            <div className={styles.chart}>
              {data &&
                <ChartWrapper
                  chartObj={chartObj}
                  data={data}
                />
              }
            </div>
          </div>
          <ul className={styles.totals}>
            {itemStatuses.map((status, index) =>
              <AggregatedValue
                key={index}
                status={status}
              />)}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SchedulingReport