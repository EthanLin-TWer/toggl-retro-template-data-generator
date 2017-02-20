import { describe, beforeEach, before, it } from "mocha"
import { expect } from 'chai'
import sinon from 'sinon'
import { Report, TimeService, WeekdayService } from '../../src'

describe('report.js', () => {
  let report
  let feb1st = '2017-02-01'
  let since = '2017-01-14', until = '2017-01-26'
  let response

  beforeEach('', () => {
    report = new Report(new TimeService(), new WeekdayService())
    response = mockReportResponse()
  })

  describe('getSummaryData(total_grand, since, until)', () => {
    it('should call time service to calculate summary data', () => {
      let timeService = new TimeService()
      let weekdayService = new WeekdayService()
      let daysBetween = sinon.spy(timeService, 'daysBetween')
      let millisToHoursAndMins = sinon.spy(timeService, 'millisToHoursAndMinsFormat')
      let toMillis = sinon.spy(timeService, 'toMillis')
      let weekdaysBetween = sinon.spy(weekdayService, 'weekdaysBetween')
      
      report = new Report(timeService, weekdayService)

      let summary = report.getSummaryData(1000 * 60, '2016-01-01', '2016-01-01')

      expect(daysBetween.calledWith('2016-01-01', '2016-01-01')).to.be.true
      expect(millisToHoursAndMins.calledWith(1000 * 60)).to.be.true
      expect(toMillis.calledWith(1)).to.be.true
      expect(weekdaysBetween.calledWith('2016-01-01', '2016-01-01')).to.be.true

      expect(summary.totalGrand).to.equal('0h 1min')
      expect(summary.totalDays).to.equal(1)
      expect(summary.grandPercentage).to.equal('0.07%')
      expect(summary.weekdays).to.equal(1)
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
    let client

    before('', () => {
      client = report.getClientData(response, since, until)
    })

    it('should get three clients', () => {
      expect(client.length).to.equal(3)
    })

    it('should get client title', () => {
      let clients = client.map(each => each.client)
      expect(clients).to.eql(['work', 'tech-programming', 'basic-life'])
    })

    it('should get total spent time', () => {
      let clientsTime = client.map(each => each.time)
      expect(clientsTime).to.eql(['39h 32min', '14h 12min', '135h 9min'])
    })

    it('should get percentage of time spent time during period', () => {
      let spentTimePercentage = client.map(each => each.percentage)
      expect(spentTimePercentage).to.eql(['12.68%', '4.56%', '43.32%'])
    })

    it('should get hours per day spent during period', () => {
      let hoursPerDay = client.map(each => each.hoursPerDay)
      expect(hoursPerDay).to.eql(['3h 2min', '1h 5min', '10h 23min'])
    })

    it('should get correct client data, integrational unit test', () => {
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
    let clients

    before('', () => {
      clients = report.getProjectsData(response, since, until);
    })

    it('should get 3 clients', () => {
      expect(clients.length).to.equal(3)
    })

    it('should get correct number of associated projects', () => {
      let projects = clients.map(client => client.projects).map(s => s.length)

      expect(projects).to.eql([2, 2, 3])
    })

    it('should get information of each client', () => {
      let clientNames = clients.map(project => project.client)
      let clientsTime = clients.map(project => project.time)

      expect(clientNames).to.eql(['work', 'tech-programming', 'basic-life'])
      expect(clientsTime).to.eql(['39h 32min', '14h 12min', '135h 9min'])
    })

    it('should get correct project names', () => {
      let projects = clients.map(client => client.projects)
        
      let workProjects = ['regular-meetings', 'workshops']
      let techProgrammingProjects = ['peak-development', 'project-refactor']
      let basicLifeProjects = ['eating', 'sleeping', 'shower']
      
      expect(projects[0].map(each => each.project)).to.eql(workProjects)
      expect(projects[1].map(each => each.project)).to.eql(techProgrammingProjects)
      expect(projects[2].map(each => each.project)).to.eql(basicLifeProjects)
    })
    
    it('should get spent time of each projects', () => {
      let projects = clients.map(client => client.projects)
      let expected = [
        ['5h 5min',   '2h 42min'],
        ['10h 38min', '3h 12min'],
        ['12h 23min', '69h 14min', '5h 8min']
      ]
      
      expect(projects[0].map(each => each.time)).to.eql(expected[0])
      expect(projects[1].map(each => each.time)).to.eql(expected[1])
      expect(projects[2].map(each => each.time)).to.eql(expected[2])
    })

    it('should get hoursPerDay and percentage data of each projects', () => {
      let projects = clients.map(client => client.projects)
      
      let hoursPerDay = [
        ['0h 23min', '0h 12min'],
        ['0h 49min', '0h 14min'],
        ['0h 57min', '5h 19min', '0h 23min']
      ]
      let timePercentages = [
        ['12.87%', '6.85%'],
        ['74.86%', '22.61%'],
        ['9.16%' , '51.23%', '3.81%']
      ]

      expect(projects[0].map(each => each.hoursPerDay)).to.eql(hoursPerDay[0])
      expect(projects[0].map(each => each.percentage)).to.eql(timePercentages[0])
      
      expect(projects[1].map(each => each.hoursPerDay)).to.eql(hoursPerDay[1])
      expect(projects[1].map(each => each.percentage)).to.eql(timePercentages[1])
      
      expect(projects[2].map(each => each.hoursPerDay)).to.eql(hoursPerDay[2])
      expect(projects[2].map(each => each.percentage)).to.eql(timePercentages[2])
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