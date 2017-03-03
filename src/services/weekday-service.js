import moment from 'moment'
import 'moment-weekday-calc'
import Settings from '../../settings'

export class WeekdayService {
  constructor() { }

  /**
   * This is the actual interface that I want to provide. However, it is split
   * into separate calls to weekdaysBetween(), holidays(), leaves() and
   * otherAbsents() and combine the results. It's for testing purpose only and
   * it's not ideal.
   * @param start
   * @param end
   */
  actualWeekdays(start, end) {
    return this.weekdaysBetween(start, end) - (
      this.holidays().length + this.leaves().length)
  }
  
  weekdaysBetween(start, end) {
    return moment().weekdayCalc(start, end, [1, 2, 3, 4, 5])
  }
  
  holidays() {
    return Settings.excludes.holidays
  }
  
  leaves() {
    return Settings.excludes.leaves
  }
  
  otherAbsent() {
    return Settings.excludes.others
  }
  
}