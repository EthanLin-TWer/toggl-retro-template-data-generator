import moment from 'moment'
import 'moment-weekday-calc'
import Settings from '../../settings'

export class WeekdayService {
  constructor() {
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