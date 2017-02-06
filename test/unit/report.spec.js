import { describe, beforeEach, it } from "mocha"
import { expect } from 'chai'
import sinon from 'sinon'
import { Report, TimeService } from '../../src'

describe('report.js', () => {
  let report
  let feb1st = '2017-02-01'
  let since = '2017-01-14', until = '2017-01-26'
  let response
  
  beforeEach('', () => {
    report = new Report(new TimeService())
    response = mockReportResponse()
  })

  describe('getSummaryData(total_grand, since, until)', () => {
    it('should call time service to calculate summary data', () => {
      let timeService = new TimeService()
      let daysBetween = sinon.spy(timeService, 'daysBetween')
      let millisToHoursAndMins = sinon.spy(timeService, 'millisToHoursAndMinsFormat')
      let toMillis = sinon.spy(timeService, 'toMillis')
      report = new Report(timeService)

      let summary = report.getSummaryData(1000 * 60, '2016-01-01', '2016-01-01')

      expect(daysBetween.calledWith('2016-01-01', '2016-01-01')).to.be.true
      expect(millisToHoursAndMins.calledWith(1000 * 60)).to.be.true
      expect(toMillis.calledWith(1)).to.be.true

      expect(summary.totalGrand).to.equal('0h 1min')
      expect(summary.totalDays).to.equal(1)
      expect(summary.grandPercentage).to.equal('0.07%')
    })

    it('should get correct summary data, integration-unit test', () => {
      let summary = report.getSummaryData(1006076304, since, until)

      expect(summary.totalGrand).to.equal('279h 27min')
      expect(summary.totalDays).to.equal(13)
      expect(summary.grandPercentage).to.equal('89.57%')
      expect(summary.grandHoursPerDay).to.equal('21h 29min')
    })
    
    describe('.grandPercentage field', () => {
      it('should return 50.00% when total grand is 12h in one day', () => {
        let summary = report.getSummaryData(12 * 60 * 60 * 1000, feb1st, feb1st)
        expect(summary.totalGrand).to.equal('12h 0min')
        expect(summary.totalDays).to.equal(1)
        expect(summary.grandPercentage).to.equal('50.00%')
      })

      it('should return 100.00% when total grand is 24h in one day', () => {
        let summary = report.getSummaryData(24 * 60 * 60 * 1000, feb1st, feb1st)
        expect(summary.grandPercentage).to.equal('100.00%')
      })

      it('should return 83.33% when total grand is 20h in one day', () => {
        let summary = report.getSummaryData(20 * 60 * 60 * 1000, feb1st, feb1st)
        expect(summary.grandPercentage).to.equal('83.33%')
      })

      it('should return 97.92% when total grand is 23.5h in one day', () => {
        let summary = report.getSummaryData(23.5 * 60 * 60 * 1000, feb1st, feb1st)
        expect(summary.grandPercentage).to.equal('97.92%')
      })

      it('should return 26.04% when total grand is 6.25h in one day', () => {
        let summary = report.getSummaryData(6.25 * 60 * 60 * 1000, feb1st, feb1st)
        expect(summary.grandPercentage).to.equal('26.04%')
      })

      it('should return 0.00% when total grand is 0 millis', () => {
        let summary = report.getSummaryData(0, feb1st, feb1st)
        expect(summary.grandPercentage).to.equal('0.00%')
      })
    })

    describe('.grandHoursPerDay field', () => {
      it('should return 22h 0min when total grand is 22h in one day', () => {
        let summary = report.getSummaryData(22 * 60 * 60 * 1000, feb1st, feb1st)
        expect(summary.grandHoursPerDay).to.equal('22h 0min')
      })

      it('should return 11h 0min when total grand is 22h in two days', () => {
        let summary = report.getSummaryData(22 * 60 * 60 * 1000, feb1st, '2017-02-02')
        expect(summary.grandHoursPerDay).to.equal('11h 0min')
      })

      it('should return 6h 50min when total grand is 27.34h in 4 days', () => {
        let summary = report.getSummaryData(27.34 * 60 * 60 * 1000, feb1st, '2017-02-04')
        expect(summary.grandHoursPerDay).to.equal('6h 50min')
      })
      
      it('should return 0h 28min when total grand is 6.2h in 13 days', () => {
        let summary = report.getSummaryData(6.2 * 60 * 60 * 1000, since, until)
        expect(summary.grandHoursPerDay).to.equal('0h 28min')
      })
    })
  })

  describe('getClientData(reports, since, until)', () => {
    it('should get three clients', () => {
      let client = report.getClientData(response, since, until)
      expect(client.length).to.equal(3)
    })  
    
    it('should get client title', () => {
      let clients = report.getClientData(response, since, until)
        .map(each => each.client)
      expect(clients).to.eql(['work', 'tech-programming', 'basic-life'])
    })
    
    it('should get total spent time', () => {
      let clients = report.getClientData(response, since, until).map(each => each.time)
      expect(clients).to.eql(['39h 32min', '14h 12min', '135h 9min'])
    })
    
    it('should get percentage of time spent time during period', () => {
      let clients = report.getClientData(response, since, until).map(each => each.percentage)
      expect(clients).to.eql(['12.68%', '4.56%', '43.32%'])
    })
    
    it('should get hours per day spent during period', () => {
      let clients = report.getClientData(response, since, until).map(each => each.hoursPerDay)
      expect(clients).to.eql(['3h 2min', '1h 5min', '10h 23min'])
    })

    it('should get correct client data, integrational unit test', () => {
      let client = report.getClientData(response, since, until)

      expect(client.length).to.equal(3)
      expect(client[0]).to.deep.equal({
        client: 'work', time: '39h 32min',
        percentage: '12.68%', hoursPerDay: '3h 2min'
      })
      expect(client[1]).to.deep.equal({
        client: 'tech-programming', time: '14h 12min',
        percentage: '4.56%', hoursPerDay: '1h 5min'
      })
      expect(client[2]).to.deep.equal({
        client: 'basic-life', time: '135h 9min',
        percentage: '43.32%', hoursPerDay: '10h 23min'
      })
    })

  })
  
  describe('getProjectsData(reports, since, until)', () => {
    it('should get three clients with several associated projects', () => {
      let projects = report.getProjectsData(response, since, until)
      let subProjects = projects.map(project => project.projects).map(s => s.length)
      
      expect(projects.length).to.equal(3)
      expect(subProjects).to.eql([2, 2, 3])
    })
    
    it('should get information of each client', () => {
      let projects = report.getProjectsData(response, since, until)
      let clients = projects.map(project => project.client)
      let clientTime = projects.map(project => project.time)
      
      expect(clients).to.eql(['work', 'tech-programming', 'basic-life'])
      expect(clientTime).to.eql(['39h 32min', '14h 12min', '135h 9min'])
    })
  })
  
  describe('real data testing', () => {
    
    it.skip('should get correct projects data when method getProjectsData() is called', () => {
      let projects = report.getProjectsData(response, since, until);

      expect(projects.length).to.equal(3)
      expect(projects[0]).to.deep.equal({
        client: 'work', time: '39h 33min',
        projects: [{
          project: 'regular-meetings', time: '5h 6min',
          hoursPerDay: '0h 26min', percentage: '12.87%'
        }, {
          project: 'workshops', time: '2h 43min',
          hoursPerDay: '0h 14min', percentage: '6.85%'
        }]
      })
      expect(projects[1]).to.deep.equal({
        client: 'tech-programming', time: '14h 13min',
        projects: [{
          project: 'peak-development', time: '10h 39min',
          hoursPerDay: '0h 54min', percentage: '74.86%'
        }, {
          project: 'project-refactor', time: '3h 13min',
          hoursPerDay: '0h 17min', percentage: '22.61%'
        }]
      })
    })

  })
  
  let mockReportResponse = () => {
    return [
      {
        id: 19673694, title: { client: 'work' }, time: 142375304,
        items: [
          { title: { project: 'regular-meetings' }, time: 18327000 },
          { title: { project: 'workshops' }, time: 9750000 }
        ]
      },
      {
        id: 19673695, title: { client: 'tech-programming' }, time: 51178000,
        items: [
          { title: { project: 'peak-development' }, time: 38312000 },
          { title: { project: 'project-refactor' }, time: 11571000 }
        ]
      },
      {
        id: 19673693, title: { client: 'basic-life' }, time: 486582000,
        items: [
          { title: { project: 'eating' }, time: 44589000 },
          { title: { project: 'sleeping' }, time: 249265000 },
          { title: { project: 'shower' }, time: 18523000 }
        ]
      }

    ]
  }

})