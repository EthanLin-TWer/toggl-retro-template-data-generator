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
  workspace_id: workspace_id,
  since: since,
  until: until
}, (error, reports) => {
  let totalGrand = reports.total_grand
  let totalDays = new Date(until) - new Date(since)
  let totalMillis = 60 * 60 * 24 * 12 * 1000
  let registrationPercentage = totalGrand / totalMillis
  let registrationHoursPerDay = totalGrand / totalDays * 24

  console.log(reports.data)
})
