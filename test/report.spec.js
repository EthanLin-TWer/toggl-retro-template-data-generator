import { describe, beforeEach, it } from "mocha"
import { expect } from 'chai'
import { Report } from '../src/report'

describe('report.js', () => {
   let report
   let since = '2017-01-14', until = '2017-01-26'
   let reportResponse

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
               { title: { project: 'project-refactor'}, time: 11571000 }
            ]
         },
         {
            id: 19673693, title: { client: 'basiclife' }, time: 486582000,
            items: [
               { title: { project: 'eating' }, time: 44589000 },
               { title: { project: 'sleeping' }, time: 249265000 },
               { title: { project: 'shower' }, time: 18523000 }
            ]
         }

      ]
   }

   beforeEach(() => {
      report = new Report()
      reportResponse = mockReportResponse()
   })
   
   describe('getSummaryData()', () => {
      it('should return 1h 0min when total grand is 1h(60 * 60 * 1000ms)', () => {
         let summary = report.getSummaryData(60 * 60 * 1000, since, until);
         expect(summary.totalGrand).to.equal('1h 0min')
      })
      
      it('should return 2h 0min when total grand is 2h(2 * 60 * 60 * 1000ms)', () => {
         let summary = report.getSummaryData(2 * 60 * 60 * 1000, since, until);
         expect(summary.totalGrand).to.equal('2h 0min')
      })
      
      it('should return 1h 25min when total grand is 85min(85 * 60 * 1000ms)', () => {
         let summary = report.getSummaryData(85 * 60 * 1000, since, until);
         expect(summary.totalGrand).to.equal('1h 25min')
      })
      
   })

   describe('real data testing', () => {
      it.skip('should get correct summary data when method getSummaryData() is called', () => {
         let summary = report.getSummaryData(1006076304, since, until);

         expect(summary.totalGrand).to.equal('279h 28min')
         expect(summary.totalDays).to.equal(12)
         expect(summary.grandPercentage).to.equal('97.04%')
         expect(summary.grandHoursPerDay).to.equal('23h 18min')
      })

      it.skip('should get correct client data when method getClientsData() is called', () => {
         let client = report.getClientData(reportResponse, since, until);

         expect(client.length).to.equal(3)
         expect(client[0]).to.deep.equal({
            client: 'work', time: '39h 33min',
            percentage: '13.73%', hoursPerDay: '3h 18min'
         })
         expect(client[1]).to.deep.equal({
            client: 'tech-programming', time: '14h 13min',
            percentage: '4.94%', hoursPerDay: '1h 12min'
         })
         expect(client[2]).to.deep.equal({
            client: 'basiclife', time: '135h 10min',
            percentage: '46.93%', hoursPerDay: '11h 16min'
         })
      })

      it.skip('should get correct projects data when method getProjectsData() is called', () => {
         let projects = report.getProjectsData(reportResponse, since, until);

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
})