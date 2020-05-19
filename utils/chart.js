const chartUtils = {
  buildDoughnutBase: (half) => {
    let baseChart = {
      type: 'doughnut',
      data: [],
      options: {
        events: [],
        responsive: true,
        legend: {
          position: 'top',
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    }

    if (half) {
      baseChart.options.circumference = Math.PI
      baseChart.options.rotation = -Math.PI
    }

    return baseChart
  }
}

export default chartUtils