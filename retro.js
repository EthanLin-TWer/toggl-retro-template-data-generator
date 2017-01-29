import TogglClient from 'toggl-api'
import { Report, Template } from './src'
import Settings from './settings'

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
  let summary = report.getSummaryData(reports.total_grand, since, until)
  let clientsData = report.getClientData(reports.data, since, until)
  let projectsData = report.getProjectsData(reports.data, since, until)

  let markdown = template.generateMarkdown(summary, clientsData, projectsData)
  console.log(markdown)
})

