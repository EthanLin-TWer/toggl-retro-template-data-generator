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
               { title: 'regular-meetings', time: 18327000 },
               { title: 'workshops', time: 9750000 }
            ]
         },
         {
            id: 19673695, title: { client: 'tech-programming' }, time: 51178000,
            items: [
               { title: 'peak-development', time: 38312000 },
               { title: 'project-refactor', time: 11571000 }
            ]
         },
         {
            id: 19673693, title: { client: 'basiclife' }, time: 486582000,
            items: [
               { title: 'eating', time: 44589000 },
               { title: 'sleeping', time: 249265000 },
               { title: 'shower', time: 18523000 }
            ]
         }

      ]
   }

   beforeEach(() => {
      report = new Report()
      reportResponse = mockReportResponse()
   })

   it('should get correct summary data when method getSummaryData() is called', () => {
      let summary = report.getSummaryData(1006076304, since, until);
      expect(summary.totalGrand).to.equal('279h 28min')
      expect(summary.totalDays).to.equal(12)
      expect(summary.grandPercentage).to.equal('97.04%')
      expect(summary.grandHoursPerDay).to.equal('23h 18min')
   })

   it('should get correct client data when method getClientsData() is called', () => {
      report.getClientData(reportResponse, since, until)
   })
})