import { describe, beforeEach, it } from "mocha"
import { expect } from 'chai'
import { Report } from '../src/report'

describe('report.js', () => {
   let report
   beforeEach(() => {
      report = new Report()
   })
   
   it('should get correct summary data when method getSummaryData() is called', () => {
      expect(report).not.to.be.null
   })
})