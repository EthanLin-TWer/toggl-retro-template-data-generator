import TogglClient from 'toggl-api'
import Settings from '../settings'

const apiToken = Settings.token
const workspace_id = Settings.workspaceId
const since = Settings.since
const until = Settings.until

let toggl = new TogglClient({ apiToken })

toggl.summaryReport({
  user_agent: "nodejs_client",
  grouping: "clients",
  subgrouping: "projects",
  workspace_id, since, until
}, (error, reports) => {
  console.log(getSummaryData(reports.total_grand, since, until))
  console.log('----^^summary data^^----')

  console.log(getClientData(reports.data, since, until))
  console.log('----^^client data^^----')

  console.log(getProjectsData(reports.data, since, until))
  console.log('----^^projects data^^----')

})

function getProjectsData(reports, since, until) {
  return reports.map(report => {
    let client = report.title.client
    let clientTime = report.time

    let projects = report.items.map(project => {
      let projectTime = project.time
      let clientPercentage = projectTime / clientTime
      let clientHours = clientTime / getTotalMillis(until, since) * 24
      return {
        project: project.title.project,
	time: projectTime, 
	percentage: clientPercentage,
	hoursPerday: clientPercentage * clientHours
      }
    })

    return {
      client, 
      time: clientTime, 
      projects
    }
  })
}

function getClientData(reports, since, until) {
  
  return reports.map(report => { 
    let { title, time } = report
    let percentage = time / getTotalMillis(until, since)
    return {
      client: title.client, 
      time, percentage,
      hoursPerDay: percentage * 24
    }
  })
}

function getTotalMillis(until, since) {
  return millisPerDay() * totalDays(until, since)
}

function totalDays(until, since) {
  return (new Date(until) - new Date(since)) / millisPerDay()
}

function getHours(until, since) {
  return totalDays(until, since) * 24 
}

function millisPerDay() {
  return 60 * 60 * 24 * 1000
}

function getSummaryData(totalGrand, since, until) {
  let grandPercentage = totalGrand / getTotalMillis(until, since)
  return {
    totalGrand, 
    totalDays: totalDays(until, since), 
    grandPercentage,
    grandHoursPerDay: grandPercentage * 24
  }
}
