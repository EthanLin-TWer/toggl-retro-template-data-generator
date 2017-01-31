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
   })
})
