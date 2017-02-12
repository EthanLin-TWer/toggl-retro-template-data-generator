import TogglClient from 'toggl-api'
import Argv from 'minimist'
import { Report, Template, TimeService } from './src'
import Settings from './settings'

const argv = Argv(process.argv.slice(2))
const apiToken = Settings.token
const workspace_id = Settings.workspaceId
const since = argv.since || Settings.since 
const until = argv.until || Settings.until 

let toggl = new TogglClient({ apiToken })
let report = new Report(new TimeService())
let template = new Template(since, until)

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

