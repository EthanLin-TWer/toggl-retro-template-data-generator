import { describe, it, beforeEach } from 'mocha'
import { expect } from 'chai'

import { Time } from '../src/TimeUtils'

describe('time utils', () => {
   let time = new Time()
   
   describe('daysBetween(start, end)', () => {
      it('should return 1 when start date and end date is the same day', () => {
         let daysBetween = time.daysBetween('2017-01-01', '2017-01-01')
         expect(daysBetween).to.equal(1)
      })
      
      it('should return 2 when start date is 2017-01-01 and end date is 2017-01-02', () => {
         let daysBetween = time.daysBetween('2017-01-01', '2017-01-02');
         expect(daysBetween).to.equal(2)
      })

      it('should return 31 when date range is 2017-01-01 to 2017-01-31', () => {
         let daysBetween = time.daysBetween('2017-01-01', '2017-01-31')
         expect(daysBetween).to.equal(31)
      })
      
      it('should return 29 when date range is 2017-02-01 to 2017-03-01', () => {
         let daysBetween = time.daysBetween('2017-02-01', '2017-03-01')
         expect(daysBetween).to.equal(29)
      })
      
      it('should return 30 when date range is 2016-02-01 to 2016-03-01', () => {
         let daysBetween = time.daysBetween('2016-02-01', '2016-03-01')
         expect(daysBetween).to.equal(30)
      })
   })
})
