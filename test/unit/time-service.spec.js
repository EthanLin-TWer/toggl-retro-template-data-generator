import { describe, it } from 'mocha'
import { expect } from 'chai'

import { TimeService } from '../../src/time-service'

describe('time service', () => {
   let timeService = new TimeService()
   
   describe('daysBetween(start, end)', () => {
      it('should return 1 when start date and end date is the same day', () => {
         let daysBetween = timeService.daysBetween('2017-01-01', '2017-01-01')
         expect(daysBetween).to.equal(1)
      })
      
      it('should return 2 when start date is 2017-01-01 and end date is 2017-01-02', () => {
         let daysBetween = timeService.daysBetween('2017-01-01', '2017-01-02')
         expect(daysBetween).to.equal(2)
      })

      it('should return 31 when date range is 2017-01-01 to 2017-01-31', () => {
         let daysBetween = timeService.daysBetween('2017-01-01', '2017-01-31')
         expect(daysBetween).to.equal(31)
      })
      
      it('should return 29 when date range is 2017-02-01 to 2017-03-01', () => {
         let daysBetween = timeService.daysBetween('2017-02-01', '2017-03-01')
         expect(daysBetween).to.equal(29)
      })
      
      it('should return 30 when date range is 2016-02-01 to 2016-03-01', () => {
         let daysBetween = timeService.daysBetween('2016-02-01', '2016-03-01')
         expect(daysBetween).to.equal(30)
      })
      
      it('should throw an error when start date is later than end date', () => {
         expect(() => timeService.daysBetween('2016-01-01', '2015-12-30')).to.throw(Error, 'start date can\'t be later than end date')
      })
      
      it('should throw an error when neither start date nor end date does not match yyyy-mm-dd format', () => {
         expect(() => timeService.daysBetween('2016-01-01', '01/30/2016')).to.throw(Error, 'end date should be in yyyy-mm-dd format')
         expect(() => timeService.daysBetween('01/30/2016', '2016-02-01')).to.throw(Error, 'start date should be in yyyy-mm-dd format')
      })
      
      it('should throw an error when neither start date nor end date is empty', () => {
         expect(() => timeService.daysBetween('', '2016-01-01')).to.throw(Error, 'start date cannot be empty')
         expect(() => timeService.daysBetween('2016-01-01', '')).to.throw(Error, 'end date cannot be empty')
      })
   })
   
   describe('millisToHoursAndMinsFormat(millis)', () => {
      it('should return 1h 0min when millis is 1h(60 * 60 * 1000ms)', () => {
         let result = timeService.millisToHoursAndMinsFormat(60 * 60 * 1000)
         expect(result).to.equal('1h 0min')
      })
      
      it('should return 2h 0min when millis is 2h(2 * 60 * 60 * 1000ms)', () => {
         let result = timeService.millisToHoursAndMinsFormat(2 * 60 * 60 * 1000)
         expect(result).to.equal('2h 0min')
      })
      
      it('should return 1h 25min when millis is 85min(85 * 60 * 1000ms)', () => {
         let result = timeService.millisToHoursAndMinsFormat(85 * 60 * 1000)
         expect(result).to.equal('1h 25min')
      })
      
      it('should return 1h 25min when 85min < millis < 86min', () => {
         let result = timeService.millisToHoursAndMinsFormat(85.9 * 60 * 1000);
         expect(result).to.equal('1h 25min')

      })
   })
})
