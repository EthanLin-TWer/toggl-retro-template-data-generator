import { describe, before, after, it } from "mocha"
import { expect } from 'chai'
import argv from 'minimist'
import TogglClient from 'toggl-api'
import Settings from '../settings.spec'

describe('Toggl API: toggl.summaryReport(options, callback(err, reports))', () => {
  let toggl, responseReport
  before((done) => {
    let apiToken = Settings.token || argv(process.argv.slice(2)).apiToken
    let options = {
      grouping: "clients", subgrouping: "projects",
      workspace_id: Settings.workspaceId,
      since: Settings.since, until: Settings.until
    }

    toggl = new TogglClient({ apiToken })
    toggl.summaryReport(options, (error, reports) => {
      responseReport = reports
      done()
    })
  })

  describe('contract testing: data format should be the same as documented', () => {
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
      let projects = [].concat.apply([], clientProjects) // black magic, flats a two dimension array

      projects.forEach(project => {
        expect(project.title.project).to.be.a('string')
        expect(project.time).to.be.a('number')
      })
    })

  })
  
  describe('logic testing: data should meet business logic for use', () => {
    it('sum of each client time should equal to the returned total grands', () => {
      let totalGrand = responseReport.total_grand
      let totalClientTime = responseReport.data.map(client => client.time)
        .reduce((sum, time) => sum + time, 0)
      
      expect(totalClientTime).to.equal(totalGrand)
    })
    
    it('sum of each project time should equal to their belonged client time', () => {
      let clients = responseReport.data
      clients.forEach(client => {
        let totalProjectTime = client.items.map(project => project.time)
          .reduce((sum, each) => sum + each, 0)
        
        expect(totalProjectTime).to.equal(client.time)
      })
    })
  })
  
  afterEach('log response report on failed case', () => {
    if (this.currentTest.state === 'failed') {
      console.log(this)
      console.error(`Failed response: \n${JSON.stringify(responseReport, null, '  ')}`)
    }
  })

})