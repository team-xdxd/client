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
  }
}