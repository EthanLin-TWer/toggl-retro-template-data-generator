import { describe, before, it } from "mocha"
import { expect } from 'chai'
import TogglClient from 'toggl-api'
import Settings from '../settings'

describe('toggl api', () => {
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

      it('response report should have correct root structure', () => {
         expect(responseReport.total_grand).to.be.a('number')
         expect(responseReport.data).to.be.an('array')
      })
      
      it('response report.data should have all client entries as an array', () => {
         responseReport.data.forEach(client => {
            expect(client.id).to.be.a('number')
            expect(client.title.client).to.be.a('string')
            expect(client.time).to.be.a('number')
            expect(client.items).to.be.a('array')
         })
      })
      
      it('for each client in response report.data should have an \'items\' array containing all projects information', () => {
         let clientProjects = responseReport.data.map(client => client.items)
         clientProjects.forEach(clientProjects => {
            expect(clientProjects).to.be.an('array')
            
            clientProjects.forEach(project => {
               expect(project.title.project).to.be.a('string')
               expect(project.time).to.be.a('number')
            })
         })
      })
   })
})