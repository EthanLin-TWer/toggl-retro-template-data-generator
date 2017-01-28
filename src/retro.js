import TogglClient from 'toggl-api'
import { Report } from './report'
import { Template } from './template'
import Settings from '../settings'

const apiToken = Settings.token
const workspace_id = Settings.workspaceId
const since = Settings.since
const until = Settings.until

let toggl = new TogglClient({ apiToken })
let report = new Report()
let template = new Template()

toggl.summaryReport({
  user_agent: "nodejs_client",
  grouping: "clients",
  subgrouping: "projects",
  workspace_id, since, until
}, (error, reports) => {
  console.log(report.getSummaryData(reports.total_grand, since, until))
  console.log('----^^summary data^^----')

  console.log(report.getClientData(reports.data, since, until))
  console.log('----^^client data^^----')

  console.log(report.getProjectsData(reports.data, since, until))
  console.log('----^^projects data^^----')

})

