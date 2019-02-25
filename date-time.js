const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// 格式化时间
function xxDate (type) {
  const dateObj = new Date()
  let [year, month, day] = [dateObj.getFullYear(), dateObj.getMonth() + 1, dateObj.getDate()]
  // 时分秒
  let [hour, minute, second] = [dateObj.getHours(), dateObj.getMinutes() + 1, dateObj.getSeconds()]
  const time = [hour, minute, second].map(formatNumber).join(':')
  // 上一周
  let msec = ((dateObj.getHours() * 3600) + (dateObj.getMinutes() * 60) + dateObj.getSeconds()) * 1000
  let lastWeekObj = new Date(Date.now() - 7 * 8.64e7 - msec)
  let [year1, month1, day1] = [lastWeekObj.getFullYear(), lastWeekObj.getMonth() + 1, lastWeekObj.getDate()]
  // 昨天
  let yesterdayObj = new Date(Date.now() - 1 * 8.64e7 - msec)
  let [year2, month2, day2] = [yesterdayObj.getFullYear(), yesterdayObj.getMonth() + 1, yesterdayObj.getDate()]

  // 今天、本月第一天、上一周、昨天
  const today = [year, month, day].map(formatNumber).join('-')
  const firstDay = [year, month, '01'].map(formatNumber).join('-')
  const lastWeek = [year1, month1, day1].map(formatNumber).join('-')
  const yesterday = [year2, month2, day2].map(formatNumber).join('-')
  // 年月日 或 年月日时分秒
  if (type === 'time') {
    return {
      today: `${today} ${time}`,
      firstDay: `${firstDay} 00:00:00`,
      lastWeek: `${lastWeek} 00:00:00`,
      yesterday: `${yesterday} ${time}`
    }
  } else {
    return { today, firstDay, lastWeek, yesterday }
  }
}
function xxmonth () {
  let dateObj = new Date()
  let [year, month] = [dateObj.getFullYear(), dateObj.getMonth() + 1]
  if (month <= 9) month = `0${month}`
  dateObj.setDate(0)
  let [lastYear, lastMonth] = [dateObj.getFullYear(), dateObj.getMonth() + 1]
  if (lastMonth <= 9) lastMonth = `0${lastMonth}`
  return {
    currentMonth: `${year}-${month}`,
    lastMonth: `${lastYear}-${lastMonth}`
  }
}

function date (Vue) {
  // 年-月-日 today、yesterday、lastWeek、firstDay
  Vue.prototype.$xxDate = xxDate('data')
  // 年-月-日 时：分：秒 today、yesterday、lastWeek、firstDay
  Vue.prototype.$dataTime = xxDate('time')
  // 年-月 currentMonth、lastMonth
  Vue.prototype.$xxmonth = xxmonth()
}

export default date
