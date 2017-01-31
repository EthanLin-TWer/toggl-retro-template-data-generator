import { describe, before, it } from "mocha"
import { expect } from 'chai'
import TogglClient from 'toggl-api'
import Settings from '../settings'

describe('Toggl API', () => {
   describe('toggl.summaryReport()', () => {
      let toggl, responseReport
      before((done) => {
         toggl = new TogglClient({ apiToken: Settings.token })
         let options = {
            grouping: "clients", subgrouping: "projects",
            workspace_id: Settings.workspaceId,
            since: Settings.since, until: Settings.until
         }
         toggl.summaryReport(options, (error, reports) => {
            responseReport = reports
            done()
         })
      })

      it('response should have total_grand as millis and a data array', () => {
         expect(responseReport.total_grand).to.be.a('number')
         expect(responseReport.data).to.be.an('array')
      })

      it('for each client in response.data should have client id, client name, client total time grands and all project data as an \'items\' array', () => {
         responseReport.data.forEach(client => {
            expect(client.id).to.be.a('number')
            expect(client.title.client).to.be.a('string')
            expect(client.time).to.be.a('number')
            expect(client.items).to.be.a('array')
         })
      })

      it('for each project in response.data[x].items should have project name and project total time grands', () => {
         let clientProjects = responseReport.data.map(client => client.items)
         let projects = [].concat.apply([], clientProjects)
         
         projects.forEach(project => {
            expect(project.title.project).to.be.a('string')
            expect(project.time).to.be.a('number')
         })
      })
   })
})