import styles from './chart-wrapper.module.css'
import Chart from 'chart.js'
import { useRef, useEffect, useState } from 'react'

const ChartWrapper = ({ chartObj, data }) => {
  const wrapperRef = useRef()
  const ctx = 'chart'

  const [chart, setChart] = useState()

  useEffect(() => {
    if (wrapperRef && chartObj) {
      drawChart()
    }
  }, [chartObj.type])

  useEffect(() => {
    updateChart()
  }, [data])

  const drawChart = () => {
    setChart(new Chart(ctx, { ...chartObj, data }))
  }

  const updateChart = () => {
    if (chart) {
      chart.data = Object.assign({}, data)
      console.log(chart.data)
      chart.update()
    }
  }

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <canvas id="chart" width="400" height="400"></canvas>
    </div>
  )
}

export default ChartWrapper