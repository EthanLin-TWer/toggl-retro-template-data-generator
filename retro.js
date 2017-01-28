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
  console.log(getSummaryData(reports.total_grands, since, until))
  console.log('----^^summary data^^----')

  console.log(getClientData(reports.data, since, until))
  console.log('----^^client data^^----')

  console.log(getProjectsData(reports.data, since, until))
  console.log('----^^projects data^^----')

  console.log(reports.data[0].items)
})

function getProjectsData(reports, since, until) {
  return reports.map(report => {
    let client = report.title.client
    let clientTime = report.time

    return report.items.map(project => {
      let projectTime = project.time
      let clientPercentage = projectTime / clientTime
      let clientHours = clientTime / getTotalMillis(until, since) * 24 
      return {
	client, 
	project: project.title.project,
	time: projectTime,
	percentage: clientPercentage,
	hoursPerDay: clientPercentage * clientHours
      }
    })
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

function getSummaryData(totalGrands, since, until) {
  let grandPercentage = totalGrands / getTotalMillis(until, since)
  return {
    totalGrands, 
    totalDays: totalDays(), 
    grandPercentage,
    grandHoursPerDay: grandPercentage * 24
  }
}
