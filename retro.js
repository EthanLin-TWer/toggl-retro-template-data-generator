import TogglClient from 'toggl-api'
import Settings from './settings'

const apiToken = Settings.token
const workspace_id = Settings.workspaceId
const since = Settings.since
const until = Settings.until

let toggl = new TogglClient({ apiToken })

toggl.getClients((error, clients) => {
  console.log('----clients----')
  // console.log(clients)

  clients.forEach(client => {
//    toggl.getClientProjects(client.id, true, (error, project) => {
      console.log('----project----')
      // console.log(project)
//    })
  })
})

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

  console.log(reports.data)
})

function getClientData(reports, since, until) {
  let result = []
  
//  result.push(reports.map(report => { report.title.client, report.time }))
  return result
}

function getSummaryData(totalGrand, since, until) {
  let millisPerDay = 60 * 60 * 24 * 1000
  let totalDays = (new Date(until) - new Date(since)) / millisPerDay
  let totalMillis = 60 * 60 * 24 * totalDays * 1000
  let grandPercentage = totalGrand / totalMillis
  return {
    totalGrand, totalDays, grandPercentage,
    grandHoursPerDay: grandPercentage * 24
  }
}
