import { describe, it } from 'mocha'
import { expect } from 'chai'

import { WeekdayService } from '../../../src/services/weekday-service'

describe('weekday service', () => {
  let weekdayService
  
  before('instantiate weekdayService', () => {
    weekdayService = new WeekdayService()
  })
  
  describe('weekdaysBetween(startDate, endDate)', () => {
    it('should return 5 when date range is 2017-02-06(Mon)~2017-02-10(Fri)', () => {
      let weekdays = weekdayService.weekdaysBetween('2017-02-06', '2017-02-10')
      expect(weekdays).to.equal(5)
    })
    
    it('should return 4 when date range is 2017-02-06(Mon)~2017-02-09(Thur)', () => {
      let weekdays = weekdayService.weekdaysBetween('2017-02-06', '2017-02-09')
      expect(weekdays).to.equal(4)
    })
    
    it('should return 3 when date range is 2017-02-07(Tue)~2017-02-09(Thur)', () => {
      let weekdays = weekdayService.weekdaysBetween('2017-02-07', '2017-02-09')
      expect(weekdays).to.equal(3)
    })
  })
})