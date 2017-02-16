import moment from 'moment'
import 'moment-weekday-calc'

export class WeekdayService {
  constructor() {
  }

  weekdaysBetween(start, end) {
    return moment().weekdayCalc(start, end, [1, 2, 3, 4, 5])
  }
}